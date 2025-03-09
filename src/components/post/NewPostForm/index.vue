<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

import KInput from "~/components/design-system/KInput/index.vue";
import KButton from "~/components/design-system/KButton/index.vue";

import type { TPostForm } from "~/services/post-service/types";
import type { TUser } from "~/services/user-service/types";

const props = defineProps<{
  post: TPostForm | null;
  users: TUser[];
  isEditing: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", post: TPostForm): void;
}>();

const post = ref<TPostForm>(
  props.post ? { ...props.post } : { title: "", body: "", userId: 0 }
);

const handleSubmit = () => {
  emit("submit", post.value);
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-8">
      {{ isEditing ? "Edit Blog Entry" : "New Blog Entry" }}
    </h1>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="mb-4">
        <KInput id="title" v-model="post.title" label="Title:" required />
      </div>

      <div class="mb-4">
        <label for="author" class="block mb-2 font-medium">Author</label>
        <div>
          <select
            v-model="post.userId"
            id="author"
            required
            class="w-full px-3 py-2 text-base border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option v-if="users.length === 0" value="" disabled>
              No authors available
            </option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="mb-4">
        <label for="body" class="block mb-2 font-medium">
          Body:
        </label>
        <div>
          <textarea
            v-model="post.body"
            id="body"
            rows="5"
            required
            class="w-full px-3 py-2 text-base border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm"
          ></textarea>
        </div>
      </div>

      <KButton variant="primary" type="submit">
        {{ isEditing ? "Update Post" : "Create Post" }}
      </KButton>
    </form>
  </div>
</template>
