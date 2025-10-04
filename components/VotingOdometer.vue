<template>
  <div class="relative w-70 h-70 mx-auto">
    <!-- SVG Gauge -->
    <svg
      class="w-full h-full"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Background Arc -->
      <path
        :d="backgroundArc"
        fill="none"
        :stroke="colors.background"
        stroke-width="12"
        stroke-linecap="round"
      />

      <!-- Odometer 0 label at the start of the arc -->
      <text
        :x="labelX"
        :y="labelY"
        fill="#c6c6c6"
        font-size="10"
        text-anchor="end"
        dominant-baseline="middle"
      >
        0
      </text>

      <!-- Green Zone (0-5 days = 5/7 of total) -->
      <path
        :d="greenZoneArc"
        fill="none"
        :stroke="colors.green"
        stroke-width="12"
        stroke-linecap="round"
      />

      <!-- Red Zone (5-7 days = 2/7 of total) -->
      <path
        :d="redZoneArc"
        fill="none"
        :stroke="colors.red"
        stroke-width="12"
        stroke-linecap="round"
      />

      <!-- Center Circle -->
      <circle
        cx="100"
        cy="100"
        r="6"
        :fill="colors.center"
        :stroke="colors.centerBorder"
        stroke-width="1"
      />

      <!-- Pointer -->
      <line
        x1="100"
        y1="100"
        x2="170"
        y2="100"
        :stroke="colors.pointer"
        stroke-width="3"
        stroke-linecap="round"
        class="transition-all duration-1000 ease-out"
        :style="{
          transform: `rotate(${pointerAngle}deg)`,
          transformOrigin: '100px 100px',
        }"
      />

      <!-- Odometer 7 label at the end of the arc -->
      <text
        :x="labelXEnd"
        :y="labelYEnd"
        fill="#c6c6c6"
        font-size="10"
        text-anchor="start"
        dominant-baseline="middle"
      >
        7
      </text>
    </svg>

    <!-- Zone Warning Text -->
    <div class="absolute bottom-10 left-0 right-0 text-center">
      <div v-if="activeDays >= 6" class="text-sm font-bold text-red-400">
        {{ warningMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activeDays: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 7,
  },
  colorScheme: {
    type: String,
    default: "amber", // 'amber', 'blue', 'green'
  },
});

// Simple color definitions using CSS variables and Tailwind colors
const colors = {
  background: "#374151", // slate-700
  green: "var(--primary-color)",
  red: "var(--secondary-color)",
  center: "#1f2937", // gray-800
  centerBorder: "#6b7280", // gray-500
  pointer: "#ffffff", // white
};

// 270-degree arc calculations
const radius = 70;
const centerX = 100;
const centerY = 100;
const startAngle = -210; // Start between 7-8 o'clock position
const endAngle = -210 + 240; // Adjust to match actual red zone end
const totalAngle = 240;

// Helper function to create arc path
const createArc = (startDeg, endDeg) => {
  const start = (startDeg * Math.PI) / 180;
  const end = (endDeg * Math.PI) / 180;

  const startX = centerX + radius * Math.cos(start);
  const startY = centerY + radius * Math.sin(start);
  const endX = centerX + radius * Math.cos(end);
  const endY = centerY + radius * Math.sin(end);

  const largeArc = endDeg - startDeg > 180 ? 1 : 0;

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`;
};

// Arc paths for different zones
const backgroundArc = computed(() => createArc(startAngle, endAngle));
const greenZoneEndAngle = computed(() => startAngle + (5 / 7) * totalAngle);
const greenZoneArc = computed(() =>
  createArc(startAngle, greenZoneEndAngle.value)
);
const redZoneArc = computed(() => createArc(greenZoneEndAngle.value, endAngle));

// Simple pointer calculation - just position based on activeDays
const pointerAngle = computed(() => {
  const ratio = props.activeDays / 7;
  return startAngle + ratio * totalAngle;
});

// Label coordinates for the odometer "0" placed slightly outside the arc start
const labelOffset = 10; // pixels outside the arc
const labelAngle = startAngle + 8; // place at the arc's starting angle
const labelX = computed(() => {
  const angle = (labelAngle * Math.PI) / 180;
  return centerX + (radius + labelOffset) * Math.cos(angle);
});

const labelY = computed(() => {
  const angle = (labelAngle * Math.PI) / 180;
  return centerY + (radius + labelOffset) * Math.sin(angle);
});

// End-label coordinates for the odometer "7" placed slightly outside the arc end
const labelAngleEnd = endAngle - 8; // place at the arc's ending angle
const labelXEnd = computed(() => {
  const angle = (labelAngleEnd * Math.PI) / 180;
  return centerX + (radius + labelOffset) * Math.cos(angle);
});

const labelYEnd = computed(() => {
  const angle = (labelAngleEnd * Math.PI) / 180;
  return centerY + (radius + labelOffset) * Math.sin(angle);
});

const warningMessage = computed(() => {
  return "Pace Yourself";
});
</script>
