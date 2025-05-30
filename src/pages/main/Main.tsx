import Camera from "@/assets/Camera.png";
import { useNavigate } from "react-router-dom";
import Category from "@components/ui/Category";
import Report from "@components/ui/Report";
import SmallButton from "@components/ui/SmallButton";
import { XIcon } from "@components/Icons";
import RecommendButton from "@components/ui/RecommendButton";
import DropdownButton from "@components/ui/DropDownButton";
import { useEffect, useState } from "react";
const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) navigate("/onboard");
  }, []);

  const [sortby, setSortBy] = useState(0);

  return (
    <div className="flex flex-col gap-4 px-4 pt-2">
      <div className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-neutral-100">
        <img className="w-56 h-56" src={Camera} />
        <h1 className="text-xl font-bold ">오늘의 사진을 안찍었어요.</h1>
        <p className="text-lg ">사진을 찍으면 OOTD를 자동 등록해줘요.</p>
        <button
          className="w-full py-3 text-xl font-bold text-white bg-blue-500 rounded-xl"
          onClick={() => {
            navigate("/camera");
          }}
        >
          사진 찍기
        </button>
      </div>
      <Category
        type="셔츠"
        detail="드롭숄더"
        print="스트라이프"
        texture="우븐"
        clothstyle="contemporary"
      />
      <Category
        type="팬츠"
        detail="자수"
        print="무지"
        texture="우븐"
        clothstyle="contemporary"
      />
      <Report
        type="팬츠"
        detail="자수"
        print="무지"
        texture="우븐"
        clothstyle="contemporary"
        created_at="2024-10-05"
      ></Report>
      <div>
        <SmallButton className="flex-grow">
          <XIcon className="w-5 h-5" />
          닫기
        </SmallButton>
        <RecommendButton />
        {sortby}
        <DropdownButton
          dropdownMenuList={["스타일별", "쭝성이", "띵성이"]}
          stateHandler={setSortBy}
        />
      </div>
      <div
        style={{
          margin: "0 -1rem",
        }}
        className="grid grid-cols-2 gap-[1px]"
      >
        {[...Array(16)].map((_, index) => {
          return <img src={`https://picsum.photos/seed/${index}/512/512`} />;
        })}
      </div>
    </div>
  );
};
export default Main;
