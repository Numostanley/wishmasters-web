<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useMutation, useQuery } from "@tanstack/vue-query";
import {
  getCompetitionById,
  getEntryById,
  getLeaderboard,
  joinCompetition,
  submitEntry,
} from "../services/competitions.service";
import { getUser } from "../utils/cookies";
import CustomInput from "@/components/CustomInput.vue";

const route = useRoute();
const { competitionId } = route.params;
const { full_name } = getUser();

// Fetch competition details
const { data: competition } = useQuery({
  queryKey: [`competition-${competitionId}`],
  queryFn: async () => {
    const res = await getCompetitionById(competitionId);
    return res?.data?.data;
  },
});

// Fetch leaderboard data
const { data: leaderboard, refetch: refetchLeaderboard } = useQuery({
  queryKey: [`leaderboard-${competitionId}`],
  queryFn: async () => {
    const res = await getLeaderboard(competitionId);
    return res?.data?.data;
  },
});

// Fetch user's entry
const { data: entry, refetch: refetchEntry } = useQuery({
  queryKey: [`entry-${competitionId}`],
  queryFn: async () => {
    const res = await getEntryById(competitionId);
    return res?.data?.data;
  },
});

// Check if user is already in leaderboard
const userInLeaderboard = computed(() => {
  return leaderboard?.value?.some((player) => player.user === full_name);
});

// Get user's entry score
const entryScore = computed(() => entry.value?.score ?? 0);

// Modal state
const showModal = ref(false);
const paymentReference = ref("");

// Generate random 6-digit payment reference
const generatePaymentReference = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Join competition mutation
const joinMutation = useMutation({
  mutationKey: ["Join-contest"],
  mutationFn: async (formData) =>
    await joinCompetition(formData, competitionId),
  onSuccess: () => {
    showModal.value = false;
    alert("Joined contest successfully");
    refetchLeaderboard();
    refetchEntry();
  },
});

// Handle joining the competition
const handleJoin = () => {
  showModal.value = true;
};

const confirmJoin = () => {
  paymentReference.value = generatePaymentReference();
  joinMutation.mutate({
    paid_entry_fee: true,
    payment_reference: paymentReference.value,
  });
};

// Entry submission form
const entryData = ref({
  score_entry: "",
});

const submitEntryMutation = useMutation({
  mutationKey: ["Submit-Entry"],
  mutationFn: async (formData) => await submitEntry(formData, entry?.value?.id),
  onSuccess: (response) => {
    const { data, status } = response;
    if (status) {
      alert("Entry submitted successfully!");
      refetchLeaderboard();
      refetchEntry();
      entryData.value.score_entry = "";
    } else {
      alert(data?.data?.message);
    }
  },
});

const handleSubmitEntry = () => {
  if (!entryData.value.score_entry) {
    alert("Please enter a valid score");
    return;
  }
  submitEntryMutation.mutate({ score_entry: entryData.value.score_entry });
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row max-w-5xl mx-auto text-neutral-100 py-6"
  >
    <div class="w-full md:w-1/2">
      <div class="mb-4">
        <h2 class="text-2xl font-bold">{{ competition?.name }}</h2>
        <p class="text-neutral-200 text-sm">{{ competition?.description }}</p>
      </div>

      <div class="flex items-center gap-2">
        <img
          :src="competition?.image_url"
          :alt="competition?.name"
          class="size-40 object-cover object-center group-hover:scale-105 transition-all duration-300 ease-in-out"
        />
        <div>
          <h3 class="text-sm text-green-100">
            👤 Hosted by: {{ competition?.created_by }}
          </h3>
          <h3 class="text-green-600">💰 ${{ competition?.entry_fee }}</h3>
          <h3 class="text-blue-500 font-semibold">
            📅 {{ competition?.start_date }} to {{ competition?.end_date }}
          </h3>
          <h3 class="font-semibold">
            Max Players: {{ competition?.max_players }}
          </h3>
        </div>
      </div>

      <!-- Show Join Competition Button if not in leaderboard -->
      <button
        v-if="!userInLeaderboard"
        @click="handleJoin"
        class="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
      >
        Join Competition
      </button>

      <!-- Show Entry Score if greater than 0 -->
      <div v-else-if="entryScore > 0" class="mt-4 p-4 bg-black/10 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Your Score:</h3>
        <p class="text-xl font-bold text-green-500">{{ entryScore }} pts</p>
      </div>

      <!-- Entry Submission Form if entryScore === 0 -->
      <div v-else class="mt-4 p-4 bg-black/10 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Submit Your Entry</h3>
        <CustomInput
          v-model="entryData.score_entry"
          type="text"
          id="score_entry"
          name="score_entry"
          label="Entry"
        />
        <button
          @click="handleSubmitEntry"
          class="bg-primary text-white px-4 py-2 rounded mt-2 w-full"
        >
          Submit Entry
        </button>
      </div>
    </div>

    <!-- Leaderboard -->
    <div class="w-full md:w-1/2">
      <h3 class="text-xl font-bold mb-2">🏆 Leaderboard</h3>
      <ul v-if="leaderboard?.length" class="bg-black/20 p-4 rounded-lg">
        <li
          v-for="(player, index) in leaderboard"
          :key="index"
          class="flex justify-between py-2 border-b border-gray-700"
        >
          <span class="text-neutral-200">{{ player.user }}</span>
          <span class="text-green-400 font-semibold"
            >{{ player.score }} pts</span
          >
        </li>
      </ul>
      <p v-else class="text-gray-400">
        Join the competition to see the leaderboard!
      </p>
    </div>
  </div>

  <!-- Join Competition Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
  >
    <div class="bg-white text-gray-900 p-6 rounded-lg shadow-lg w-[20rem]">
      <h2 class="text-xl font-bold mb-4">Confirm Payment</h2>
      <p>
        Entry Fee:
        <span class="font-semibold">${{ competition?.entry_fee }}</span>
      </p>

      <div class="flex gap-3 mt-4 w-full">
        <button
          @click="confirmJoin"
          class="bg-primary text-white px-4 py-2 rounded w-full"
        >
          Confirm & Pay
        </button>
        <button
          @click="showModal = false"
          class="bg-neutral-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
