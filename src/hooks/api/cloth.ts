import { getClothes, getOneCloth, deleteCloth } from "@services/cloth";
import { useQuery } from "@tanstack/react-query";

export const useGetClothes = () => {
  return useQuery({
    queryKey: ["clothes"],
    queryFn: () => getClothes(),
  });
};

export const useGetOneCloth = (id: number) => {
  return useQuery({
    queryKey: ["cloth", id],
    queryFn: () => getOneCloth(id),
  });
};

// export const useDeleteCloth = () => {};
