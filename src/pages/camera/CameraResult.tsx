import type { PostPostPayload } from "@services/post";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreatePost } from "@/hooks/api/post";
import { BlockSpinner } from "@components/Icons";

const CameraResult = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const photoURL = query.get("url");
  const { mutate: postPost } = useCreatePost();
  useEffect(() => {
    if (photoURL == null) navigate("/");
  }, []);
  const [post, setPost] = useState<PostPostPayload>({
    title: "",
    content: "",
    imageSrc: photoURL!,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handlePost = () => {
    if (post.title == "" || post.content == "")
      alert("게시물 내용을 입력해 주세요");
    else {
      setIsLoading(true);
      postPost(post, {
        onSuccess: (res) => {
          navigate("/post", {
            state: {
              id: res.id,
            },
          });
        },
        onError: () => {
          alert("알 수 없는 에러가 발생했습니다.");
        },
      });
    }
  };
  return (
    <div className="flex flex-col flex-grow">
      <img className="self-center object-cover w-3/5" src={photoURL!} />
      <div className="flex flex-col flex-grow gap-2 p-4">
        <h1 className="text-lg font-semibold">
          오늘의 OOTD가 다음과 같이 등록됩니다
        </h1>
        <input
          className="p-2 bg-gray-50 text-start"
          placeholder="게시글의 제목을 입력해 주세요"
          onChange={(e) => {
            setPost({ ...post, title: e.currentTarget.value });
          }}
        />
        <textarea
          className="flex-grow p-2 resize-none bg-gray-50 text-start"
          placeholder="OOTD의 설명을 입력해 주세요"
          onChange={(e) => {
            setPost({ ...post, content: e.currentTarget.value });
          }}
        />
        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              navigate("/camera");
            }}
            className="px-4 py-2 font-semibold rounded-lg bg-neutral-100"
          >
            다시 찍기
          </button>
          <button
            onClick={() => {
              handlePost();
            }}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg"
          >
            등록하기
          </button>
        </div>
      </div>
      {isLoading && (
        <div
          style={{ backgroundColor: "#ffffff50" }}
          className="absolute w-screen h-screen max-w-[512px] backdrop-blur-md flex flex-col justify-center items-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        >
          <BlockSpinner className="w-48 h-48 bg-blue-200" />
          <h1 className="text-xl font-bold">사진을 분석하는 중...</h1>
        </div>
      )}
    </div>
  );
};

export default CameraResult;
