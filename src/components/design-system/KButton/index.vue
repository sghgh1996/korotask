<script setup lang="ts">
import { computed } from "vue";

interface ButtonProps {
  variant?: "primary" | "success" | "error";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg"; // New size prop
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  disabled: false,
  type: "button",
  size: "md", // Default medium size
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const buttonClasses = computed(() => {
  const baseClasses =
    "rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  const variantClasses = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    error: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const disabledClasses = props.disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return `${baseClasses} ${sizeClasses[props.size]} ${
    variantClasses[props.variant]
  } ${disabledClasses}`;
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit("click", event);
  }
};
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
