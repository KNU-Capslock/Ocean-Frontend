import { postRequest } from "./api";

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export const register = async (data: RegisterPayload) => {
  const response = await postRequest<void>("users", data);
  return response;
};
