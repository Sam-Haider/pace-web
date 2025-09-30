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
              class="flex justify-between items-start p-3 bg-slate-700 rounded-lg"
            >
              <div class="flex-1">
                <p class="text-white font-medium">
                  {{ formatDate(vote.date) }}
                </p>
                <p v-if="vote.notes" class="text-slate-300 text-sm mt-1">
                  {{ vote.notes }}
                </p>
              </div>
              <span class="text-slate-400 text-sm">
                {{ formatRelativeTime(vote.createdAt) }}
              </span>
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

// Fetch data on component mount
onMounted(() => {
  fetchVotes();
});
</script>
