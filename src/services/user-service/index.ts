import { useFetch } from "@vueuse/core";
import type { Ref } from "vue";

import { API_BASE_URL } from "~/utils/constants";
import type { TUser } from "./types";
import { handleFetchError, Result, tryCatch } from "~/utils/error-handler";

const API_USERS_URL = `${API_BASE_URL}/users`;

interface UseUserServiceReturn {
  getAllUsers: () => Promise<Result<Ref<TUser[] | null>>>;
}

const useUserService = (): UseUserServiceReturn => {
  const getAllUsers = async (): Promise<Result<Ref<TUser[] | null>>> => {
    return tryCatch(async () => {
      const { data, error, response, statusCode } = await useFetch<TUser[]>(
        API_USERS_URL
      ).json();

      handleFetchError(error, response, statusCode);

      return data;
    });
  };

  return {
    getAllUsers,
  };
};

export default useUserService;
