<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { debounce } from 'lodash';

import AllPostsTable from '~/components/post/AllPostsTable/index.vue';
import KButton from "~/components/design-system/KButton/index.vue";
import KInput from "~/components/design-system/KInput/index.vue";

import usePostService from "~/services/post-service";
import type { Post } from '~/services/post-service/types';

const posts = ref<Post[]>([]);
const error = ref<any>(null);
const isFetching = ref(false);

const { getAllPosts } = usePostService();

onMounted(async () => {
  isFetching.value = true;
  
  try {
    const getAllPostsResult = await getAllPosts();

    if ('error' in getAllPostsResult) {
      error.value = getAllPostsResult.error;
      return;
    }

    posts.value = getAllPostsResult.value || [];
  } catch (err) {
    error.value = err;
  } finally {
    isFetching.value = false;
  }
});

const searchQuery = ref("");
const debouncedSearchQuery = ref("");

watch(searchQuery, debounce((newQuery: string) => {
  debouncedSearchQuery.value = newQuery;
}, 300));
const filteredPosts = computed<Post[]>(() => {
  if (!searchQuery.value) return posts.value;

  const query = searchQuery.value.toLowerCase();
  return posts.value.filter(
    (post: Post) =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
  );
});

const navigateToCreate = () => {
  console.log("Navigating to create post page");
};
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8 min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Posts</h1>

    <div
      class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
    >
      <div class="relative w-full sm:w-96">
        <KInput
          v-model="searchQuery"
          placeholder="Search posts..."
          type="text"
        />
      </div>

      <KButton
        variant="primary"
        @click="navigateToCreate"
        class="whitespace-nowrap"
      >
        Create New Post
      </KButton>
    </div>

    <div v-if="isFetching" class="text-center py-10">
      <p class="text-gray-500">Loading posts...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-4 rounded-md text-red-600 mb-4">
      <p>Failed to load posts. Please try again later.</p>
    </div>

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <AllPostsTable :posts="filteredPosts" />
    </div>
  </div>
</template>
