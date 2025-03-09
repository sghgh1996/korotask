<script setup lang="ts">
import { ref, computed, onMounted, watch, Ref } from "vue";
import { debounce } from 'lodash';

import AllPostsTable from '~/components/post/AllPostsTable/index.vue';
import KButton from "~/components/design-system/KButton/index.vue";
import KInput from "~/components/design-system/KInput/index.vue";

import usePostService from "~/services/post-service";
import useUserService from "~/services/user-service";

import type { Post } from '~/services/post-service/types';
import type { User } from "~/services/user-service/types";

const { getAllPosts, deletePost } = usePostService();
const { getAllUsers } = useUserService();

const posts = ref<Post[]>([]);
const users = ref<User[]>([]);

const error = ref<any>(null);
const isFetching = ref(false);
const searchQuery = ref("");
const debouncedSearchQuery = ref("");


watch(searchQuery, debounce((newQuery: string) => {
  debouncedSearchQuery.value = newQuery;
}, 300));

const postsWithAuthors = computed<Post[]>(() => {
  return posts.value.map((post: Post) => {
    const author = users.value.find((user) => user.id === post.userId);

    return {
      ...post,
      author: author ? author.name : 'Unknown',
    };
  });
});

const filteredPosts = computed<Post[]>(() => {
  if (!searchQuery.value) return postsWithAuthors.value;

  const query = searchQuery.value.toLowerCase();
  return postsWithAuthors.value.filter(
    (post: Post) =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
  );
});

const handleDeletePost = async (id: number) => {
  await deletePost(id);
  posts.value = posts.value.filter(post => post.id !== id);
};

// Type guard to check if the response contains an error
function hasError<T>(response: Ref<T | null> | { error: any }): response is { error: any } {
  return typeof response === 'object' && response !== null && 'error' in response;
}

onMounted(async () => {
  isFetching.value = true;
  error.value = null;
  
  try {
    const [postsResponse, usersResponse] = await Promise.all([
      getAllPosts(),
      getAllUsers()
    ]);
    
    // Check if either response contains an error
    if (hasError(postsResponse)) {
      error.value = postsResponse.error;
      return;
    }
    
    if (hasError(usersResponse)) {
      error.value = usersResponse.error;
      return;
    }
    
    // At this point, TypeScript knows both responses are Ref<T | null>
    // Extract values from the refs
    posts.value = postsResponse.value || [];
    users.value = usersResponse.value || [];
    
  } catch (err) {
    error.value = err instanceof Error ? err : new Error('Unexpected error occurred');
  } finally {
    isFetching.value = false;
  }
});
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

      <RouterLink to="/posts/new" class="inline-block">
        <KButton variant="primary" class="whitespace-nowrap">
          Create New Post
        </KButton>
      </RouterLink>
      <!-- <KButton
        variant="primary"
        @click="navigateToCreate"
        class="whitespace-nowrap"
      >
        Create New Post
      </KButton> -->
    </div>

    <div v-if="isFetching" class="text-center py-10">
      <p class="text-gray-500">Loading posts...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-4 rounded-md text-red-600 mb-4">
      <p>Failed to load posts. Please try again later.</p>
    </div>

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <AllPostsTable :posts="filteredPosts" @deletePost="handleDeletePost" />
    </div>
  </div>
</template>
