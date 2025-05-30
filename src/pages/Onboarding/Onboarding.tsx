import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center flex-grow pt-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-extrabold">OCEAN</h1>
        <p>
          사진 한 장으로 완성하는 <b className="text-blue-500">오</b>늘의 패
          <b className="text-blue-500">션</b>
        </p>
      </div>
      <div className="flex flex-col items-center justify-end flex-grow w-full gap-2 p-4">
        <a className="text-lg font-semibold underline cursor-pointer text-neutral-500">
          오션이 처음이신가요?
        </a>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="w-full p-4 text-xl font-semibold text-white bg-black rounded-2xl"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
