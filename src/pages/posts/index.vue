<script setup lang="ts">
import { ref, computed, onMounted, watch, Ref } from 'vue';
import { debounce } from 'lodash';

import AppContainer from '~/components/layout/AppContainer.vue';
import AppLoading from '~/components/layout/AppLoading.vue';
import AllPostsTable from '~/components/post/AllPostsTable/index.vue';
import KButton from '~/components/design-system/KButton/index.vue';
import KInput from '~/components/design-system/KInput/index.vue';

import usePostService from '~/services/post-service';
import useUserService from '~/services/user-service';

import type { TError, TPost } from '~/services/post-service/types';
import type { TUser } from '~/services/user-service/types';

const { getAllPosts, deletePost } = usePostService();
const { getAllUsers } = useUserService();

const posts = ref<TPost[]>([]);
const users = ref<TUser[]>([]);

const error = ref<TError>(null);
const deleteError = ref<TError>(null);
const isFetching = ref(false);
const searchQuery = ref('');
const debouncedSearchQuery = ref('');

watch(
  searchQuery,
  debounce((newQuery: string) => {
    debouncedSearchQuery.value = newQuery;
  }, 1000)
);

const postsWithAuthors = computed<TPost[]>(() => {
  return posts.value.map((post: TPost) => {
    const author = users.value.find((user) => user.id === post.userId);

    return {
      ...post,
      author: author ? author.name : 'Unknown'
    };
  });
});

const filteredPosts = computed<TPost[]>(() => {
  if (!debouncedSearchQuery.value) return postsWithAuthors.value;

  const query = debouncedSearchQuery.value.toLowerCase();
  return postsWithAuthors.value.filter(
    (post: TPost) =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
  );
});

const handleDeletePost = async (id: number) => {
  const deleteResult = await deletePost(id);

  if (deleteResult._tag === 'Failure') {
    deleteError.value = deleteResult.error;
    alert(`Error deleting post: ${deleteResult.error.message}`); // Simple error alert
    return;
  }

  if (deleteResult._tag === 'Success' && deleteResult.value.value) {
    posts.value = posts.value.filter((post) => post.id !== id);
    alert('Post deleted successfully!'); // Simple success alert
  } else {
    alert('Post could not be deleted');
  }
};

const fetchData = async (): Promise<void> => {
  isFetching.value = true;
  error.value = null;

  const [postsResult, usersResult] = await Promise.all([
    getAllPosts(),
    getAllUsers()
  ]);

  // Check if either result is a Failure
  if (postsResult._tag === 'Failure') {
    error.value = postsResult.error;
    isFetching.value = false;
    return;
  }

  if (usersResult._tag === 'Failure') {
    error.value = usersResult.error;
    isFetching.value = false;
    return;
  }

  // Extract values from the Success results
  posts.value =
    postsResult._tag === 'Success' ? postsResult.value.value || [] : [];
  users.value =
    usersResult._tag === 'Success' ? usersResult.value.value || [] : [];
  isFetching.value = false;
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <AppContainer>
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
    </div>

    <AppLoading v-if="isFetching" />

    <div v-else-if="error" class="bg-red-50 p-4 rounded-md text-red-600 mb-4">
      <p>Failed to load posts. Please try again later.</p>
    </div>

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <AllPostsTable :posts="filteredPosts" @deletePost="handleDeletePost" />
    </div>
  </AppContainer>
</template>
