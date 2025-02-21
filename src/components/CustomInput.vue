<template>
  <div class="mb-4 relative">
    <label :for="id" class="block text-sm font-medium text-white text-left">
      {{ label }}
    </label>

    <input
      :id="id"
      :type="isPassword && showPassword ? 'text' : type"
      :value="modelValue"
      @input="handleInput"
      class="mt-1 block w-full px-3 py-2 border border-neutral-400 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-neutral-50 hover:border-primary transition-colors duration-500 ease-in-out pr-10"
    />

    <!-- Password Visibility Toggle Button -->
    <button
      v-if="isPassword"
      type="button"
      @click="togglePassword"
      class="absolute right-2 top-7 size-8 text-gray-400 hover:text-white"
    >
      <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  id: String,
  label: String,
  type: { type: String, default: "text" },
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const showPassword = ref(false);

// Check if input is a password field
const isPassword = computed(() => props.type === "password");

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Restrict input to numbers only if it's a phone number field
const handleInput = (event) => {
  let value = event.target.value;
  if (props.id === "phone") {
    value = value.replace(/\D/g, ""); // Remove non-numeric characters
  }
  emit("update:modelValue", value);
};
</script>
