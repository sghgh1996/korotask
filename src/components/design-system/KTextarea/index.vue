<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

interface KTextareaProps {
  modelValue: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxlength?: number;
  errorMessage?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<KTextareaProps>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  disabled: false,
  required: false,
  rows: 5,
  errorMessage: '',
  id: () => `textarea-${Math.random().toString(36).substring(2, 9)}`,
  size: 'md'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'input', event: Event): void;
}>();

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
  emit('input', event);
};

const textareaClasses = computed(() => [
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
      class="block mb-2 text-sm sm:text-base font-medium text-gray-700"
    >
      {{ label }}<span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :maxlength="maxlength"
        :class="textareaClasses"
        @input="updateValue"
        @blur="$emit('blur', $event)"
      ></textarea>
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
