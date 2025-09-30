<template>
  <div class="min-h-screen bg-gray-900">
    <Navbar />
    <div class="py-4 px-6">
      <div class="mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-white">Dashboard</h1>
          <VoteButton @vote-cast="handleVoteCast" />
        </div>

        <!-- Vote Statistics -->
        <div v-if="voteStats" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-slate-800 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Total Votes</h3>
            <p class="text-3xl font-bold text-blue-400">{{ voteStats.totalVotes }}</p>
          </div>
          
          <div class="bg-slate-800 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Current Streak</h3>
            <p class="text-3xl font-bold text-green-400">{{ voteStats.currentStreak }}</p>
            <p class="text-sm text-slate-400">days</p>
          </div>
          
          <div class="bg-slate-800 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-2">This Month</h3>
            <p class="text-3xl font-bold text-purple-400">{{ voteStats.votesThisMonth }}</p>
            <p class="text-sm text-slate-400">votes</p>
          </div>
        </div>

        <!-- Recent Votes -->
        <div v-if="recentVotes && recentVotes.length > 0" class="bg-slate-800 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Recent Votes</h3>
          <div class="space-y-3">
            <div 
              v-for="vote in recentVotes" 
              :key="vote.id"
              @click="openEditVoteModal(vote)"
              class="flex justify-between items-start p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer group"
            >
              <div class="flex-1">
                <p class="text-white font-medium">
                  {{ formatDate(vote.date) }}
                </p>
                <p v-if="vote.notes" class="text-slate-300 text-sm mt-1">
                  {{ vote.notes }}
                </p>
                <p v-else class="text-slate-500 text-sm mt-1 italic">
                  No notes
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-slate-400 text-sm">
                  {{ formatRelativeTime(vote.createdAt) }}
                </span>
                <svg class="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!votesLoading" class="bg-slate-800 rounded-xl p-8 text-center">
          <div class="text-slate-400 mb-4">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">No votes yet</h3>
          <p class="text-slate-400 mb-4">Cast your first vote to get started!</p>
        </div>

        <!-- Loading State -->
        <div v-if="votesLoading" class="bg-slate-800 rounded-xl p-8 text-center">
          <div class="text-slate-400">
            <svg class="w-8 h-8 mx-auto mb-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
          <p class="text-slate-400">Loading votes...</p>
        </div>
      </div>
    </div>

    <!-- Edit Vote Modal -->
    <div
      v-if="editVoteModalOpen"
      @click="closeEditVoteModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4"
    >
      <div
        @click.stop
        class="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 space-y-6"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-white">Edit Vote</h3>
          <button
            @click="closeEditVoteModal"
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

        <form @submit.prevent="handleUpdateVote" class="space-y-4">
          <div>
            <label
              for="editVoteDate"
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Date
            </label>
            <input
              id="editVoteDate"
              v-model="editVoteForm.date"
              type="date"
              required
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>

          <div>
            <label
              for="editVoteNotes"
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Notes (optional)
            </label>
            <textarea
              id="editVoteNotes"
              v-model="editVoteForm.notes"
              rows="3"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Add any notes about your vote..."
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="editVoteError"
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
            <p class="text-red-300 text-sm">{{ editVoteError }}</p>
          </div>

          <!-- Success Message -->
          <div
            v-if="editVoteSuccess"
            class="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
          >
            <svg
              class="w-5 h-5 text-green-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p class="text-green-300 text-sm">{{ editVoteSuccess }}</p>
          </div>

          <div class="flex space-x-3">
            <BaseButton
              type="button"
              @click="handleDeleteVote"
              variant="outline"
              class="flex-1 text-red-400 border-red-600 hover:bg-red-600 hover:text-white"
              :disabled="editVoteLoading"
            >
              <span v-if="editVoteLoading && deleteMode">Deleting...</span>
              <span v-else>Delete</span>
            </BaseButton>
            <BaseButton
              type="button"
              @click="closeEditVoteModal"
              variant="outline"
              class="flex-1"
            >
              Cancel
            </BaseButton>
            <BaseButton
              type="submit"
              :disabled="editVoteLoading"
              variant="primary"
              class="flex-1"
            >
              <span v-if="editVoteLoading && !deleteMode">Updating...</span>
              <span v-else>Update</span>
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "onboarding"],
});

// Reactive data
const recentVotes = ref([]);
const voteStats = ref(null);
const votesLoading = ref(true);

// Edit vote modal data
const editVoteModalOpen = ref(false);
const editVoteForm = ref({
  date: "",
  notes: "",
});
const currentEditingVote = ref(null);
const editVoteLoading = ref(false);
const editVoteError = ref("");
const editVoteSuccess = ref("");
const deleteMode = ref(false);

