import { useFetch } from "@vueuse/core";
import type { Ref } from "vue";

import { API_BASE_URL } from "~/utils/constants";
import type { User } from "./types";

const API_USERS_URL = `${API_BASE_URL}/users`;

interface UseUserServiceReturn {
  getAllUsers: () => Promise<Ref<User[] | null> | { error: any }>;
}

const useUserService = (): UseUserServiceReturn => {
  const getAllUsers = async (): Promise<
    Ref<User[] | null> | { error: any }
  > => {
    try {
      const { data, error } = await useFetch<User[]>(API_USERS_URL).json();

      if (error.value) {
        return { error: error.value };
      }

      return data;
    } catch (err) {
      return { error: err };
    }
  };

  return {
    getAllUsers
  };
};

export default useUserService;
