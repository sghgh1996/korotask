<script setup lang="ts">
import KButton from '~/components/design-system/KButton/index.vue';
import AppContainer from '~/components/common/AppContainer.vue';
</script>

<!-- TODO: complete the documentation for the  -->
<template>
  <AppContainer>
    <h1 class="text-4xl font-bold mb-6 text-indigo-700">
      Welcome to My Coding Assignment
    </h1>

    <RouterLink to="/posts" class="inline-block">
      <KButton variant="primary"> Explore Posts </KButton>
    </RouterLink>
  </AppContainer>
</template>
