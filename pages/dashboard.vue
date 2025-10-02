<template>
  <div class="min-h-screen bg-gray-900">
    <Navbar />
    <div class="py-4 px-6">
      <div class="mx-auto">
        <!-- Header Section -->
        <div class="mb-8">
          <!-- Desktop Layout -->
          <div class="hidden md:flex justify-between items-end">
            <h1 class="text-3xl font-bold text-white">Dashboard</h1>
            <div class="flex items-center space-x-4">
              <!-- Identity Dropdown -->
              <div
                v-if="userIdentities && userIdentities.length > 0"
                class="min-w-48 max-w-xs"
              >
                <BaseDropdown
                  v-model="selectedIdentityId"
                  :options="dropdownOptions"
                  value-key="value"
                  display-key="label"
                  @change="handleIdentityChange"
                  placeholder="Select an identity"
                />
              </div>
              <div>
                <VoteButton
                  :user-identity-id="selectedIdentityId"
                  @vote-cast="handleVoteCast"
                />
              </div>
            </div>
          </div>

          <!-- Mobile Layout -->
          <div class="md:hidden space-y-4 mb-7">
            <h1 class="text-2xl font-bold text-white">Dashboard</h1>
            <div class="flex flex-col gap-4">
              <!-- Identity Dropdown -->
              <div
                v-if="userIdentities && userIdentities.length > 0"
                class="w-full mb-4"
              >
                <BaseDropdown
                  v-model="selectedIdentityId"
                  :options="dropdownOptions"
                  value-key="value"
                  display-key="label"
                  @change="handleIdentityChange"
                  placeholder="Select an identity"
                />
              </div>
              <div class="w-full">
                <VoteButton
                  :user-identity-id="selectedIdentityId"
                  @vote-cast="handleVoteCast"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Floating Success Message with Confetti -->
        <div
          v-if="showSuccessMessage"
          class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none px-4 w-4/5 md:w-auto"
        >
          <!-- Confetti Container -->
          <div
            v-if="showConfetti"
            class="absolute -inset-48 pointer-events-none overflow-visible"
          >
            <div class="w-full h-full flex items-center justify-center">
              <!-- Confetti pieces -->
              <div class="confetti-burst">
                <div class="confetti-piece confetti-1"></div>
                <div class="confetti-piece confetti-2"></div>
                <div class="confetti-piece confetti-3"></div>
                <div class="confetti-piece confetti-4"></div>
                <div class="confetti-piece confetti-5"></div>
                <div class="confetti-piece confetti-6"></div>
                <div class="confetti-piece confetti-7"></div>
                <div class="confetti-piece confetti-8"></div>
                <div class="confetti-piece confetti-9"></div>
                <div class="confetti-piece confetti-10"></div>
                <div class="confetti-piece confetti-11"></div>
                <div class="confetti-piece confetti-12"></div>
                <div class="confetti-piece confetti-13"></div>
                <div class="confetti-piece confetti-14"></div>
                <div class="confetti-piece confetti-15"></div>
                <div class="confetti-piece confetti-16"></div>
                <div class="confetti-piece confetti-17"></div>
                <div class="confetti-piece confetti-18"></div>
                <div class="confetti-piece confetti-19"></div>
                <div class="confetti-piece confetti-20"></div>
                <div class="confetti-piece confetti-21"></div>
                <div class="confetti-piece confetti-22"></div>
                <div class="confetti-piece confetti-23"></div>
                <div class="confetti-piece confetti-24"></div>
                <div class="confetti-piece confetti-25"></div>
                <div class="confetti-piece confetti-26"></div>
                <div class="confetti-piece confetti-27"></div>
                <div class="confetti-piece confetti-28"></div>
                <div class="confetti-piece confetti-29"></div>
                <div class="confetti-piece confetti-30"></div>
                <div class="confetti-piece confetti-31"></div>
                <div class="confetti-piece confetti-32"></div>
                <div class="confetti-piece confetti-33"></div>
                <div class="confetti-piece confetti-34"></div>
                <div class="confetti-piece confetti-35"></div>
                <div class="confetti-piece confetti-36"></div>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div
            class="relative flex items-center justify-center px-6 md:px-8 py-4 md:py-6 bg-gradient-to-r from-emerald-700 via-green-700 to-teal-700 backdrop-blur-sm border-2 border-yellow-400/80 rounded-2xl shadow-2xl animate-pulse w-full overflow-hidden"
          >
            <!-- Animated background shimmer -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-fast"
            ></div>

            <!-- Sparkle effects -->
            <div
              class="absolute top-1 left-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"
            ></div>
            <div
              class="absolute top-2 right-3 w-1 h-1 bg-white rounded-full animate-ping animation-delay-300"
            ></div>
            <div
              class="absolute bottom-2 left-4 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping animation-delay-600"
            ></div>
            <div
              class="absolute bottom-1 right-2 w-1 h-1 bg-emerald-200 rounded-full animate-ping animation-delay-900"
            ></div>

            <div class="relative z-10 flex items-center space-x-3 md:space-x-4">
              <div class="relative">
                <svg
                  class="w-7 h-7 md:w-8 md:h-8 text-yellow-300 animate-spin-slow"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="text-white font-black text-xl md:text-2xl tracking-wide drop-shadow-lg"
              >
                🎉 {{ currentMessage }} 🎉
              </div>
            </div>
          </div>
        </div>

        <!-- Vote Statistics -->
        <div
          v-if="voteStats"
          class="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8"
        >
          <!-- 7-Day Activity with Odometer -->
          <div class="lg:col-span-1 bg-slate-800 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-2">7-Day Activity</h3>
            <p :class="['text-3xl font-bold', voteStats.activeDaysLast7 <= 5 ? 'text-emerald-400' : 'text-red-400']">
              <AnimatedNumber :value="voteStats.activeDaysLast7" />
            </p>
            <p class="text-sm text-slate-400 mb-4">days</p>
            <VotingOdometer 
              :active-days="voteStats.activeDaysLast7" 
              color-scheme="amber"
            />
          </div>

          <!-- Vote Activity Heatmap -->
          <div v-if="recentVotes && recentVotes.length > 0" class="lg:col-span-4 flex items-center justify-center">
            <VotingHeatmap :votes="recentVotes" />
          </div>

          <!-- Key Metrics -->
          <div class="lg:col-span-1 bg-slate-800 rounded-xl p-6 relative overflow-hidden">
            <h3 class="text-lg font-semibold text-white mb-2">Lifetime Votes</h3>
            <p class="text-3xl font-bold text-blue-400 mb-4">
              <AnimatedNumber :value="voteStats.totalVotes" />
            </p>
            
            <h3 class="text-lg font-semibold text-white mb-2">Week Streak</h3>
            <p class="text-3xl font-bold text-green-400 flex items-center">
              <span v-if="voteStats.currentStreak > 4" class="mr-2">🔥</span>
              <AnimatedNumber :value="voteStats.currentStreak" />
            </p>
            <p class="text-sm text-slate-400">weeks</p>
            <!-- Streak celebration -->
            <div
              v-if="showStreakText"
              class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full animate-pulse"
            >
              Streak!
            </div>
          </div>
        </div>

        <!-- Recent Votes -->
        <div
          v-if="recentVotes && recentVotes.length > 0"
          class="bg-slate-800 rounded-xl p-6"
        >
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
                <svg
                  class="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="!votesLoading"
          class="bg-slate-800 rounded-xl p-8 text-center"
        >
          <div class="text-slate-400 mb-4">
            <svg
              class="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">No votes yet</h3>
          <p class="text-slate-400 mb-4">
            Cast your first vote to get started!
          </p>
        </div>

        <!-- Loading State -->
        <div
          v-if="votesLoading"
          class="bg-slate-800 rounded-xl p-8 text-center"
        >
          <div class="text-slate-400">
            <svg
              class="w-8 h-8 mx-auto mb-4 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
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
const userIdentities = ref([]);
const selectedIdentityId = ref(null);

