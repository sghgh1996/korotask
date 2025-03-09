<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import KButton from '~/components/design-system/KButton/index.vue';
import { PostTableProps } from './types';

const { posts = [] } = defineProps<PostTableProps>();

const emit = defineEmits<{
  (e: 'deletePost', id: number): void;
}>();

const confirmAndDeletePost = (postId: number) => {
  emit('deletePost', postId);
};

// Define table columns
const columns = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'author', label: 'Author' },
  { key: 'actions', label: 'Actions' }
];

// Common classes
const thClass =
  'px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider';
const tdClass = 'px-6 py-4 text-center';
</script>

<template>
  <div class="overflow-x-auto w-full">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :class="thClass"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50">
          <td :class="tdClass">
            <div class="text-sm font-medium text-gray-900">
              {{ post.title }}
            </div>
          </td>
          <td :class="tdClass">
            <div class="text-sm text-gray-500 line-clamp-2 max-w-xs">
              {{ post.body }}
            </div>
          </td>
          <td :class="tdClass">
            <div class="text-sm text-gray-500">{{ post.author || '-' }}</div>
          </td>
          <td :class="tdClass">
            <div class="flex justify-center sm:justify-end space-x-2">
              <RouterLink :to="`/posts/new?id=${post.id}`" class="inline-block">
                <KButton variant="primary" size="sm"> Edit </KButton>
              </RouterLink>
              <KButton
                variant="error"
                size="sm"
                @click="confirmAndDeletePost(post.id)"
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
  </div>
</template>