// Calculate stats from votes data
const calculateStats = (votes) => {
  const totalVotes = votes.length;
  
  // Calculate current streak
  let currentStreak = 0;
  if (votes.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get unique dates and sort by date desc
    const uniqueDates = [...new Set(votes.map(vote => {
      const date = new Date(vote.date);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }))].sort((a, b) => b - a);
    
    if (uniqueDates.length > 0) {
      const latestVoteDate = new Date(uniqueDates[0]);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Check if latest vote is today or yesterday
      if (latestVoteDate.getTime() === today.getTime() || latestVoteDate.getTime() === yesterday.getTime()) {
        let expectedDate = latestVoteDate.getTime();
        
        for (const dateTime of uniqueDates) {
          if (dateTime === expectedDate) {
            currentStreak++;
            expectedDate -= 24 * 60 * 60 * 1000; // subtract one day
          } else {
            break;
          }
        }
      }
    }
  }
  
  // Calculate votes this month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  const votesThisMonth = votes.filter(vote => {
    const voteDate = new Date(vote.date);
    return voteDate >= startOfMonth && voteDate <= endOfMonth;
  }).length;
  
  return {
    totalVotes,
    currentStreak,
    votesThisMonth
  };
};

// Fetch votes and calculate stats
const fetchVotes = async () => {
  try {
    votesLoading.value = true;
    const token = useCookie("auth-token");
    
    const votes = await $fetch("http://localhost:3000/api/votes", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    
    recentVotes.value = votes.slice(0, 10); // Show last 10 votes
    voteStats.value = calculateStats(votes); // Calculate and set stats
  } catch (error) {
    console.error("Failed to fetch votes:", error);
    if (error.status === 401 || error.status === 403) {
      const token = useCookie("auth-token");
      token.value = null;
      await navigateTo("/auth/login");
    }
  } finally {
    votesLoading.value = false;
  }
};

// Handle vote cast - refresh data and update stats
const handleVoteCast = (response) => {
  console.log('Vote cast successfully:', response);
  
  // Add new vote to recent votes
  if (response.vote) {
    recentVotes.value.unshift(response.vote);
    // Keep only last 10 votes
    recentVotes.value = recentVotes.value.slice(0, 10);
    
    // Recalculate stats with the updated votes array
    const allVotes = [response.vote, ...recentVotes.value.slice(1)];
    voteStats.value = calculateStats(allVotes);
  }
};

// Date formatting functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

// Edit vote modal functions
const openEditVoteModal = (vote) => {
  currentEditingVote.value = vote;
  editVoteForm.value = {
    date: vote.date.split('T')[0], // Convert to YYYY-MM-DD format
    notes: vote.notes || "",
  };
  editVoteModalOpen.value = true;
  editVoteError.value = "";
  editVoteSuccess.value = "";
  deleteMode.value = false;
};

const closeEditVoteModal = () => {
  editVoteModalOpen.value = false;
  currentEditingVote.value = null;
  deleteMode.value = false;
};

const handleUpdateVote = async () => {
  if (!currentEditingVote.value) return;
  
  editVoteLoading.value = true;
  deleteMode.value = false;
  editVoteError.value = "";
  editVoteSuccess.value = "";

  try {
    const token = useCookie("auth-token");

    const requestBody = {
      date: editVoteForm.value.date,
      notes: editVoteForm.value.notes.trim() || null,
    };

    const response = await $fetch(`http://localhost:3000/api/votes/${currentEditingVote.value.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: requestBody,
    });

    editVoteSuccess.value = "Vote updated successfully!";
    
    // Update the vote in the recent votes list
    const voteIndex = recentVotes.value.findIndex(v => v.id === currentEditingVote.value.id);
    if (voteIndex !== -1) {
      recentVotes.value[voteIndex] = response.vote;
    }
    
    // Update stats
    if (response.stats) {
      voteStats.value = response.stats;
    }

    // Close modal after 1.5 seconds
    setTimeout(() => {
      closeEditVoteModal();
    }, 1500);
  } catch (err) {
    if (err.status === 401) {
      editVoteError.value = "You must be logged in to edit votes";
    } else if (err.status === 404) {
      editVoteError.value = "Vote not found or you don't have permission to edit it";
    } else if (err.status === 400) {
      editVoteError.value = err.data?.message || "Invalid input. Please check your data.";
    } else {
      editVoteError.value = "An error occurred. Please try again.";
    }
  } finally {
    editVoteLoading.value = false;
  }
};

const handleDeleteVote = async () => {
  if (!currentEditingVote.value) return;
  
  editVoteLoading.value = true;
  deleteMode.value = true;
  editVoteError.value = "";
  editVoteSuccess.value = "";

  try {
    const token = useCookie("auth-token");

    const response = await $fetch(`http://localhost:3000/api/votes/${currentEditingVote.value.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    editVoteSuccess.value = "Vote deleted successfully!";
    
    // Remove the vote from the recent votes list
    recentVotes.value = recentVotes.value.filter(v => v.id !== currentEditingVote.value.id);
    
    // Update stats
    if (response.stats) {
      voteStats.value = response.stats;
    }

    // Close modal after 1.5 seconds
    setTimeout(() => {
      closeEditVoteModal();
    }, 1500);
  } catch (err) {
    if (err.status === 401) {
      editVoteError.value = "You must be logged in to delete votes";
    } else if (err.status === 404) {
      editVoteError.value = "Vote not found or you don't have permission to delete it";
    } else {
      editVoteError.value = "An error occurred. Please try again.";
    }
  } finally {
    editVoteLoading.value = false;
  }
};

// Fetch data on component mount
onMounted(() => {
  fetchVotes();
});
</script>