// Computed property to format identities for dropdown
const dropdownOptions = computed(() => {
  return userIdentities.value.map((userIdentity) => ({
    value: userIdentity.userIdentityId,
    label: `${userIdentity.identity.name}`,
  }));
});

// Celebration states
const showStreakText = ref(false);
const showSuccessMessage = ref(false);
const showConfetti = ref(false);

// Inspiring messages array
const inspiringMessages = [
  "GREAT JOB!",
  "KEEP IT UP!",
  "WAY TO GO!",
  "YOU'RE ON A ROLL!",
  "ANOTHER ONE!",
  "ONE STEP AT A TIME!",
  "EVERY VOTE COUNTS!",
  "AWESOME WORK!",
  "CRUSHING IT!",
  "FANTASTIC!",
  "UNSTOPPABLE!",
  "MOMENTUM BUILDING!",
];

const currentMessage = ref("GREAT JOB!");

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

  // Calculate current week streak (weeks in a row with at least one vote)
  let currentStreak = 0;
  if (votes.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get week start for each vote date
    const weekStarts = new Set();
    votes.forEach((vote) => {
      // Parse date safely to avoid timezone issues
      const dateOnly = vote.date.split('T')[0]; // Get just YYYY-MM-DD part
      const [year, month, day] = dateOnly.split('-');
      const voteDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      voteDate.setHours(0, 0, 0, 0);
      
      // Skip future dates
      if (voteDate.getTime() > today.getTime()) return;
      
      // Get Monday of the week (week start)
      const weekStart = new Date(voteDate);
      const dayOfWeek = weekStart.getDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday = 0, Monday = 1
      weekStart.setDate(weekStart.getDate() - daysToMonday);
      weekStart.setHours(0, 0, 0, 0);
      
      weekStarts.add(weekStart.getTime());
    });

    if (weekStarts.size > 0) {
      // Sort weeks in descending order (most recent first)
      const sortedWeeks = Array.from(weekStarts).sort((a, b) => b - a);
      
      // Get current week start
      const currentWeekStart = new Date(today);
      const dayOfWeek = currentWeekStart.getDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      currentWeekStart.setDate(currentWeekStart.getDate() - daysToMonday);
      currentWeekStart.setHours(0, 0, 0, 0);
      
      // Check for consecutive weeks starting from current or last week
      let expectedWeekStart = currentWeekStart.getTime();
      
      // If current week has no votes, start from last week
      if (!weekStarts.has(expectedWeekStart)) {
        expectedWeekStart -= 7 * 24 * 60 * 60 * 1000; // Go back one week
      }
      
      // Count consecutive weeks
      for (const weekTime of sortedWeeks) {
        if (weekTime === expectedWeekStart) {
          currentStreak++;
          expectedWeekStart -= 7 * 24 * 60 * 60 * 1000; // Go back one week
        } else {
          break;
        }
      }
    }
  }

  // Calculate votes this month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const votesThisMonth = votes.filter((vote) => {
    // Parse date safely to avoid timezone issues
    const dateOnly = vote.date.split('T')[0];
    const [year, month, day] = dateOnly.split('-');
    const voteDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return voteDate >= startOfMonth && voteDate <= endOfMonth;
  }).length;

  // Calculate active days in last 7 days
  const last7Days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    last7Days.push(date.getTime());
  }

  const activeDaysLast7 = last7Days.filter(dayTime => {
    return votes.some(vote => {
      const dateOnly = vote.date.split('T')[0];
      const [year, month, day] = dateOnly.split('-');
      const voteDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      voteDate.setHours(0, 0, 0, 0);
      return voteDate.getTime() === dayTime;
    });
  }).length;

  return {
    totalVotes,
    currentStreak,
    votesThisMonth,
    activeDaysLast7,
  };
};

