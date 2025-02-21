<script setup>
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getAllCompetitions } from "@/services/competitions.service";

const router = useRouter();

const { data: competitions } = useQuery({
  queryKey: ["competitions"],
  queryFn: async () => {
    const res = await getAllCompetitions();
    return res.data?.results;
  },
});

// Navigate to competition details page
const goToCompetition = (id) => {
  router.push(`/competitions/${id}`);
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-6 text-center text-neutral-200">
      🏆 Competitions
    </h2>

    <div v-if="competitions" class="grid md:grid-cols-2 gap-6">
      <div
        v-for="comp in competitions"
        :key="comp.id"
        @click="goToCompetition(comp.id)"
        class="bg-black/20 shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:shadow-md hover:shadow-neutral-800 group"
      >
        <!-- Competition Image -->
        <img
          :src="comp.image_url"
          :alt="comp.name"
          class="w-full h-48 object-cover object-center group-hover:scale-105 transition-all duration-300 ease-in-out"
        />

        <!-- Competition Details -->
        <div class="p-4">
          <h3 class="text-xl font-bold text-neutral-100">{{ comp.name }}</h3>
          <p class="text-neutral-200 text-sm">{{ comp.description }}</p>

          <div class="mt-3 flex justify-between items-center">
            <span class="text-green-600 font-semibold"
              >💰 ${{ comp.entry_fee }}</span
            >
            <span class="text-blue-500 font-semibold">
              📅 {{ comp.start_date }} to {{ comp.end_date }}
            </span>
          </div>

          <!-- Created By -->
          <p class="text-sm text-green-100 mt-2">
            👤 Hosted by: {{ comp.created_by }}
          </p>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-600">Loading competitions...</p>
  </div>
</template>
