<template>
  <span class="inline-block relative overflow-hidden">
    <span 
      :class="[
        'block transition-transform duration-[1800ms] ease-out',
        isAnimating ? 'animate-roll-up' : ''
      ]"
      :style="{ transform: `translateY(${translateY}px)` }"
    >
      {{ displayValue }}
    </span>
  </span>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 1800
  }
});

const displayValue = ref(props.value);
const isAnimating = ref(false);
const translateY = ref(0);

// Watch for value changes and animate
watch(() => props.value, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    animateToNewValue(newValue, oldValue);
  }
});

const animateToNewValue = (newValue, oldValue) => {
  isAnimating.value = true;
  
  // Start with old value sliding up
  translateY.value = -20;
  
  // After a short delay, update the display value and slide in new value
  setTimeout(() => {
    displayValue.value = newValue;
    translateY.value = 20;
    
    // Then slide to final position
    setTimeout(() => {
      translateY.value = 0;
      isAnimating.value = false;
    }, 50);
  }, props.duration / 2);
};

// Initialize display value
onMounted(() => {
  displayValue.value = props.value;
});
</script>

<style scoped>
@keyframes roll-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  50% {
    transform: translateY(-5px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-roll-up {
  animation: roll-up 1.8s ease-out;
}
</style>