import { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useGetQrToken } from "@/hooks/api/qr";

const QrCode = () => {
  const { data, isLoading, error, refetch } = useGetQrToken();

  // 3분(180초)마다 자동 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 180000); // 3분 = 180,000ms

    return () => clearInterval(interval);
  }, [refetch]);

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500 mb-4">
            QR 코드 생성 실패
          </h2>
          <p className="text-neutral-600 mb-4">
            로그인이 필요하거나 오류가 발생했습니다.
          </p>
          <button
            onClick={handleRefresh}
            className="px-6 py-3 text-white bg-blue-500 rounded-lg font-semibold hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">기기 연결</h1>
        <p className="text-neutral-600">
          스마트 거울에서 이 QR 코드를 스캔해주세요
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-lg">
        {isLoading || !data?.qrToken ? (
          <div className="w-64 h-64 flex items-center justify-center bg-neutral-100 rounded-lg">
            <p className="text-neutral-500 font-semibold">QR 로딩 중...</p>
          </div>
        ) : (
          <div className="p-4 bg-white rounded-lg">
            <QRCodeCanvas
              value={data.qrToken}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
        )}

        <div className="text-center text-sm text-neutral-500">
          <p>QR 코드는 보안을 위해 3분마다 자동으로 갱신됩니다</p>
        </div>
      </div>

      <button
        onClick={handleRefresh}
        disabled={isLoading}
        className="px-6 py-3 text-white bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "갱신 중..." : "QR 코드 갱신"}
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg max-w-md">
        <h3 className="font-semibold mb-2">사용 방법</h3>
        <ol className="list-decimal list-inside text-sm text-neutral-700 space-y-1">
          <li>스마트 거울의 카메라로 위 QR 코드를 스캔하세요</li>
          <li>자동으로 기기가 연결됩니다</li>
          <li>거울 앞에서 특정 모션을 취하면 사진이 촬영됩니다</li>
        </ol>
      </div>
    </div>
  );
};

export default QrCode;
