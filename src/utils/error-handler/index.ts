import { ShallowRef } from 'vue';
import {
  ApiError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  BadRequestError,
  ServiceUnavailableError,
  NetworkError
} from './errors';

export interface Success<T> {
  readonly _tag: 'Success';
  readonly value: T;
}

export interface Failure<E extends Error> {
  readonly _tag: 'Failure';
  readonly error: E;
}

export const success = <T>(value: T): Result<T, never> => ({
  _tag: 'Success',
  value
});

export type Result<T, E extends Error = Error> = Success<T> | Failure<E>;

export const failure = <E extends Error>(error: E): Result<never, E> => ({
  _tag: 'Failure',
  error
});

export const tryCatch = async <T>(
  fn: () => Promise<T>
): Promise<Result<T, Error>> => {
  try {
    const result = await fn();
    return success(result);
  } catch (error) {
    if (error instanceof Error) {
      return failure(error);
    }
    return failure(new Error(String(error)));
  }
};

export const map = <T, U, E extends Error>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> => {
  if (result._tag === 'Success') {
    return success(fn(result.value));
  }
  return result;
};

export const mapError = <T, E extends Error, F extends Error>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> => {
  if (result._tag === 'Failure') {
    return failure(fn(result.error));
  }
  return result;
};

export const flatMap = <T, U, E extends Error, F extends Error = E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, F>
): Result<U, E | F> => {
  if (result._tag === 'Success') {
    return fn(result.value);
  }
  return result;
};

// Reusable Error Handling Function
export const handleFetchError = (
  error: ShallowRef<any>,
  response: ShallowRef<Response | null>,
  statusCode: ShallowRef<number | null>
): void => {
  if (error.value) {
    if (response.value) {
      if (statusCode.value) {
        switch (statusCode.value) {
          case 400:
            throw new BadRequestError(error.value.message);
          case 401:
            throw new UnauthorizedError(error.value.message);
          case 403:
            throw new ForbiddenError(error.value.message);
          case 404:
            throw new NotFoundError(error.value.message);
          case 500:
            throw new InternalServerError(error.value.message);
          case 503:
            throw new ServiceUnavailableError(error.value.message);
          default:
            throw new ApiError(error.value.message, statusCode.value);
        }
      } else {
        throw new ApiError(error.value.message, response.value.status);
      }
    } else {
      throw new NetworkError(error.value.message);
    }
  }
};
