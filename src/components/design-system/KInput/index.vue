<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface KInputProps {
  modelValue?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  maxlength?: number | string;
  errorMessage?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<KInputProps>(), {
  modelValue: '',
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  required: false,
  errorMessage: '',
  id: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  size: 'md'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

// Computed input classes based on props
const inputClasses = [
  'w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500',
  'disabled:bg-gray-100 disabled:cursor-not-allowed',
  props.errorMessage ? 'border-red-500' : 'border-gray-300',
  {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }[props.size]
];
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
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :maxlength="maxlength"
        :class="inputClasses"
        @input="updateValue"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
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
