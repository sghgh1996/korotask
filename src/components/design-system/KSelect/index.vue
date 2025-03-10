<script setup lang="ts">
import { computed } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

interface KSelectProps {
  modelValue: string | number;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<KSelectProps>(), {
  label: '',
  placeholder: 'Select an option',
  disabled: false,
  required: false,
  errorMessage: '',
  id: () => `select-${Math.random().toString(36).substring(2, 9)}`,
  size: 'md'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'change', event: Event): void;
}>();

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
  emit('change', event);
};

const selectClasses = computed(() => [
  'w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500',
  'disabled:bg-gray-100 disabled:cursor-not-allowed',
  props.errorMessage ? 'border-red-500' : 'border-gray-300',
  {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }[props.size]
]);
</script>

<template>
  <div class="mb-4 w-full">
    <label
      v-if="label"
      :for="id"
      class="block font-medium text-gray-700 text-sm md:text-base"
    >
      {{ label }}<span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="selectClasses"
        @input="updateValue"
        @blur="$emit('blur', $event)"
      >
        <option v-if="options.length === 0" value="" disabled>
          No authors available
        </option>
        <option value="0" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <div
      v-if="errorMessage"
      class="mt-1 text-sm text-red-600 transition-all"
      role="alert"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
