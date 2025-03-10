<script setup lang="ts">
import { ref } from 'vue';
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';

interface KToast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const toasts = ref<KToast[]>([]);
let toastId = 0;

const addToast = (message: string, type: 'success' | 'error') => {
  const id = toastId++;
  toasts.value.push({ id, message, type });
  setTimeout(() => removeToast(id), 5000);
};

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

defineExpose({ addToast });
</script>

<template>
  <div>
    <TransitionGroup
      tag="div"
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="fixed top-4 right-4 z-50 flex flex-col gap-2"
      >
        <div
          :class="[
            'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg',
            toast.type === 'success' ? 'bg-green-50' : 'bg-red-50'
          ]"
        >
          <div class="p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CheckCircleIcon
                  v-if="toast.type === 'success'"
                  class="h-6 w-6 text-green-400"
                />
                <XCircleIcon v-else class="h-6 w-6 text-red-400" />
              </div>
              <div class="ml-3 flex-1 pt-0.5">
                <p
                  :class="[
                    'text-sm font-medium',
                    toast.type === 'success' ? 'text-green-800' : 'text-red-800'
                  ]"
                >
                  {{ toast.message }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  @click="removeToast(toast.id)"
                  class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
