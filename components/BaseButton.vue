<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "outline"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);

const buttonClasses = computed(() => {
  const baseClasses = [
    "font-semibold",
    "rounded-xl",
    "transition-all",
    "duration-200",
    "transform",
    "hover:scale-[1.02]",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:transform-none",
    "hover:cursor-pointer",
  ];

  // Width classes
  if (props.fullWidth) {
    baseClasses.push("w-full");
  }

  // Size classes
  const sizeClasses = {
    sm: ["px-3", "py-2", "text-sm"],
    md: ["px-4", "py-3", "text-sm"],
    lg: ["px-6", "py-4", "text-base"],
  };
  baseClasses.push(...sizeClasses[props.size]);

  // Variant classes
  const variantClasses = {
    primary: [
      "bg-gradient-to-r",
      "from-blue-500",
      "to-blue-700",
      "hover:from-blue-700",
      "hover:to-blue-900",
      "text-white",
      "shadow-lg",
      "focus:ring-blue-500",
    ],
    secondary: [
      "bg-slate-600",
      "hover:bg-slate-700",
      "text-white",
      "shadow-lg",
      "focus:ring-slate-500",
    ],
    outline: [
      "border",
      "border-slate-600",
      "text-slate-300",
      "hover:text-white",
      "hover:bg-slate-700",
      "focus:ring-slate-500",
    ],
  };
  baseClasses.push(...variantClasses[props.variant]);

  return baseClasses.join(" ");
});
</script>
