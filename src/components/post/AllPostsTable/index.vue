<script setup lang="ts">
import { defineProps } from 'vue';

import { Post } from '~/services/post-service/types';
import KButton from "~/components/design-system/KButton/index.vue";

interface PostTableProps {
  posts: Post[];
}

const { posts = [] } = defineProps<PostTableProps>()

const navigateToEdit = (postId: number) => {
  // Add navigation logic here
};

const confirmAndDeletePost = (postId: number) => {
  // Add delete confirmation and logic here
};
</script>

<template>
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
      <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50">
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
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
      <tr v-if="posts.length === 0">
        <td colspan="4" class="px-6 py-10 text-center text-gray-500">
          No posts found. Please try a different search or create a new post.
        </td>
      </tr>
    </tbody>
  </table>
</template>
