import { useNavigate } from "react-router-dom";
import { useGetMyPosts } from "@/hooks/api/post";
import Image from "@components/ui/Image";
import Skeleton from "@components/ui/Skeleton";

const MyPosts = () => {
  const navigate = useNavigate();
  const { data: myPosts, isLoading } = useGetMyPosts();

  return (
    <div className="flex flex-col gap-4 px-4 pt-2">
      <h1 className="text-xl font-bold">내 게시물</h1>

      {isLoading ? (
        <Skeleton />
      ) : !myPosts || myPosts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 p-8">
          <p className="text-neutral-500">게시물이 없습니다.</p>
          <button
            className="px-6 py-3 text-white bg-blue-500 rounded-xl font-bold"
            onClick={() => navigate("/camera")}
          >
            사진 찍기
          </button>
        </div>
      ) : (
        <div
          style={{ margin: "0 -1rem" }}
          className="grid grid-cols-2 gap-[1px]"
        >
          {myPosts.map((post) => (
            <Image
              key={post.id}
              onClick={() => navigate(`/post?id=${post.id}`)}
              style={{ aspectRatio: 1 }}
              className="object-cover cursor-pointer"
              src={post.image_src}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
