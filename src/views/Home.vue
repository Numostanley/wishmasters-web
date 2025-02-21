<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
<template>
  <Navbar />
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-4 text-neutral-50">Welcome!</h1>
    <p class="text-neutral-100 mb-6">
      Join competitions, submit scores, and climb the leaderboard!
    </p>

    <div class="space-x-6 mt-4">
      <router-link
        to="/login"
        class="bg-transparent hover:bg-white border border-primary text-primary px-6 py-3 rounded-lg shadow-lg font-semibold transition-colors duration-300 ease-in-out"
      >
        Sign In
      </router-link>
      <router-link
        to="/register"
        class="bg-primary text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
      >
        Sign Up
      </router-link>
    </div>
  </div>
</template>
