import { register, type RegisterPayload } from "@services/user";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const { mutate } = useMutation({
    mutationFn: (data: RegisterPayload) => register(data),
  });
  return { mutate };
};
