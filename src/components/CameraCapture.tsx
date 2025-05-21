import { useState, useRef } from "react";
import useCamera from "../hooks/useCamera";

export default function CameraCapture() {
  const { videoRef, start, stop, error } = useCamera();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [isUploading, setUploading] = useState(false);

  /** 스냅샷 찍기 */
  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const { videoWidth: w, videoHeight: h } = videoRef.current;
    canvasRef.current.width = w;
    canvasRef.current.height = h;
    const ctx = canvasRef.current.getContext("2d")!;
    ctx.drawImage(videoRef.current, 0, 0, w, h);
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setPhotoURL(url);
      upload(blob); // 촬영 후 즉시 업로드
    }, "image/jpeg");
    stop(); // 찍은 뒤 미리보기 종료(선택)
  };

  /** 업로드 */
  const upload = async (file: Blob) => {
    setUploading(true);
    const form = new FormData();
    form.append("file", file, "photo.jpg");
    try {
      await fetch("/api/upload", { method: "POST", body: form });
      alert("업로드 성공!");
    } catch (e) {
      alert("업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button onClick={start}>카메라 열기</button>

      <div style={{ display: videoRef.current ? "block" : "none" }}>
        <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
        <button onClick={takePhoto}>📸 찍기</button>
        <button onClick={stop}>닫기</button>
      </div>

      {photoURL && (
        <div>
          <h4>촬영 결과</h4>
          <img src={photoURL} alt="snapshot" style={{ width: "100%" }} />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {isUploading && <p>업로드 중...</p>}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
