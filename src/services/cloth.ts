import { getRequest, deleteRequest, postRequest } from "./api";
import type { Cloth } from "@/models/cloth.model";

export const getClothes = async () => {
  //return await getRequest<Cloth[]>("/clothes");
  return await getRequest<Cloth[]>("/mocks/clothesData.json");
};

export const getOneCloth = async (id: number) => {
  //return await getRequest<Cloth[]>(`/clothes/${id}`);
  return await getRequest<Cloth[]>("/mocks/OneclothData.json");
};

export const deleteCloth = async (id: number) => {
  await deleteRequest<void>(`/clothes/${id}`);
};

export const postClothes = async (file: File) => {
  const form = new FormData();
  form.append("image", file);

  return await postRequest<void>("/clothes/original", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
