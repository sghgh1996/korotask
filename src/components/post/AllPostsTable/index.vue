<script setup lang="ts">
import { ref } from 'vue';

import TestIds from '~cypress/types/testIds.ts';

import KButton from '~/components/design-system/KButton/index.vue';
import usePostService from '~/services/post-service';
import { PostTableProps } from './types';
import { useToast } from '~/composables/useToast';

defineProps<PostTableProps>();

const emit = defineEmits<{
  (e: 'postDeleted', id: number): void;
}>();

const { deletePost } = usePostService();
const { toast } = useToast();
const deletingPostId = ref<number | null>(null);

const handleDeletePost = async (id: number) => {
  try {
    deletingPostId.value = id;
    const deleteResult = await deletePost(id);

    if (deleteResult._tag === 'Failure') {
      toast(`Error deleting post: ${deleteResult.error.message}`, 'error');
      return;
    }

    if (deleteResult._tag === 'Success' && deleteResult.value.value) {
      toast('Post deleted successfully', 'success');
      emit('postDeleted', id);
    } else {
      toast('Failed to delete post', 'error');
    }
  } finally {
    deletingPostId.value = null;
  }
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
        <tr
          v-for="post in posts"
          :key="post.id"
          class="hover:bg-gray-50"
          :data-testid="TestIds.POSTS_ROW"
        >
          <td :class="tdClass">
            <div
              class="text-sm font-medium text-gray-900"
              :data-testid="TestIds.POSTS_ROW_TITLE"
            >
              {{ post.title }}
            </div>
          </td>
          <td :class="tdClass">
            <div
              class="text-sm text-gray-500 line-clamp-2 max-w-xs"
              :data-testid="TestIds.POSTS_ROW_BODY"
            >
              {{ post.body }}
            </div>
          </td>
          <td :class="tdClass">
            <div
              class="text-sm text-gray-500"
              :data-testid="TestIds.POSTS_ROW_AUTHOR"
            >
              {{ post.author || '-' }}
            </div>
          </td>
          <td :class="tdClass">
            <div class="flex justify-center sm:justify-end space-x-2">
              <RouterLink :to="`/posts/new?id=${post.id}`" class="inline-block">
                <KButton
                  variant="primary"
                  size="sm"
                  :data-testid="TestIds.POST_EDIT_BUTTON"
                  >Edit</KButton
                >
              </RouterLink>

              <KButton
                variant="error"
                size="sm"
                :disabled="deletingPostId === post.id"
                @click="handleDeletePost(post.id)"
                :data-testid="TestIds.POST_DELETE_BUTTON"
              >
                {{ deletingPostId === post.id ? 'Deleting...' : 'Delete' }}
              </KButton>
            </div>
          </td>
        </tr>

        <tr v-if="posts.length === 0">
          <td colspan="4" class="px-6 py-10 text-center text-gray-500">
            No posts found. Please try a different search or create a new post.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
