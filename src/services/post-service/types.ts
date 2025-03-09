export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  author?: string;
}

export type PostForm = Omit<Post, "id" | "author">;
