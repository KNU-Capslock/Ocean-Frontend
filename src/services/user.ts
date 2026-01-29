import { getRequest, postRequest, patchRequest, deleteRequest } from "./api";

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserPayload = {
  username?: string;
  email?: string;
  password?: string;
};

export type Me = {
  username: string;
  email: string;
};

export const register = async (data: RegisterPayload) => {
  return await postRequest<void>("users", data);
};

export const getMe = async () => {
  return await getRequest<Me>("users");
};

export const updateUser = async (payload: UpdateUserPayload) => {
  return await patchRequest<Me>("users", payload);
};

export const deleteUser = async () => {
  return await deleteRequest<void>("users");
};
