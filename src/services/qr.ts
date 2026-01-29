import { getRequest } from "./api";

type QrTokenResponse = {
  qrToken: string;
};

export const getQrToken = async () => {
  return await getRequest<QrTokenResponse>("/qr/generate");
};
