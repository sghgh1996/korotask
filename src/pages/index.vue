<script setup lang="ts">
import KButton from '~/components/design-system/KButton/index.vue';
import AppContainer from '~/components/common/AppContainer.vue';
</script>

<template>
  <AppContainer>
    <div class="max-w-4xl">
      <RouterLink to="/posts" class="inline-block mb-6">
        <KButton variant="primary">Explore Posts</KButton>
      </RouterLink>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">
          Project Overview
        </h2>
        <p class="text-gray-600 mb-4">
          A modern Vue 3 application demonstrating CRUD operations, real-time
          search, form validation, and modern architectural patterns.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">
          Project Structure
        </h2>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>
            <strong>Components/</strong>
            <ul class="pl-6 mt-2 space-y-1">
              <li>
                <code>design-system/</code> - Reusable UI components (Button,
                Input, Select, etc.)
              </li>
              <li>
                <code>common/</code> - Shared components (Container, Loading,
                Error)
              </li>
              <li><code>layout/</code> - Layout components (Header, Footer)</li>
              <li><code>post/</code> - Domain-specific components</li>
            </ul>
          </li>
          <li>
            <strong>Composables/</strong>
            <ul class="pl-6 mt-2 space-y-1">
              <li>
                <code>useFormValidation/</code> - Custom form validation with
                rules
              </li>
              <li><code>useToast/</code> - Global toast notifications</li>
            </ul>
          </li>
          <li>
            <strong>Services/</strong> - API integration with error handling
          </li>
          <li>
            <strong>Utils/</strong> - Functional error handling using Result
            type pattern
          </li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Key Features</h2>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>
            <strong>Error Handling:</strong> Functional approach using Result
            type for predictable error handling
          </li>
          <li>
            <strong>Form Validation:</strong> Custom composable with reactive
            validation rules
          </li>
          <li>
            <strong>Toast System:</strong> Global notification system using
            Vue's provide/inject
          </li>
          <li>
            <strong>Routing:</strong> File-based routing with vite-plugin-pages
          </li>
          <li>
            <strong>Testing:</strong> E2E tests with Cypress using data-testid
            attributes
          </li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">
          Future Improvements
        </h2>
        <ul class="list-disc list-inside text-gray-600 space-y-2">
          <li>
            <strong>SSR Implementation:</strong> Add Nuxt.js or vite-ssr for
            improved SEO and performance
          </li>
          <li>
            <strong>Add pagination for posts list</strong>
          </li>
          <li>
            <strong>Testing Coverage:</strong>
            <ul class="pl-6 mt-2 space-y-1">
              <li>Expand unit test coverage for components and composables</li>
              <li>Add integration tests for complex workflows</li>
              <li>Enhance E2E test scenarios</li>
            </ul>
          </li>
          <li>
            <strong>Accessibility:</strong>
            <ul class="pl-6 mt-2 space-y-1">
              <li>Implement ARIA attributes</li>
              <li>Add keyboard navigation</li>
              <li>Improve screen reader compatibility</li>
            </ul>
          </li>
          <li>
            <strong>Performance:</strong>
            <ul class="pl-6 mt-2 space-y-1">
              <li>Implement code splitting</li>
              <li>Add service worker for offline support</li>
              <li>Optimize bundle size</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </AppContainer>
</template>
