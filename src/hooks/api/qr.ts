import { getQrToken } from "@services/qr";
import { useQuery } from "@tanstack/react-query";

export const useGetQrToken = () => {
  return useQuery({
    queryKey: ["qrToken"],
    queryFn: getQrToken,
    // QR 토큰은 매번 새로 가져와야 하므로 캐싱하지 않음
    gcTime: 0,
    staleTime: 0,
  });
};
