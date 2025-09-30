<template>
  <div>
    <!-- Vote Button -->
    <BaseButton @click="openVoteModal" variant="primary">
      Cast Vote
    </BaseButton>

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
              Date (optional)
            </label>
            <input
              id="voteDate"
              v-model="voteForm.date"
              type="date"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>

          <div>
            <label
              for="voteNotes"
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Notes (optional)
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
            <BaseButton
              type="submit"
              :disabled="voteLoading"
              variant="primary"
              class="flex-1"
            >
              <span v-if="voteLoading">Submitting...</span>
              <span v-else>Submit Vote</span>
            </BaseButton>
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
    required: false
  }
});

// Emits for when vote is successfully cast
const emit = defineEmits(['vote-cast']);

const openVoteModal = () => {
  voteModalOpen.value = true;
  // Reset form
  voteForm.value = {
    date: "",
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
  voteSuccess.value = "";

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
    emit('vote-cast', response);
  } catch (err) {
    if (err.status === 401) {
      voteError.value = "You must be logged in to vote";
    } else if (err.status === 400) {
      voteError.value = err.data?.message || "Invalid request. Please check your input.";
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