import { useLocation, useNavigate } from "react-router-dom";

const CameraResult = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const photoURL = query.get("url");
  return (
    <div className="flex flex-col flex-grow">
      <h1 className="p-2">사진 결과</h1>
      <img src={photoURL!} />
      <div className="flex flex-col flex-grow gap-2 p-4">
        <h1 className="text-lg font-semibold">
          오늘의 OOTD가 다음과 같이 등록됩니다
        </h1>
        <textarea
          className="flex-grow p-2 resize-none bg-gray-50 text-start"
          placeholder="OOTD의 설명을 입력해 주세요 (선택사항)"
        ></textarea>
        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              navigate("/camera");
            }}
            className="px-4 py-2 font-semibold rounded-lg bg-neutral-100"
          >
            다시 찍기
          </button>
          <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg">
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraResult;
