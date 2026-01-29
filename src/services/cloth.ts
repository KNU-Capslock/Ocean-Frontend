import { getRequest, deleteRequest, postRequest, patchRequest } from "./api";
import type { Cloth } from "@/models/cloth.model";

export const getClothes = async () => {
  return await getRequest<Cloth[]>("/clothes");
};

export const getOneCloth = async (id: number) => {
  return await getRequest<Cloth>(`/clothes/${id}`);
};

export const deleteCloth = async (id: number) => {
  // 성공 시 보통 200 + body 없음(또는 void)일 수 있음
  return await deleteRequest<void>(`/clothes/${id}`);
};

// ✅ Swagger PATCH /clothes/{id} (이미지 제외 수정)
export type UpdateClothPayload = {
  name: string;
  type: string;
  detail: string;
  print: string;
  texture: string;
  style: string;
};

export const updateCloth = async (id: number, payload: UpdateClothPayload) => {
  // 서버가 수정된 Cloth를 돌려주면 Cloth, 아니면 void로 바꿔도 됨
  return await patchRequest<Cloth>(`/clothes/${id}`, payload);
};

// (이미 구현돼있던 업로드)
export const postClothes = async (file: File) => {
  const form = new FormData();
  form.append("image", file);

  // ⚠️ FormData는 Content-Type 직접 지정하지 않는 게 안전함(axios가 boundary 자동)
  return await postRequest<void>("/clothes/original", form);
};