// Fetch user identities
const fetchUserIdentities = async () => {
  try {
    const token = useCookie("auth-token");

    const identities = await $fetch("http://localhost:3000/auth/identities", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    userIdentities.value = identities;

    // Set primary identity as default
    const primaryIdentity = identities.find((identity) => identity.isPrimary);
    if (primaryIdentity) {
      selectedIdentityId.value = primaryIdentity.userIdentityId;
    } else if (identities.length > 0) {
      selectedIdentityId.value = identities[0].userIdentityId;
    }
  } catch (error) {
    console.error("Failed to fetch identities:", error);
    if (error.status === 401 || error.status === 403) {
      const token = useCookie("auth-token");
      token.value = null;
      await navigateTo("/auth/login");
    }
  }
};

// Fetch votes and calculate stats
const fetchVotes = async () => {
  if (!selectedIdentityId.value) return;

  try {
    votesLoading.value = true;
    const token = useCookie("auth-token");

    const votes = await $fetch(
      `http://localhost:3000/api/votes?userIdentityId=${selectedIdentityId.value}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

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

// Haptic feedback function
const triggerHapticFeedback = () => {
  if ("vibrate" in navigator) {
    navigator.vibrate([50, 50, 100]);
  }
};

// Handle vote cast - refresh data and update stats with animation
const handleVoteCast = (response) => {
  // Add new vote to recent votes immediately
  if (response.vote) {
    recentVotes.value.unshift(response.vote);
    // Keep only last 10 votes
    recentVotes.value = recentVotes.value.slice(0, 10);
  }

  // Select a random inspiring message
  const randomIndex = Math.floor(Math.random() * inspiringMessages.length);
  currentMessage.value = inspiringMessages[randomIndex];

  // Trigger celebration effects
  triggerHapticFeedback();
  showSuccessMessage.value = true;
  showConfetti.value = true;

  // Stop confetti after 1.8 seconds (to match animation duration)
  setTimeout(() => {
    showConfetti.value = false;
  }, 1800);

  // Hide success message after 7 seconds
  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 5500);

  // Delay stats update to create rolling effect - longer delay for better visibility
  setTimeout(async () => {
    const oldStats = { ...voteStats.value };

    // Always refetch votes to ensure correct calculation
    await fetchVotes();

    // Show celebration indicators only after stats are properly updated
    if (voteStats.value.currentStreak > oldStats.currentStreak) {
      showStreakText.value = true;
      setTimeout(() => {
        showStreakText.value = false;
      }, 3000);
    }
  }, 1500); // Longer delay for better animation visibility
};

// Date formatting functions
const formatDate = (dateString) => {
  if (!dateString) return "Invalid Date";
  
  // Handle full ISO date strings (e.g., "2025-10-02T00:00:00.000Z")
  const dateOnly = dateString.split('T')[0];
  
  // Parse as local date to avoid timezone issues
  const [year, month, day] = dateOnly.split('-');
  
  if (!year || !month || !day) return "Invalid Date";
  
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  if (isNaN(date.getTime())) return "Invalid Date";
  
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};

// Edit vote modal functions
const openEditVoteModal = (vote) => {
  currentEditingVote.value = vote;
  editVoteForm.value = {
    date: vote.date.split("T")[0], // Convert to YYYY-MM-DD format
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

    const response = await $fetch(
      `http://localhost:3000/api/votes/${currentEditingVote.value.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: requestBody,
      }
    );

    editVoteSuccess.value = "Vote updated successfully!";

    // Update the vote in the recent votes list
    const voteIndex = recentVotes.value.findIndex(
      (v) => v.id === currentEditingVote.value.id
    );
    if (voteIndex !== -1) {
      recentVotes.value[voteIndex] = response.vote;
    }

    // Refresh stats by refetching votes
    await fetchVotes();

    // Close modal after 1.5 seconds
    setTimeout(() => {
      closeEditVoteModal();
    }, 1500);
  } catch (err) {
    if (err.status === 401) {
      editVoteError.value = "You must be logged in to edit votes";
    } else if (err.status === 404) {
      editVoteError.value =
        "Vote not found or you don't have permission to edit it";
    } else if (err.status === 400) {
      editVoteError.value =
        err.data?.message || "Invalid input. Please check your data.";
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

    const response = await $fetch(
      `http://localhost:3000/api/votes/${currentEditingVote.value.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    editVoteSuccess.value = "Vote deleted successfully!";

    // Remove the vote from the recent votes list
    recentVotes.value = recentVotes.value.filter(
      (v) => v.id !== currentEditingVote.value.id
    );

    // Refresh stats by refetching votes
    await fetchVotes();

    // Close modal after 1.5 seconds
    setTimeout(() => {
      closeEditVoteModal();
    }, 1500);
  } catch (err) {
    if (err.status === 401) {
      editVoteError.value = "You must be logged in to delete votes";
    } else if (err.status === 404) {
      editVoteError.value =
        "Vote not found or you don't have permission to delete it";
    } else {
      editVoteError.value = "An error occurred. Please try again.";
    }
  } finally {
    editVoteLoading.value = false;
  }
};

// Handle identity change
const handleIdentityChange = () => {
  fetchVotes();
};

// Initialize data
const initializeDashboard = async () => {
  await fetchUserIdentities();
  if (selectedIdentityId.value) {
    await fetchVotes();
  }
};

// Fetch data on component mount
onMounted(() => {
  initializeDashboard();
});
</script>

<style scoped>
/* Confetti Animation */
.confetti-burst {
  position: relative;
  width: 100%;
  height: 100%;
}

.confetti-piece {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  animation: confetti-fall 1.8s ease-out forwards;
}

.confetti-1 {
  background: #3b82f6;
  top: 50%;
  left: 50%;
  animation-delay: 0s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-2 {
  background: #f59e0b;
  top: 50%;
  left: 50%;
  animation-delay: 0.1s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-3 {
  background: #10b981;
  top: 50%;
  left: 50%;
  animation-delay: 0.2s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-4 {
  background: #8b5cf6;
  top: 50%;
  left: 50%;
  animation-delay: 0.3s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-5 {
  background: #ef4444;
  top: 50%;
  left: 50%;
  animation-delay: 0.1s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-6 {
  background: #f59e0b;
  top: 50%;
  left: 50%;
  animation-delay: 0.2s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-7 {
  background: #3b82f6;
  top: 50%;
  left: 50%;
  animation-delay: 0s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-8 {
  background: #10b981;
  top: 50%;
  left: 50%;
  animation-delay: 0.3s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-9 {
  background: #8b5cf6;
  top: 50%;
  left: 50%;
  animation-delay: 0.15s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-10 {
  background: #ef4444;
  top: 50%;
  left: 50%;
  animation-delay: 0.25s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-11 {
  background: #3b82f6;
  top: 50%;
  left: 50%;
  animation-delay: 0.05s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-12 {
  background: #f59e0b;
  top: 50%;
  left: 50%;
  animation-delay: 0.35s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-13 {
  background: #ef4444;
  top: 50%;
  left: 50%;
  animation-delay: 0.05s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-14 {
  background: #8b5cf6;
  top: 50%;
  left: 50%;
  animation-delay: 0.4s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-15 {
  background: #10b981;
  top: 50%;
  left: 50%;
  animation-delay: 0.08s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-16 {
  background: #3b82f6;
  top: 50%;
  left: 50%;
  animation-delay: 0.45s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-17 {
  background: #f59e0b;
  top: 50%;
  left: 50%;
  animation-delay: 0.12s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-18 {
  background: #ef4444;
  top: 50%;
  left: 50%;
  animation-delay: 0.5s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-19 {
  background: #8b5cf6;
  top: 50%;
  left: 50%;
  animation-delay: 0.18s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-20 {
  background: #10b981;
  top: 50%;
  left: 50%;
  animation-delay: 0.55s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-21 {
  background: #3b82f6;
  top: 50%;
  left: 50%;
  animation-delay: 0.22s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-22 {
  background: #f59e0b;
  top: 50%;
  left: 50%;
  animation-delay: 0.6s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-23 {
  background: #ef4444;
  top: 50%;
  left: 50%;
  animation-delay: 0.28s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-24 {
  background: #8b5cf6;
  top: 50%;
  left: 50%;
  animation-delay: 0.65s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-25 {
  background: #10b981;
  top: 50%;
  left: 50%;
  animation-delay: 0.02s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-26 {
  background: #3b82f6;
  top: 50%;
  left: 50%;
  animation-delay: 0.7s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-27 {
  background: #f59e0b;
  top: 50%;
  left: 50%;
  animation-delay: 0.32s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-28 {
  background: #ef4444;
  top: 50%;
  left: 50%;
  animation-delay: 0.75s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-29 {
  background: #8b5cf6;
  top: 50%;
  left: 50%;
  animation-delay: 0.38s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-30 {
  background: #10b981;
  top: 50%;
  left: 50%;
  animation-delay: 0.8s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-31 {
  background: #3b82f6;
  top: 50%;
  left: 50%;
  animation-delay: 0.42s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-32 {
  background: #f59e0b;
  top: 50%;
  left: 50%;
  animation-delay: 0.85s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-33 {
  background: #ef4444;
  top: 50%;
  left: 50%;
  animation-delay: 0.48s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-34 {
  background: #8b5cf6;
  top: 50%;
  left: 50%;
  animation-delay: 0.9s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-35 {
  background: #10b981;
  top: 50%;
  left: 50%;
  animation-delay: 0.52s;
  transform: translate(-50%, -50%) scale(0);
}
.confetti-36 {
  background: #3b82f6;
  top: 50%;
  left: 50%;
  animation-delay: 0.95s;
  transform: translate(-50%, -50%) scale(0);
}

@keyframes confetti-fall {
  0% {
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
    opacity: 1;
  }
  15% {
    transform: translate(-50%, -50%) scale(1) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--end-x, -50%), var(--end-y, 120px)) scale(0.3)
      rotate(720deg);
    opacity: 0;
  }
}

/* Random end positions for confetti pieces */
.confetti-1 {
  --end-x: -120px;
  --end-y: -80px;
}
.confetti-2 {
  --end-x: 140px;
  --end-y: -100px;
}
.confetti-3 {
  --end-x: -80px;
  --end-y: 150px;
}
.confetti-4 {
  --end-x: 160px;
  --end-y: 120px;
}
.confetti-5 {
  --end-x: -150px;
  --end-y: -60px;
}
.confetti-6 {
  --end-x: 100px;
  --end-y: -140px;
}
.confetti-7 {
  --end-x: -60px;
  --end-y: 180px;
}
.confetti-8 {
  --end-x: 180px;
  --end-y: -40px;
}
.confetti-9 {
  --end-x: -100px;
  --end-y: -120px;
}
.confetti-10 {
  --end-x: 120px;
  --end-y: 160px;
}
.confetti-11 {
  --end-x: -40px;
  --end-y: -160px;
}
.confetti-12 {
  --end-x: 200px;
  --end-y: 80px;
}
.confetti-13 {
  --end-x: -320px;
  --end-y: -180px;
}
.confetti-14 {
  --end-x: 380px;
  --end-y: 280px;
}
.confetti-15 {
  --end-x: -280px;
  --end-y: 400px;
}
.confetti-16 {
  --end-x: 420px;
  --end-y: -240px;
}
.confetti-17 {
  --end-x: -360px;
  --end-y: 200px;
}
.confetti-18 {
  --end-x: 340px;
  --end-y: 440px;
}
.confetti-19 {
  --end-x: -240px;
  --end-y: -360px;
}
.confetti-20 {
  --end-x: 460px;
  --end-y: 120px;
}
.confetti-21 {
  --end-x: -320px;
  --end-y: -280px;
}
.confetti-22 {
  --end-x: 280px;
  --end-y: 480px;
}
.confetti-23 {
  --end-x: -480px;
  --end-y: -120px;
}
.confetti-24 {
  --end-x: 500px;
  --end-y: 360px;
}
.confetti-25 {
  --end-x: -400px;
  --end-y: -200px;
}
.confetti-26 {
  --end-x: 440px;
  --end-y: 520px;
}
.confetti-27 {
  --end-x: -520px;
  --end-y: 300px;
}
.confetti-28 {
  --end-x: 380px;
  --end-y: -360px;
}
.confetti-29 {
  --end-x: -300px;
  --end-y: 560px;
}
.confetti-30 {
  --end-x: 600px;
  --end-y: 200px;
}
.confetti-31 {
  --end-x: -560px;
  --end-y: -160px;
}
.confetti-32 {
  --end-x: 320px;
  --end-y: 600px;
}
.confetti-33 {
  --end-x: -480px;
  --end-y: -400px;
}
.confetti-34 {
  --end-x: 540px;
  --end-y: 460px;
}
.confetti-35 {
  --end-x: -420px;
  --end-y: 320px;
}
.confetti-36 {
  --end-x: 480px;
  --end-y: -520px;
}

/* Success Banner Animations */
.animate-shimmer-fast {
  animation: shimmer 1s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-900 {
  animation-delay: 0.9s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
