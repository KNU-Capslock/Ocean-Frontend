import type { Post } from "@/models/post.model";
import { getRequest, postRequest, deleteRequest, patchRequest } from "./api";

export type PostPostPayload = {
  imageSrc: string; // blob: URL (미리보기/업로드 원본)
  title: string;
  content: string;
};

export const getPost = async (id: number) => {
  return await getRequest<Post>(`/posts/${id}`);
};

export const getAllPost = async () => {
  return await getRequest<Post[]>(`/posts/all`);
};

export const getMyPosts = async () => {
  return await getRequest<Post[]>(`/posts`);
};

export const postPost = async (data: PostPostPayload) => {
  const form = new FormData();

  const blob = await fetch(data.imageSrc).then((res) => res.blob());
  const file = new File([blob], "image.jpg", {
    type: blob.type || "image/jpeg",
  });

  form.append("image", file);

  const postBlob = new Blob(
    [JSON.stringify({ title: data.title, content: data.content })],
    { type: "application/json" }
  );
  form.append("post", postBlob);

  return await postRequest<Post>("/posts", form);
};

export const deletePost = async (id: number) => {
  // swagger: DELETE /posts/{id}
  return await deleteRequest<void>(`/posts/${id}`);
};

export type UpdatePostPayload = {
  title: string;
  content: string;
};

export const updatePost = async (id: number, payload: UpdatePostPayload) => {
  return await patchRequest<Post>(`/posts/${id}`, payload);
};
