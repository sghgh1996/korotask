<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import KButton from "~/components/design-system/KButton/index.vue";
import usePostService from "~/services/post-service";
import type { Post } from '~/services/post-service/types';

const posts = ref<Post[]>([]);
const error = ref<any>(null);
const isFetching = ref(false);

const { getAllPosts, deletePost } = usePostService();

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

const filteredPosts = computed<Post[]>(() => {
  if (!searchQuery.value) return posts.value;

  const query = searchQuery.value.toLowerCase();
  return posts.value.filter(
    (post: Post) =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
  );
});

// Navigation to create page
const navigateToCreate = () => {
  // This would use vue-router to navigate
  console.log("Navigating to create post page");
};

// Navigation to edit page
const navigateToEdit = (postId: number) => {
  // This would use vue-router to navigate
  console.log(`Navigating to edit post with ID: ${postId}`);
};

// Confirm before deletion
const confirmAndDeletePost = async (postId: number) => {
  if (confirm("Are you sure you want to delete this post?")) {
    isFetching.value = true;
    
    try {
      const result = await deletePost(postId);
      
      if ('error' in result) {
        error.value = result.error;
        return;
      }
      
      // If deletion was successful, remove the post from the local array
      if (result.value) {
        posts.value = posts.value.filter((post: Post) => post.id !== postId);
      }
    } catch (err) {
      error.value = err;
    } finally {
      isFetching.value = false;
    }
  }
};
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8 min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Posts</h1>

    <div
      class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
    >
      <!-- Search input -->
      <div class="relative w-full sm:w-96">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search posts..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <span
          v-if="searchQuery"
          class="absolute right-3 top-2.5 cursor-pointer"
          @click="searchQuery = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>

      <!-- Create new post button -->
      <KButton
        variant="primary"
        @click="navigateToCreate"
        class="whitespace-nowrap"
      >
        Create New Post
      </KButton>
    </div>

    <!-- Loading state -->
    <div v-if="isFetching" class="text-center py-10">
      <p class="text-gray-500">Loading posts...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 p-4 rounded-md text-red-600 mb-4">
      <p>Failed to load posts. Please try again later.</p>
    </div>

    <!-- Posts table -->
    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Author
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
          
            v-for="post in filteredPosts"
            :key="post.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">
                {{ post.title }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-500 line-clamp-2">
                {{ post.body }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ post.userId }}</div>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <div class="flex justify-end space-x-2">
                <KButton
                  variant="primary"
                  @click="navigateToEdit(post.id)"
                  class="text-xs px-3 py-1"
                >
                  Edit
                </KButton>
                <KButton
                  variant="error"
                  @click="confirmAndDeletePost(post.id)"
                  class="text-xs px-3 py-1"
                >
                  Delete
                </KButton>
              </div>
            </td>
          </tr>

          <!-- Empty state when no posts match search -->
          <tr v-if="filteredPosts.length === 0">
            <td colspan="4" class="px-6 py-10 text-center text-gray-500">
              No posts found. Please try a different search or create a new
              post.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
