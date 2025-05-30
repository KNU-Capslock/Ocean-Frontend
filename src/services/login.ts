import { postRequest } from "./api";

export type LoginPayload = {
  username: string;
  password: string;
};

type LoginReturnType = {
  token: string;
};

export const login = async (data: LoginPayload) => {
  const response = await postRequest<LoginReturnType>("login", data);
  return response;
};
