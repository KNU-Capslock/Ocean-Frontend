import { useLocation } from "react-router-dom";

const CameraResult = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const photoURL = query.get("url");
  return (
    <div className="flex flex-col gap-4">
      <img
        src={photoURL!}
        alt="snapshot"
        width="800"
        height="600"
        style={{
          width: "100%",
          aspectRatio: "9 / 16",
          objectFit: "cover",
          background: "black",
        }}
      />
      <h1>촬영 결과</h1>
    </div>
  );
};

export default CameraResult;
