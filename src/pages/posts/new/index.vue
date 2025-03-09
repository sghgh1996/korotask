<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import NewPostForm from "~/components/post/NewPostForm/index.vue";
import AppContainer from "~/components/layout/AppContainer.vue";
import AppLoading from "~/components/layout/AppLoading.vue";

import useUserService from "~/services/user-service";
import usePostService from "~/services/post-service";
import {
  isPost,
  type TError,
  type TPostForm,
} from "~/services/post-service/types";
import type { TUser } from "~/services/user-service/types";

const route = useRoute();
const router = useRouter();

const { getPost, updatePost, createPost } = usePostService();
const { getAllUsers } = useUserService();

const post = ref<TPostForm | null>(null);
const users = ref<TUser[]>([]);
const postId = route.query.id as string;
const isEditing = ref(false);
const isFetching = ref(false);
const error = ref<TError>(null);
const submitError = ref<TError>(null);

const fetchData = async (): Promise<void> => {
  isFetching.value = true;
  error.value = null;

  const usersResult = await getAllUsers();

  if (usersResult._tag === "Failure") {
    error.value = usersResult.error;
    isFetching.value = false;
    return;
  }
  users.value =
    usersResult._tag === "Success" ? usersResult.value.value || [] : [];

  if (postId) {
    isEditing.value = true;
    const postResult = await getPost(Number(postId));

    if (postResult._tag === "Failure") {
      error.value = postResult.error;
      isFetching.value = false;
      return;
    }

    if (postResult._tag === "Success" && isPost(postResult.value.value)) {
      post.value = postResult.value.value;
    } else {
      error.value = "Invalid post data received";
    }
  } else {
    post.value = {
      title: "",
      body: "",
      userId: 0,
    };
  }

  isFetching.value = false;
};

const submitForm = async (submittedPost: TPostForm) => {
  if (isEditing.value) {
    const updateResult = await updatePost(Number(postId), submittedPost);

    if (updateResult._tag === "Failure") {
      submitError.value = updateResult.error;
      alert(`Error updating post: ${updateResult.error.message}`); // Simple error alert
      return;
    }

    if (updateResult._tag === "Success" && isPost(updateResult.value.value)) {
      alert("Post updated successfully!");
      router.push("/posts");
    } else {
      alert("Post could not be updated");
    }
  } else {
    const createResult = await createPost(submittedPost);

    if (createResult._tag === "Failure") {
      submitError.value = createResult.error;
      alert(`Error creating post: ${createResult.error.message}`); // Simple error alert
      return;
    }

    if (createResult._tag === "Success" && isPost(createResult.value.value)) {
      alert("Post created successfully!");
      router.push("/posts");
    } else {
      alert("Post could not be created");
    }
    createPost(submittedPost);
  }
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

    <h1 class="text-2xl font-bold mb-4">
      {{ isEditing ? "Edit Post" : "Create New Post" }}
    </h1>

    <AppLoading v-if="isFetching" />

    <NewPostForm
      v-else
      :post="post"
      :users="users"
      :isEditing="isEditing"
      @submit="submitForm"
    />
  </AppContainer>
</template>
