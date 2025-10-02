<template>
  <div class="w-full bg-slate-800 rounded-xl p-6">
    <h3 class="text-lg font-semibold text-white mb-4">Vote Activity</h3>
    
    <!-- Heatmap Container -->
    <div class="overflow-x-auto">
      <div class="min-w-max">
        <!-- Month Labels -->
        <div class="flex mb-2">
          <div class="w-8"></div> <!-- Spacer for day labels -->
          <div v-for="month in months" :key="month.name" class="text-xs text-slate-400 text-center" :style="{ width: `${month.weeks * 13}px` }">
            {{ month.name }}
          </div>
        </div>
        
        <!-- Days Grid -->
        <div class="flex">
          <!-- Day Labels -->
          <div class="flex flex-col mr-2">
            <div class="h-3 text-xs text-slate-400 flex items-center">Mon</div>
            <div class="h-3"></div>
            <div class="h-3 text-xs text-slate-400 flex items-center">Wed</div>
            <div class="h-3"></div>
            <div class="h-3 text-xs text-slate-400 flex items-center">Fri</div>
            <div class="h-3"></div>
            <div class="h-3"></div>
          </div>
          
          <!-- Heatmap Grid -->
          <div class="grid grid-cols-53 gap-1" style="grid-template-rows: repeat(7, 11px);">
            <div
              v-for="(day, index) in yearGrid"
              :key="index"
              :class="getDayClass(day)"
              class="w-2.5 h-2.5 rounded-sm transition-colors duration-200 hover:ring-1 hover:ring-slate-400"
              :title="getDayTooltip(day)"
            ></div>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="flex items-center justify-start mt-4 text-xs text-slate-400">
          <span class="mr-2">Less</span>
          <div class="flex gap-1">
            <div class="w-2.5 h-2.5 bg-slate-700 rounded-sm"></div>
            <div class="w-2.5 h-2.5 bg-emerald-500/30 rounded-sm"></div>
            <div class="w-2.5 h-2.5 bg-emerald-500/60 rounded-sm"></div>
            <div class="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></div>
          </div>
          <span class="ml-2">More</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  votes: {
    type: Array,
    default: () => []
  }
});

// Generate year grid (53 weeks × 7 days)
const yearGrid = computed(() => {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  oneYearAgo.setDate(oneYearAgo.getDate() + 1); // Start from day after one year ago
  
  const grid = [];
  const voteCounts = {};
  
  // Count votes per day
  props.votes.forEach(vote => {
    const dateKey = vote.date.split('T')[0]; // Get YYYY-MM-DD format
    voteCounts[dateKey] = (voteCounts[dateKey] || 0) + 1;
  });
  
  // Generate 371 days (53 weeks × 7 days + 1 extra day)
  for (let i = 0; i < 371; i++) {
    const date = new Date(oneYearAgo);
    date.setDate(date.getDate() + i);
    
    const dateKey = date.toISOString().split('T')[0];
    const voteCount = voteCounts[dateKey] || 0;
    
    grid.push({
      date: new Date(date),
      votes: voteCount,
      dateKey
    });
  }
  
  return grid;
});

// Month labels with week spans
const months = computed(() => {
  const monthData = [];
  let currentMonth = -1;
  let weekCount = 0;
  
  for (let week = 0; week < 53; week++) {
    const weekDate = new Date(yearGrid.value[week * 7]?.date || new Date());
    const month = weekDate.getMonth();
    
    if (month !== currentMonth) {
      if (weekCount > 0) {
        monthData[monthData.length - 1].weeks = weekCount;
      }
      monthData.push({
        name: weekDate.toLocaleDateString('en-US', { month: 'short' }),
        weeks: 0
      });
      currentMonth = month;
      weekCount = 0;
    }
    weekCount++;
  }
  
  // Set weeks for last month
  if (monthData.length > 0) {
    monthData[monthData.length - 1].weeks = weekCount;
  }
  
  return monthData;
});

const getDayClass = (day) => {
  if (!day || day.votes === 0) {
    return 'bg-slate-700'; // No votes
  } else if (day.votes === 1) {
    return 'bg-emerald-500/30'; // Light green
  } else if (day.votes === 2) {
    return 'bg-emerald-500/60'; // Medium green
  } else {
    return 'bg-emerald-500'; // Dark green
  }
};

const getDayTooltip = (day) => {
  if (!day) return '';
  const dateStr = day.date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  const voteText = day.votes === 1 ? 'vote' : 'votes';
  return `${day.votes} ${voteText} on ${dateStr}`;
};
</script>