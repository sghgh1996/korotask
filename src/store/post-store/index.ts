// import { defineStore } from 'pinia';
// import { ref, computed, watch, Ref } from 'vue';
// import { useFetch } from '@vueuse/core';
// import { debounce } from 'lodash';

// import type { Post } from '~/services/post-service/types';

// interface PostStore {
//   posts: Ref<Post[]>;
//   error: Ref<string | null>;
//   isFetching: Ref<boolean>;
// }

// export const usePostStore = defineStore('postStore', (): PostStore => {
//   const posts = ref<Post[]>([]);
//   const error = ref<string | null>(null);
//   const isFetching = ref<boolean>(false);

//   // Debounce search query
//   // Fetch posts from API
//   const fetchPosts = async (): Promise<void> => {
//     isFetching.value = true;
//     error.value = null;
    
//     try {
//       const { data, error: fetchError } = await useFetch<Post[]>(
//         'https://jsonplaceholder.typicode.com/posts'
//       ).json();

//       if (fetchError.value) throw new Error(fetchError.value.message);
//       posts.value = data.value || [];
//     } catch (err) {
//       error.value = err instanceof Error ? err.message : 'An unknown error occurred';
//       console.error('Error fetching posts:', error.value);
//     } finally {
//       isFetching.value = false;
//     }
//   };

//   return {
//     posts,
//     error,
//     isFetching: isFetching.value,
//     searchQuery: searchQuery.value,
//     debouncedSearchQuery: debouncedSearchQuery.value,
//     filteredPosts: filteredPosts.value,
//     fetchPosts,
//   };
// });