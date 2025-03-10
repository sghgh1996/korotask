<script setup lang="ts">
defineProps<{ message?: string }>();
</script>

<template>
  <div v-if="message" class="bg-red-50 p-4 rounded-md text-red-600 mb-4">
    <p>{{ message }}</p>
  </div>
</template>
