<template>
  <div class="relative w-40 h-40 mx-auto">
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
        stroke-width="8"
        stroke-linecap="round"
      />

      <!-- Green Zone (0-4 days) -->
      <path
        :d="greenZoneArc"
        fill="none"
        :stroke="colors.green"
        stroke-width="8"
        stroke-linecap="round"
        opacity="0.3"
      />

      <!-- Orange/Amber Zone (4-5 days) -->
      <path
        :d="amberZoneArc"
        fill="none"
        :stroke="colors.amber"
        stroke-width="8"
        stroke-linecap="round"
        opacity="0.4"
      />

      <!-- Red Zone (5-7 days) -->
      <path
        :d="redZoneArc"
        fill="none"
        :stroke="colors.red"
        stroke-width="8"
        stroke-linecap="round"
        opacity="0.3"
      />

      <!-- Active Progress Arc -->
      <path
        :d="progressArc"
        fill="none"
        :stroke="currentZoneColor"
        stroke-width="10"
        stroke-linecap="round"
        class="transition-all duration-1000 ease-out"
        :style="{
          strokeDasharray: `${progressLength} 1000`,
          strokeDashoffset: 0,
        }"
      />

      <!-- Center Circle -->
      <circle
        cx="100"
        cy="100"
        r="12"
        :fill="colors.center"
        :stroke="colors.centerBorder"
        stroke-width="2"
      />

      <!-- Pointer -->
      <line
        x1="100"
        y1="100"
        :x2="pointerX"
        :y2="pointerY"
        :stroke="colors.pointer"
        stroke-width="3"
        stroke-linecap="round"
        class="transition-all duration-1000 ease-out"
        :style="{
          transform: `rotate(${pointerAngle}deg)`,
          transformOrigin: '100px 100px',
        }"
      />

      <!-- Pointer Tip -->
      <circle
        :cx="pointerX"
        :cy="pointerY"
        r="4"
        :fill="colors.pointer"
        class="transition-all duration-1000 ease-out"
        :style="{
          transform: `rotate(${pointerAngle}deg)`,
          transformOrigin: '100px 100px',
        }"
      />
    </svg>


    <!-- Zone Warning Text -->
    <div class="absolute -bottom-6 left-0 right-0 text-center">
      <div
        v-if="activeDays >= 6"
        :class="['text-xs font-medium', warningTextClass]"
      >
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

// Color schemes - easy to swap
const colorSchemes = {
  amber: {
    background: "#374151", // slate-700
    green: "#10b981", // emerald-500
    amber: "#f59e0b", // amber-500
    red: "#ef4444", // red-500
    center: "#1f2937", // gray-800
    centerBorder: "#6b7280", // gray-500
    pointer: "#f59e0b", // amber-500
  },
  blue: {
    background: "#374151",
    green: "#10b981",
    amber: "#3b82f6", // blue-500
    red: "#dc2626",
    center: "#1f2937",
    centerBorder: "#6b7280",
    pointer: "#3b82f6",
  },
  green: {
    background: "#374151",
    green: "#10b981",
    amber: "#84cc16", // lime-500
    red: "#dc2626",
    center: "#1f2937",
    centerBorder: "#6b7280",
    pointer: "#10b981",
  },
};

const colors = computed(
  () => colorSchemes[props.colorScheme] || colorSchemes.amber
);

// 270-degree arc calculations
const radius = 70;
const centerX = 100;
const centerY = 100;
const startAngle = 135; // Start at bottom left (8 o'clock position)
const endAngle = 135 + 270; // End at bottom right (4 o'clock position)
const totalAngle = 270;

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
const greenZoneArc = computed(() =>
  createArc(startAngle, startAngle + (4 / 7) * totalAngle)
);
const amberZoneArc = computed(() =>
  createArc(
    startAngle + (4 / 7) * totalAngle,
    startAngle + (5 / 7) * totalAngle
  )
);
const redZoneArc = computed(() =>
  createArc(startAngle + (5 / 7) * totalAngle, endAngle)
);

// Progress arc based on active days
const progressArc = computed(() => {
  const progressAngle = (props.activeDays / 7) * totalAngle;
  return createArc(startAngle, startAngle + progressAngle);
});

const progressLength = computed(() => {
  const progressAngle = (props.activeDays / 7) * totalAngle;
  return (progressAngle / 360) * (2 * Math.PI * radius);
});

// Pointer calculations
const pointerAngle = computed(() => {
  return startAngle + (props.activeDays / 7) * totalAngle;
});

const pointerX = computed(() => {
  const angle = (pointerAngle.value * Math.PI) / 180;
  return centerX + (radius - 15) * Math.cos(angle);
});

const pointerY = computed(() => {
  const angle = (pointerAngle.value * Math.PI) / 180;
  return centerY + (radius - 15) * Math.sin(angle);
});

// Dynamic colors based on current value
const currentZoneColor = computed(() => {
  if (props.activeDays <= 4) return colors.value.green;
  if (props.activeDays <= 5) return colors.value.amber;
  return colors.value.red;
});

const textColorClass = computed(() => {
  if (props.activeDays <= 4) return "text-emerald-400";
  if (props.activeDays <= 5) return "text-amber-400";
  return "text-red-400";
});

const warningTextClass = computed(() => {
  if (props.activeDays <= 5) return "text-amber-400";
  return "text-red-400";
});

const warningMessage = computed(() => {
  return "Pace yourself";
});
</script>
