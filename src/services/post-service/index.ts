import { useFetch } from "@vueuse/core";
import { ref, type Ref } from "vue";

import { API_BASE_URL } from "~/utils/constants";
import type { Post } from "./types";

const API_POST_URL = `${API_BASE_URL}/posts`;

interface UsePostServiceReturn {
  getPost: (id: number) => Promise<Ref<Post | null> | { error: any }>;
  getAllPosts: () => Promise<Ref<Post[] | null> | { error: any }>;
  updatePost: (
    id: number,
    post: Partial<Post>
  ) => Promise<Ref<Post | null> | { error: any }>;
  createPost: (
    post: Partial<Post>
  ) => Promise<Ref<Post | null> | { error: any }>;
  deletePost: (id: number) => Promise<Ref<boolean> | { error: any }>;
}

const usePostService = (): UsePostServiceReturn => {
  const getPost = async (
    id: number
  ): Promise<Ref<Post | null> | { error: any }> => {
    try {
      const { data, error } = await useFetch<Post>(`${API_POST_URL}/${id}`).json();
      if (error.value) {
        return { error: error.value };
      }
      return data;
    } catch (err) {
      return { error: err };
    }
  };

  const getAllPosts = async (): Promise<
    Ref<Post[] | null> | { error: any }
  > => {
    try {
      const { data, error } = await useFetch<Post[]>(API_POST_URL).json();

      if (error.value) {
        return { error: error.value };
      }

      return data;
    } catch (err) {
      return { error: err };
    }
  };

  const updatePost = async (
    id: number,
    post: Partial<Post>
  ): Promise<Ref<Post | null> | { error: any }> => {
    try {
      const { data, error } = await useFetch<Post>(`${API_POST_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }).json();

      if (error.value) {
        return { error: error.value };
      }

      return data;
    } catch (err) {
      return { error: err };
    }
  };

  const createPost = async (
    post: Partial<Post>
  ): Promise<Ref<Post | null> | { error: any }> => {
    try {
      const { data, error } = await useFetch<Post>(API_POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }).json();

      if (error.value) {
        return { error: error.value };
      }

      return data;
    } catch (err) {
      return { error: err };
    }
  };

  const deletePost = async (id: number): Promise<Ref<boolean> | { error: any }> => {
    try {
      debugger;
      const { response, error } = await useFetch(`${API_POST_URL}/${id}`, {
        method: 'DELETE',
      });

      if (error.value) {
        return { error: error.value };
      }

      return response.value?.ok ? ref(true) : ref(false);
    } catch (err) {
      return { error: err };
    }
  };

  return {
    getPost,
    getAllPosts,
    updatePost,
    createPost,
    deletePost,
  };
};

export default usePostService;
