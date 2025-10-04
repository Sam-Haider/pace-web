<template>
  <div>
    <!-- Special Vote Button -->
    <button
      @click="openVoteModal"
      :disabled="disabled"
      class="relative overflow-hidden px-6 py-3 text-base font-bold bg-gradient-to-r from-emerald-400 to-emerald-800 hover:from-gray-700 hover:to-gray-800 hover:cursor-pointer text-white rounded-2xl transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group w-full"
    >
      <!-- One-time shimmer effect -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer-once"
      ></div>

      <!-- Hover shimmer effect -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
      ></div>

      <!-- Glow effect -->
      <div
        class="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
      ></div>

      <!-- Button content -->
      <span class="relative z-10 flex items-center justify-center space-x-2">
        <span>Cast a Vote</span>
        <svg
          class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5-5 5M6 12h12"
          />
        </svg>
      </span>
    </button>

    <!-- Vote Modal -->
    <div
      v-if="voteModalOpen"
      @click="closeVoteModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4"
    >
      <div
        @click.stop
        class="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 space-y-6"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-white">Cast Your Vote</h3>
          <button
            @click="closeVoteModal"
            class="text-slate-400 hover:text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmitVote" class="space-y-4">
          <div>
            <label
              for="voteDate"
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Date
            </label>
            <input
              v-model="voteForm.date"
              type="date"
              required
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer [color-scheme:dark]"
              style="color-scheme: dark"
            />
          </div>

          <div>
            <label
              for="voteNotes"
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Notes
            </label>
            <textarea
              id="voteNotes"
              v-model="voteForm.notes"
              rows="3"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Add any notes about your vote..."
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="voteError"
            class="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
          >
            <svg
              class="w-5 h-5 text-red-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-red-300 text-sm">{{ voteError }}</p>
          </div>

          <div class="flex space-x-3">
            <BaseButton
              type="button"
              @click="closeVoteModal"
              variant="outline"
              class="flex-1"
            >
              Cancel
            </BaseButton>
            <button
              type="submit"
              :disabled="voteLoading"
              class="relative overflow-hidden px-4 py-3 text-sm font-bold bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-800 hover:from-purple-800 hover:via-blue-800 hover:to-indigo-900 hover:cursor-pointer text-white rounded-xl transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group flex-1"
            >
              <!-- One-time shimmer effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer-once"
              ></div>

              <!-- Hover shimmer effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
              ></div>

              <!-- Glow effect -->
              <div
                class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
              ></div>

              <!-- Button content -->
              <span class="relative z-10">
                <span v-if="voteLoading">Submitting...</span>
                <span v-else>Submit Vote</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const voteModalOpen = ref(false);

// Vote form
const voteForm = ref({
  date: "",
  notes: "",
});

const voteLoading = ref(false);
const voteError = ref("");
const voteSuccess = ref("");

// Props for identity ID (optional)
const props = defineProps({
  userIdentityId: {
    type: Number,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// Emits for when vote is successfully cast
const emit = defineEmits(["vote-cast"]);

const openVoteModal = () => {
  voteModalOpen.value = true;
  // Reset form with today's date (local timezone)
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;

  voteForm.value = {
    date: todayString,
    notes: "",
  };
  voteError.value = "";
  voteSuccess.value = "";
};

const closeVoteModal = () => {
  voteModalOpen.value = false;
};

const handleSubmitVote = async () => {
  voteLoading.value = true;
  voteError.value = "";

  try {
    const token = useCookie("auth-token");

    const requestBody = {};

    // Add userIdentityId if provided
    if (props.userIdentityId) {
      requestBody.userIdentityId = props.userIdentityId;
    }

    // Add date if provided
    if (voteForm.value.date) {
      requestBody.date = voteForm.value.date;
    }

    // Add notes if provided
    if (voteForm.value.notes.trim()) {
      requestBody.notes = voteForm.value.notes.trim();
    }

    const response = await $fetch("http://localhost:3000/api/votes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: requestBody,
    });

    voteSuccess.value = "Vote cast successfully!";

    // Close modal immediately
    closeVoteModal();

    // Emit event to parent component
    emit("vote-cast", response);
  } catch (err) {
    if (err.status === 401) {
      voteError.value = "You must be logged in to vote";
    } else if (err.status === 400) {
      voteError.value =
        err.data?.message || "Invalid request. Please check your input.";
    } else if (err.status === 403) {
      voteError.value = "You don't have permission to vote with this identity";
    } else {
      voteError.value = "An error occurred. Please try again.";
    }
  } finally {
    voteLoading.value = false;
  }
};

// Close modal on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeVoteModal();
    }
  };
  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>

<style scoped>
@keyframes pulse-slow {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(147, 51, 234, 0);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  100% {
    transform: translateX(100%) skewX(-15deg);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2.5s ease-in-out infinite;
}

.animate-shimmer-once {
  animation: shimmer 2.5s ease-in-out 1.5s 1;
}
</style>
