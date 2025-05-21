import { useState, useRef, useEffect } from "react";
import useCamera from "../hooks/useCamera";
import { useNavigate } from "react-router-dom";

export default function CameraCapture() {
  const { videoRef, start, stop, error } = useCamera();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [isUploading, setUploading] = useState(false);

  /** 스냅샷 찍기 */

  const navigate = useNavigate();
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
      upload(blob);
      navigate("/camera/result?url=" + url);
    }, "image/jpeg");
    stop();
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

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);

  return (
    <div>
      <div
        style={{ display: videoRef.current ? "block" : "none" }}
        className="text-center"
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            aspectRatio: "9 / 16",
            objectFit: "cover",
            background: "black",
          }}
        />
        <button
          onClick={takePhoto}
          style={{
            transform: "translateX(-50%) translateY(-5rem)",
          }}
          className="absolute z-10 w-16 h-16 bg-white rounded-full "
        />
      </div>

      {photoURL && (
        <div>
          <h4>촬영 결과</h4>
          <img
            src={photoURL}
            alt="snapshot"
            width="800"
            height="600"
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              background: "black",
            }}
          />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {isUploading && <p>업로드 중...</p>}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
