<script setup lang="ts">
import KButton from "~/components/design-system/KButton/index.vue";
import AppContainer from "~/components/layout/AppContainer.vue";
</script>

<!-- TODO: complete the documentation for the  -->
<template>
  <AppContainer>
    <h1 class="text-4xl font-bold mb-6 text-indigo-700">Welcome to My Coding Assignment</h1>
    
    <p class="text-2xl mb-8 text-gray-700">
      A Vue.js application demonstrating component design and API integration
    </p>
    
    <div class="bg-white p-8 rounded-lg shadow-md mb-12 w-full max-w-xl">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">About this project</h2>
      
      <div class="space-y-3 text-left mb-6">
        <p class="flex justify-between border-b pb-2">
          <span class="font-medium">Developer:</span>
          <span>John Doe</span>
        </p>
        <p class="flex justify-between border-b pb-2">
          <span class="font-medium">Date:</span>
          <span>March 5, 2025</span>
        </p>
        <p class="flex justify-between border-b pb-2">
          <span class="font-medium">Framework:</span>
          <span>Vue 3 with TypeScript</span>
        </p>
        <p class="flex justify-between">
          <span class="font-medium">Styling:</span>
          <span>Tailwind CSS</span>
        </p>
      </div>
      
      <p class="text-gray-600 italic mb-6">
        This application demonstrates a design system with reusable components and 
        external API integration for data fetching and display.
      </p>
    </div>
    
    <RouterLink to="/posts" class="inline-block">
      <KButton variant="primary">
        Explore Posts
      </KButton>
    </RouterLink>
  </AppContainer>
</template>
