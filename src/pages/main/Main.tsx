import Camera from "@/assets/Camera.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetAllPost } from "@/hooks/api/post";
import Image from "@components/ui/Image";
import Skeleton from "@components/ui/Skeleton";
const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) navigate("/onboard");
  }, []);

  const { data: allPostData, isLoading: isAllPostDataLoading } =
    useGetAllPost();

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex flex-col gap-4 px-4 pt-2">
      {isAllPostDataLoading ? (
        <Skeleton />
      ) : allPostData![0].created_at.slice(0, 10) !== today ? (
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
      ) : (
        <div className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-neutral-100">
          <Image
            className="object-cover w-56 h-56 rounded"
            src={allPostData![0].image_src}
          />
          <h1 className="text-xl font-bold ">오늘의 OOTD</h1>
          <p className="text-lg ">오늘의 사진이 등록되었어요.</p>
          <button
            className="w-full py-3 text-xl font-bold text-white bg-blue-500 rounded-xl"
            onClick={() => {
              navigate("/camera");
            }}
          >
            사진 보기
          </button>
        </div>
      )}

      <div
        style={{
          margin: "0 -1rem",
        }}
        className="grid grid-cols-2 gap-[1px]"
      >
        {!isAllPostDataLoading &&
          allPostData!.map((post) => {
            return (
              <Image
                onClick={() => {
                  navigate(`/post?id=${post.id}`);
                }}
                style={{ aspectRatio: 1 }}
                className="object-cover cursor-pointer"
                src={post.image_src}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Main;
