<template>
  <div class="relative" ref="dropdownRef">
    <!-- Trigger Button -->
    <button
      @click="toggleDropdown"
      :class="[
        'w-full flex items-center justify-between px-3 py-2 text-left',
        'bg-slate-700 border border-slate-600 rounded-md text-white',
        'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500',
        'hover:bg-slate-600 transition-colors duration-200 hover:cursor-pointer',
        isOpen ? 'ring-2 ring-slate-500 border-slate-500' : '',
      ]"
    >
      <span class="truncate">{{ displayText }}</span>
      <svg
        :class="[
          'w-5 h-5 text-slate-400 transition-transform duration-200',
          isOpen ? 'rotate-180' : '',
        ]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      :class="[
        'absolute top-full left-0 right-0 mt-1',
        'bg-slate-700 border border-slate-600 rounded-md shadow-lg',
        'max-h-60 overflow-y-auto z-50',
      ]"
    >
      <button
        v-for="(option, index) in options"
        :key="getOptionKey(option, index)"
        @click="selectOption(option)"
        :class="[
          'w-full px-3 py-2 text-left hover:bg-slate-600 transition-colors duration-150',
          'text-white text-sm hover:cursor-pointer',
          isSelected(option) ? 'bg-slate-600' : '',
        ]"
      >
        {{ getOptionDisplay(option) }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  displayKey: {
    type: String,
    default: null,
  },
  valueKey: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

const displayText = computed(() => {
  if (!props.modelValue) return props.placeholder;

  const selectedOption = props.options.find((option) => {
    const optionValue = props.valueKey ? option[props.valueKey] : option;
    return optionValue === props.modelValue;
  });

  if (!selectedOption) return props.placeholder;

  return getOptionDisplay(selectedOption);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  const value = props.valueKey ? option[props.valueKey] : option;
  emit("update:modelValue", value);
  emit("change", value);
  isOpen.value = false;
};

const isSelected = (option) => {
  const optionValue = props.valueKey ? option[props.valueKey] : option;
  return optionValue === props.modelValue;
};

const getOptionDisplay = (option) => {
  if (props.displayKey) {
    return option[props.displayKey];
  }
  return typeof option === "object" ? JSON.stringify(option) : String(option);
};

const getOptionKey = (option, index) => {
  if (props.valueKey) {
    return option[props.valueKey];
  }
  return typeof option === "object" ? index : option;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Close on escape key
const handleKeydown = (event) => {
  if (event.key === "Escape") {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>
