<script setup lang="ts">
import { ref, provide } from 'vue'
import { RouterView } from 'vue-router';

import AppHeader from '~/components/layout/AppHeader.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
import KToast from '~/components/design-system/KToast/index.vue';

import { ToastSymbol } from '~/composables/useToast';

const toastRef = ref<InstanceType<typeof KToast> | null>(null)

provide(ToastSymbol, (message: string, type: 'success' | 'error') => {
  toastRef.value?.addToast(message, type)
})
</script>

<template>
  <div>
    <AppHeader />

    <main class="min-h-screen">
      <RouterView />
      <KToast ref="toastRef" />
    </main>

    <AppFooter />
  </div>
</template>
