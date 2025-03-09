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
  <div class="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
    <h1 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">
      {{ isEditing ? "Edit Blog Entry" : "New Blog Entry" }}
    </h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <KInput id="title" v-model="post.title" label="Title:" required />
      </div>

      <div>
        <label
          for="author"
          class="block font-medium text-gray-700 text-sm md:text-base"
          >Author:<span class="text-red-500 ml-1">*</span>
        </label>
        <select
          v-model="post.userId"
          id="author"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option v-if="users.length === 0" value="" disabled>
            No authors available
          </option>
          <option v-else disabled value="0">Select an author</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div>
        <label
          for="body"
          class="block mb-2 text-sm sm:text-base font-medium text-gray-700"
        >
          Body:<span class="text-red-500 ml-1">*</span>
        </label>
        <textarea
          v-model="post.body"
          id="body"
          rows="5"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        ></textarea>
      </div>

      <div class="pt-4">
        <KButton variant="primary" type="submit" class="w-full sm:w-auto">
          {{ isEditing ? "Update Post" : "Create Post" }}
        </KButton>
      </div>
    </form>
  </div>
</template>
