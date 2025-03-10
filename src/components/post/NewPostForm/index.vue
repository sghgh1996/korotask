<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import TestIds from '~cypress/types/testIds.ts';

import type { TPostForm } from '~/services/post-service/types';
import usePostService from '~/services/post-service';
import type { TUser } from '~/services/user-service/types';

import { useToast } from '~/composables/useToast/index';
import {
  useFormValidation,
  rules
} from '~/composables/useFormValidation/index';

import KInput from '~/components/design-system/KInput/index.vue';
import KButton from '~/components/design-system/KButton/index.vue';
import KSelect from '~/components/design-system/KSelect/index.vue';
import KTextarea from '~/components/design-system/KTextarea/index.vue';

const props = defineProps<{
  post: TPostForm | null;
  users: TUser[];
  isEditing: boolean;
  postId?: string;
}>();

const router = useRouter();

const { createPost, updatePost } = usePostService();
const { toast } = useToast();

const post = ref<TPostForm>(
  props.post ? { ...props.post } : { title: '', body: '', userId: 0 }
);
const isSubmitting = ref(false);

const { validation, errors, touchField, dirtyField, validateAllFields } =
  useFormValidation({
    title: {
      value: props.post?.title || '',
      rules: [
        rules.required('Title is required'),
        rules.minLength(3, 'Title must be at least 3 characters'),
        rules.maxLength(100, 'Title must not exceed 100 characters')
      ],
      touched: false,
      dirty: false
    },
    body: {
      value: props.post?.body || '',
      rules: [
        rules.required('Body is required'),
        rules.minLength(30, 'Body must be at least 30 characters')
      ],
      touched: false,
      dirty: false
    },
    userId: {
      value: props.post?.userId || 0,
      rules: [
        {
          validator: (value: number) => value > 0,
          message: 'Please select an author'
        }
      ],
      touched: false,
      dirty: false
    }
  });

watch(
  () => validation.value,
  (newValidation) => {
    post.value = {
      title: newValidation.title.value,
      body: newValidation.body.value,
      userId: newValidation.userId.value
    };
  },
  { deep: true }
);

const userOptions = computed(() =>
  props.users.map((user) => ({
    value: user.id,
    label: user.name
  }))
);

const handleSubmit = async () => {
  if (!validateAllFields()) {
    toast('Please fix the validation errors', 'error');
    return;
  }

  try {
    isSubmitting.value = true;

    if (props.isEditing && props.postId) {
      const updateResult = await updatePost(Number(props.postId), post.value);

      if (updateResult._tag === 'Failure') {
        toast(`Error updating post: ${updateResult.error.message}`, 'error');
        return;
      }

      if (updateResult._tag === 'Success') {
        toast('Post updated successfully!', 'success');
      }
    } else {
      const createResult = await createPost(post.value);

      if (createResult._tag === 'Failure') {
        toast(`Error creating post: ${createResult.error.message}`, 'error');
        return;
      }

      if (createResult._tag === 'Success') {
        toast('Post created successfully!', 'success');
        router.push('/posts');
      }
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
    <h1 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">
      {{ isEditing ? 'Edit Blog Entry' : 'New Blog Entry' }}
    </h1>

    <form
      :data-testid="TestIds.POST_FORM"
      @submit.prevent="handleSubmit"
      class="space-y-6"
    >
      <KInput
        id="title"
        v-model="validation.title.value"
        label="Title:"
        :error-message="errors.title[0]"
        @blur="touchField('title')"
        @input="dirtyField('title')"
        :data-testid="TestIds.POST_FORM_TITLE"
      />

      <KSelect
        id="author"
        v-model="validation.userId.value"
        :options="userOptions"
        label="Author:"
        placeholder="Select an author"
        :error-message="errors.userId[0]"
        @blur="touchField('userId')"
        @change="dirtyField('userId')"
        :data-testid="TestIds.POST_FORM_AUTHOR"
      />

      <KTextarea
        id="body"
        v-model="validation.body.value"
        label="Body:"
        :error-message="errors.body[0]"
        @blur="touchField('body')"
        @input="dirtyField('body')"
        :data-testid="TestIds.POST_FORM_BODY"
      />

      <div class="pt-4">
        <KButton
          variant="primary"
          type="submit"
          :disabled="isSubmitting"
          class="w-full sm:w-auto"
          :data-testid="TestIds.POST_FORM_SUBMIT"
        >
          {{
            isSubmitting
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
                ? 'Update Post'
                : 'Create Post'
          }}
        </KButton>
      </div>
    </form>
  </div>
</template>
