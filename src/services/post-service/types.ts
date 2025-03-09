export interface TPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  author?: string;
}

export type TPostForm = Omit<TPost, "id" | "author">;

// Type guard to check if an object is a Post
export function isPost(value: any): value is TPost {
  return (
    typeof value === 'object' &&
    value !== null &&
    'title' in value &&
    'body' in value &&
    'userId' in value &&
    'id' in value
  );
}

export type TError = Error | string | null;
