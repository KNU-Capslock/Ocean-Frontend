import { useGetPost } from "@/hooks/api/post";
import { CameraAiIcon } from "@components/Icons";
import Category from "@components/ui/Category";
import Image from "@components/ui/Image";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Post = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const postId = query.get("id");

  useEffect(() => {
    if (postId == null) navigate("/");
  }, []);

  const { data: PostData, isLoading: isPostDataLoading } = useGetPost(
    Number(postId)
  );

  return (
    !isPostDataLoading && (
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="flex flex-col w-full ">
          <h1 className="w-full text-2xl font-semibold">{PostData!.title}</h1>
          <div className="flex justify-between w-full">
            <p className="text-neutral-500">@{PostData!.username}</p>
            <p>{PostData!.created_at.slice(0, 10)}</p>
          </div>
        </div>
        <Image className="w-4/5" src={PostData!.image_src} />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <CameraAiIcon className="w-5 h-5 " />
            <h2 className="text-lg font-semibold">
              인식된 옷 ({PostData!.clothes_list.length})
            </h2>
          </div>
          {PostData!.clothes_list.map((cloth) => {
            return (
              <Category
                image={cloth.image_src}
                type={cloth.type}
                detail={cloth.detail}
                print={cloth.print}
                texture={cloth.texture}
                clothstyle={cloth.style}
              />
            );
          })}
        </div>
        <p className="w-full">{PostData!.content}</p>
      </div>
    )
  );
};

export default Post;
