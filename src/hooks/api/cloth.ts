import {
  deleteCloth,
  getClothes,
  updateCloth,
  type UpdateClothPayload,
} from "@services/cloth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetClothes = () => {
  return useQuery({
    queryKey: ["clothes"],
    queryFn: () => getClothes(),
  });
};

// ✅ 삭제 훅
export const useDeleteCloth = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCloth(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clothes"] });
    },
  });
};

// ✅ 수정 훅
export const useUpdateCloth = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateClothPayload;
    }) => updateCloth(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clothes"] });
    },
  });
};
