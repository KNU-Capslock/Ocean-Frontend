import { useRef, useEffect } from "react";
import useCamera from "@/hooks/useCamera";
import { useNavigate } from "react-router-dom";

const Camera = () => {
  const { videoRef, start, stop } = useCamera();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const navigate = useNavigate();
  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    // const { videoWidth: w, videoHeight: h } = videoRef.current;
    // canvasRef.current.width = w;
    // canvasRef.current.height = h;

    const rect = videoRef.current.getBoundingClientRect();

    const vw = videoRef.current.videoWidth;
    const vh = videoRef.current.videoHeight;
    const cropW = vh * (rect.width / rect.height);
    const cropH = vh;
    const sx = (vw - cropW) / 2;
    const sy = 0;

    canvasRef.current.width = cropW;
    canvasRef.current.height = cropH;

    const ctx = canvasRef.current.getContext("2d")!;
    ctx.drawImage(videoRef.current, sx, sy, cropW, cropH, 0, 0, cropW, cropH);
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      console.log(url);
      navigate("/camera/result?url=" + url);
    }, "image/jpeg");
    stop();
  };

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center flex-grow">
      <div
        style={{ display: videoRef.current ? "flex" : "none" }}
        className="text-center"
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            height: "calc(100vh - 7.5rem)",
            width: "100%",
            aspectRatio: "9 / 16",
            objectFit: "cover",
            background: "black",
            flexGrow: "1",
          }}
        />
        <button
          onClick={() => {
            takePhoto();
          }}
          style={{
            transform: "translateX(-50%) translateY(-7em)",
          }}
          className="absolute bottom-0 z-10 w-16 h-16 bg-white rounded-full left-1/2"
        />
      </div>
      <canvas
        ref={canvasRef}
        style={{
          display: "none",
          height: "calc(100vh - 7.5rem)",
          width: "100%",
          aspectRatio: "9 / 16",
          objectFit: "cover",
          background: "black",
          flexGrow: "1",
        }}
      />
    </div>
  );
};

export default Camera;
