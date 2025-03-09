<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { useRoute } from "vue-router";

import useUserService from "~/services/user-service";
import usePostService from "~/services/post-service";
import NewPostForm from "~/components/post/NewPostForm/index.vue";
import { Post, PostForm } from "~/services/post-service/types";
import { User } from "~/services/user-service/types";

const route = useRoute();
const { getPost, updatePost, createPost } = usePostService();
const { getAllUsers } = useUserService();

const post = ref<PostForm | null>(null);
const users = ref<User[]>([]);
const postId = route.query.id as string;
const isEditing = ref(false);
const isFetching = ref(false);
const error = ref<string | null>(null);

// Type guard to check if an object is a Post
const isPost = (object: unknown): object is Post => {
  if (object !== null && typeof object === "object") {
    return (
      "id" in object &&
      "title" in object &&
      "body" in object &&
      "userId" in object
    );
  }
  return false;
};

// Type guard to check if the response contains an error
function hasError<T>(
  response: Ref<T | null> | { error: any }
): response is { error: any } {
  return (
    typeof response === "object" && response !== null && "error" in response
  );
}

const fetchData = async () => {
  isFetching.value = true;
  error.value = null;

  try {
    // Always fetch users
    const usersResponse = await getAllUsers();

    if (hasError(usersResponse)) {
      error.value = usersResponse.error;
      return;
    }

    users.value = usersResponse.value || [];

    // Only fetch post if we're in edit mode (have an ID)
    if (postId) {
      isEditing.value = true;
      const postResponse = await getPost(Number(postId));

      if (hasError(postResponse)) {
        error.value = postResponse.error;
        return;
      }

      if (isPost(postResponse.value)) {
        post.value = postResponse.value;
      } else {
        error.value = "Invalid post data received";
      }
    } else {
      // Initialize empty post for creation
      post.value = {
        title: "",
        body: "",
        userId: 0
      };
    }
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Error fetching data:", err);
  } finally {
    isFetching.value = false;
  }
};

const submitForm = (submittedPost: PostForm) => {
  if (isEditing.value) {
    updatePost(Number(postId), submittedPost);
  } else {
    createPost(submittedPost);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8 min-h-screen">
    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      <p>{{ error }}</p>
    </div>

    <h1 class="text-2xl font-bold mb-4">
      {{ isEditing ? "Edit Post" : "Create New Post" }}
    </h1>

    <div v-if="isFetching" class="flex justify-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
      ></div>
    </div>

    <NewPostForm
      v-else
      :post="post"
      :users="users"
      :isEditing="isEditing"
      @submit="submitForm"
    />
  </div>
</template>
