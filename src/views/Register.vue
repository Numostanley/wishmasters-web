<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import CustomInput from "@/components/CustomInput.vue";

const authStore = useAuthStore();
const formData = ref({
  first_name: "",
  last_name: "",
  phone_number: "",
  password: "",
});

const errors = ref({
  first_name: "",
  last_name: "",
  phone_number: "",
  password: "",
});

// Validate phone number (only numbers & valid format)
const validatePhone = () => {
  const phoneRegex = /^[0-9]{10,15}$/; // Adjust length as needed
  if (!formData.value.phone_number.match(phoneRegex)) {
    errors.value.phone_number = "Enter a valid phone number (10-15 digits)";
  } else {
    errors.value.phone_number = "";
  }
};

// Validate password (6+ characters, 1 uppercase, 1 number, 1 special char)
const validatePassword = () => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!formData.value.password.match(passwordRegex)) {
    errors.value.password =
      "Password must be at least 6 characters, include 1 uppercase, 1 number, and 1 special character.";
  } else {
    errors.value.password = "";
  }
};

// Check if form is valid
const isFormValid = computed(() => {
  return (
    !errors.value.phone_number &&
    !errors.value.password &&
    formData.value.phone_number &&
    formData.value.password &&
    formData.value.first_name &&
    formData.value.last_name
  );
});

async function handleRegister() {
  validatePhone();
  validatePassword();

  if (!isFormValid.value) return;
  authStore.registerMutation.mutate(formData.value);
}
</script>

<template>
  <section
    class="main w-full container mx-auto flex items-center justify-between min-h-screen"
  >
    <div class="min-w-md mx-auto p-6 bg-black/30 shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-4 text-neutral-100">Register</h2>

      <CustomInput
        v-model="formData.first_name"
        label="First Name"
        id="first_name"
      />
      <CustomInput
        v-model="formData.last_name"
        label="Last Name"
        id="last_name"
      />
      <div>
        <CustomInput
          v-model="formData.phone_number"
          label="Phone Number"
          type="tel"
          id="phone_number"
          @input="validatePhone"
        />
        <p v-if="errors.phone_number" class="text-red-500 text-sm">
          {{ errors.phone_number }}
        </p>
      </div>
      <div>
        <CustomInput
          v-model="formData.password"
          label="Password"
          type="password"
          id="password"
          @input="validatePassword"
        />
        <p v-if="errors.password" class="text-red-500 text-sm max-w-sm">
          {{ errors.password }}
        </p>
      </div>
      <button
        @click="handleRegister"
        class="w-full bg-primary text-white p-2 rounded-lg mt-4 disabled:bg-gray-600"
        :disabled="authStore.registerMutation.isPending || !isFormValid"
      >
        {{ authStore.registerMutation.isPending ? "Loading..." : "Register" }}
      </button>

      <p class="text-center text-sm mt-2 text-neutral-100">
        Already have an account?
        <router-link
          to="/login"
          class="text-primary underline font-semibold ml-1"
          >Login</router-link
        >
      </p>

      <div class="text-center mt-2">
        <router-link to="/" class="text-neutral-100 font-semibold"
          >Home</router-link
        >
      </div>
    </div>
  </section>
</template>
