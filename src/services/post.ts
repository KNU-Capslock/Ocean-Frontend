import type { Post } from "@/models/post.model";
import { getRequest, postRequest } from "./api";

export type PostPostPayload = {
  imageSrc: string;
  title: string;
  content: string;
};

export const getPost = async (id: number) => {
  return await getRequest<Post>(`/posts/${id}`);
};

export const postPost = async (data: PostPostPayload) => {
  const form = new FormData();

  const blob = await fetch(data.imageSrc).then((res) => res.blob());

  form.append("image", blob, "image.png");

  const postData = {
    title: data.title,
    content: data.content,
  };

  const postBlob = new Blob([JSON.stringify(postData)], {
    type: "application/json",
  });

  form.append("post", postBlob);

  return await postRequest<Post>("/posts", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
