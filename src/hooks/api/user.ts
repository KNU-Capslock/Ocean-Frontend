import {
  getMe,
  register,
  updateUser,
  deleteUser,
  type Me,
  type RegisterPayload,
  type UpdateUserPayload,
} from "@services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
  const { mutate } = useMutation({
    mutationFn: (data: RegisterPayload) => register(data),
  });
  return { mutate };
};

export const useMe = () => {
  const hasToken = !!sessionStorage.getItem("token");

  return useQuery<Me>({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: hasToken,
    staleTime: 60_000,
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};
