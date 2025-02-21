<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import CustomInput from "@/components/CustomInput.vue";

const authStore = useAuthStore(); // Access the auth store

const formData = ref({
  phone_number: "",
  password: "",
});

// Check if form is valid
const isFormValid = computed(() => {
  return formData.value.phone_number && formData.value.password;
});

// Handle login
const handleLogin = () => {
  if (!isFormValid.value) return;
  authStore.loginMutation.mutate(formData.value);
};
</script>

<template>
  <section class="grid place-items-center min-h-screen">
    <div class="min-w-md mx-auto shadow-md p-6 rounded-lg bg-black/30">
      <h2
        class="text-[2.5rem] text-center leading-[120%] text-neutral-100 font-semibold mb-4"
      >
        Login
      </h2>

      <form @submit.prevent="handleLogin">
        <!-- Phone Number Input -->
        <CustomInput
          id="phone"
          label="Phone Number"
          v-model="formData.phone_number"
          type="tel"
        />

        <!-- Password Input -->
        <CustomInput
          id="password"
          label="Password"
          v-model="formData.password"
          type="password"
        />

        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-primary text-white px-4 py-2 rounded mt-4 w-full disabled:bg-gray-600"
          :disabled="authStore.loginMutation.isPending || !isFormValid"
        >
          {{ authStore.loginMutation.isPending ? "Logging in..." : "Login" }}
        </button>
      </form>
      <div class="flex items-end justify-between mt-4">
        <router-link to="/" class="text-neutral-300 font-semibold"
          >Home</router-link
        >
        <p class="text-neutral-300">
          Don't have an account?
          <span>
            <router-link
              to="/register"
              class="text-primary underline font-semibold ml-1"
              >Register</router-link
            >
          </span>
        </p>
      </div>
    </div>
  </section>
</template>
