import { getPost, postPost, type PostPostPayload } from "@services/post";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreatePost = () => {
  const { mutate } = useMutation({
    mutationFn: (data: PostPostPayload) => postPost(data),
  });
  return { mutate };
};

export const useGetPost = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });
};
