<template>
  <div class="w-full">

    <!-- Heatmap Container -->
    <div class="overflow-x-auto">
      <div class="min-w-max">
        <!-- Month Labels -->
        <div class="flex mb-5 relative">
          <div class="w-8"></div>
          <!-- Spacer for day labels -->
          <div class="relative" style="width: calc(53 * 12px + 52 * 4px);">
            <div
              v-for="month in months"
              :key="month.name"
              class="absolute text-xs text-slate-400 text-center"
              :style="{ 
                left: `${month.offset * (12 + 4)}px`,
                width: `${month.weeks * 12 + (month.weeks - 1) * 4}px`
              }"
            >
              {{ month.name }}
            </div>
          </div>
        </div>

        <!-- Days Grid -->
        <div class="flex">
          <!-- Day Labels -->
          <div class="flex flex-col mr-2" style="gap: 6px;">
            <div class="h-3 text-xs text-slate-400 flex items-center">Mon</div>
            <div class="h-3"></div>
            <div class="h-3 text-xs text-slate-400 flex items-center">Wed</div>
            <div class="h-3"></div>
            <div class="h-3 text-xs text-slate-400 flex items-center">Fri</div>
            <div class="h-3"></div>
            <div class="h-3"></div>
          </div>

          <!-- Heatmap Grid -->
          <div
            class="grid grid-cols-53 gap-1"
            style="grid-template-rows: repeat(7, 14px)"
          >
            <div
              v-for="(day, index) in yearGrid"
              :key="index"
              :class="getDayClass(day)"
              class="w-3 h-3 rounded-full transition-colors duration-200 hover:ring-1 hover:ring-slate-400"
              :title="getDayTooltip(day)"
            ></div>
          </div>
        </div>

        <!-- Legend -->
        <div
          class="flex items-center justify-start mt-4 text-xs text-slate-400"
        >
          <span class="mr-2">Less</span>
          <div class="flex gap-1">
            <div class="w-3 h-3 bg-slate-700 rounded-full"></div>
            <div class="w-3 h-3 bg-emerald-500/30 rounded-full"></div>
            <div class="w-3 h-3 bg-emerald-500/60 rounded-full"></div>
            <div class="w-3 h-3 bg-emerald-500 rounded-full"></div>
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
    default: () => [],
  },
});

// Generate year grid (53 weeks × 7 days) - arranged by columns like GitHub
const yearGrid = computed(() => {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  oneYearAgo.setDate(oneYearAgo.getDate() + 1); // Start from day after one year ago

  const voteCounts = {};

  // Count votes per day
  props.votes.forEach((vote) => {
    const dateKey = vote.date.split("T")[0]; // Get YYYY-MM-DD format
    voteCounts[dateKey] = (voteCounts[dateKey] || 0) + 1;
  });

  // Generate days in chronological order
  const chronologicalDays = [];
  for (let i = 0; i < 371; i++) {
    const date = new Date(oneYearAgo);
    date.setDate(date.getDate() + i);

    const dateKey = date.toISOString().split("T")[0];
    const voteCount = voteCounts[dateKey] || 0;

    chronologicalDays.push({
      date: new Date(date),
      votes: voteCount,
      dateKey,
    });
  }

  // Create grid aligned to actual days of the week
  const grid = [];
  const weeks = 53;
  const daysPerWeek = 7;

  // Create a 2D array: [week][dayOfWeek] where dayOfWeek: 0=Sunday, 1=Monday, etc.
  const weekGrid = Array(weeks).fill(null).map(() => Array(daysPerWeek).fill(null));
  
  // Fill the 2D array, placing each day in the correct day-of-week slot
  chronologicalDays.forEach((dayData) => {
    // Calculate which week this day belongs to (from start date)
    const daysSinceStart = Math.floor((dayData.date - oneYearAgo) / (24 * 60 * 60 * 1000));
    const week = Math.floor(daysSinceStart / 7);
    
    // Get the actual day of the week for this date (0=Sunday, 1=Monday, etc.)
    const dayOfWeek = dayData.date.getDay();
    
    if (week >= 0 && week < weeks) {
      weekGrid[week][dayOfWeek] = dayData;
    }
  });

  // Flatten in row-major order for CSS grid (Monday=0, Tuesday=1, etc. in our display)
  // But adjust to start with Monday as row 0
  const dayOrder = [1, 2, 3, 4, 5, 6, 0]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
  for (const dayOfWeek of dayOrder) {
    for (let week = 0; week < weeks; week++) {
      grid.push(weekGrid[week][dayOfWeek]);
    }
  }

  return grid;
});

// Month labels with week spans
const months = computed(() => {
  const monthData = [];
  let currentMonth = -1;
  let currentMonthWeeks = 0;
  let weekOffset = 0; // Track position offset for each month

  // Get the starting date for month calculation
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  oneYearAgo.setDate(oneYearAgo.getDate() + 1);

  for (let week = 0; week < 53; week++) {
    // Calculate the date for the start of this week
    const weekStart = new Date(oneYearAgo);
    weekStart.setDate(weekStart.getDate() + (week * 7));
    const month = weekStart.getMonth();

    if (month !== currentMonth) {
      // Finish the previous month
      if (currentMonthWeeks > 0) {
        monthData[monthData.length - 1].weeks = currentMonthWeeks;
        monthData[monthData.length - 1].offset = weekOffset;
      }
      
      // Start new month
      monthData.push({
        name: weekStart.toLocaleDateString("en-US", { month: "short" }),
        weeks: 0,
        offset: week, // This month starts at this week position
      });
      currentMonth = month;
      currentMonthWeeks = 0;
      weekOffset = week;
    }
    currentMonthWeeks++;
  }

  // Set weeks for last month
  if (monthData.length > 0) {
    monthData[monthData.length - 1].weeks = currentMonthWeeks;
    if (!monthData[monthData.length - 1].offset) {
      monthData[monthData.length - 1].offset = weekOffset;
    }
  }

  return monthData;
});

const getDayClass = (day) => {
  if (!day || day.votes === 0) {
    return "bg-slate-700"; // No votes
  } else if (day.votes === 1) {
    return "bg-emerald-500/30"; // Light green
  } else if (day.votes === 2) {
    return "bg-emerald-500/60"; // Medium green
  } else {
    return "bg-emerald-500"; // Dark green
  }
};

const getDayTooltip = (day) => {
  if (!day) return "";
  const dateStr = day.date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const voteText = day.votes === 1 ? "vote" : "votes";
  return `${day.votes} ${voteText} on ${dateStr}`;
};
</script>
