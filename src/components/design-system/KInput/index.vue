
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

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
}

withDefaults(defineProps<KInputProps>(), {
  modelValue: "",
  label: "",
  type: "text",
  placeholder: "",
  disabled: false,
  required: false,
  errorMessage: "",
  id: () => `input-${Math.random().toString(36).substring(2, 9)}`,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block mb-2 font-medium">{{
      label
    }}</label>
    <div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :maxlength="maxlength"
        class="w-full px-3 py-2 text-base border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        @input="updateValue"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <span v-if="errorMessage" class="block mt-1 text-sm text-red-600 error-message">{{
        errorMessage
      }}</span>
    </div>
  </div>
</template>
