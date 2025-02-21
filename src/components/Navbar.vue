<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import logo from "@/assets/images/logo.png";

const auth = useAuthStore();
console.log(auth?.isAuthenticated);
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>

<template>
  <nav
    class="fixed top-0 w-full max-w-2xl left-1/2 -translate-x-1/2 px-10 md:px-20 bg-background/30 p-4 flex justify-between items-center"
  >
    <router-link to="/">
      <img class="w-[12rem]" :src="logo" alt="wishmaster logo" />
    </router-link>

    <div v-if="auth.token" class="relative">
      <button
        @click="toggleDropdown"
        class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
      >
        <img
          v-if="auth.user?.avatar"
          :src="auth.user.avatar"
          class="w-10 h-10 rounded-full"
        />
        <span v-else class="text-gray-700 font-bold">{{
          auth.user?.name
        }}</span>
      </button>

      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg"
      >
        <router-link
          to="/competitions"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >Competitions</router-link
        >
        <button
          @click="auth.logout"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Logout
        </button>
      </div>
    </div>

    <router-link
      v-else
      to="/login"
      class="bg-primary font-semibold text-white px-4 py-2 rounded-lg"
    >
      Get Started
    </router-link>
  </nav>
</template>
