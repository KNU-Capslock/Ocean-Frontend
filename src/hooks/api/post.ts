import {
  getAllPost,
  getPost,
  postPost,
  deletePost,
  updatePost,
  type PostPostPayload,
  type UpdatePostPayload,
} from "@services/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useGetAllPost = () => {
  return useQuery({
    queryKey: ["postAll"],
    queryFn: () => getAllPost(),
  });
};

export const useDeletePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["postAll"] });
    },
  });
};

export const useUpdatePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdatePostPayload;
    }) => updatePost(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["postAll"] });
    },
  });
};
