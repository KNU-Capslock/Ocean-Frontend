import { useEffect, useRef, useState } from "react";

export default function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: {
          aspectRatio: 9 / 16,
          width: { ideal: 720 },
          facingMode: "environment",
        },
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (e: any) {
      setError(e.message ?? "카메라 접근 실패");
    }
  };

  const stop = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return { videoRef, stream, error, start, stop };
}
