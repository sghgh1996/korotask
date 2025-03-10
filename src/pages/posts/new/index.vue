<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import NewPostForm from '~/components/post/NewPostForm/index.vue';
import AppContainer from '~/components/common/AppContainer.vue';
import AppLoading from '~/components/common/AppLoading.vue';

import useUserService from '~/services/user-service';
import usePostService from '~/services/post-service';
import {
  isPost,
  type TError,
  type TPostForm
} from '~/services/post-service/types';
import type { TUser } from '~/services/user-service/types';

const route = useRoute();

const { getPost } = usePostService();
const { getAllUsers } = useUserService();

const post = ref<TPostForm | null>(null);
const users = ref<TUser[]>([]);
const postId = route.query.id as string;
const isEditing = ref(false);
const isFetching = ref(false);
const error = ref<TError>(null);

const fetchData = async (): Promise<void> => {
  isFetching.value = true;
  error.value = null;

  const usersResult = await getAllUsers();

  if (usersResult._tag === 'Failure') {
    error.value = usersResult.error;
    isFetching.value = false;
    return;
  }
  users.value =
    usersResult._tag === 'Success' ? usersResult.value.value || [] : [];

  if (postId) {
    isEditing.value = true;
    const postResult = await getPost(Number(postId));

    if (postResult._tag === 'Failure') {
      error.value = postResult.error;
      isFetching.value = false;
      return;
    }

    if (postResult._tag === 'Success' && isPost(postResult.value.value)) {
      post.value = postResult.value.value;
    } else {
      error.value = 'Invalid post data received';
    }
  } else {
    post.value = {
      title: '',
      body: '',
      userId: 0
    };
  }

  isFetching.value = false;
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <AppContainer>
    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      <p>{{ error }}</p>
    </div>

    <AppLoading v-if="isFetching" />

    <NewPostForm
      v-else
      :post="post"
      :users="users"
      :is-editing="isEditing"
      :post-id="postId"
    />
  </AppContainer>
</template>
