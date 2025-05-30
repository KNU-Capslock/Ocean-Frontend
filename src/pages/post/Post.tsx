import { useGetPost } from "@/hooks/api/post";
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
      <div>
        {PostData!.title}
        {PostData!.username}
        <Image src={PostData!.image_src} />
        {PostData!.created_at}
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
    )
  );
};

export default Post;
