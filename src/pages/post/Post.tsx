import { useGetPost, useDeletePost, useUpdatePost } from "@/hooks/api/post";
import { useMe } from "@/hooks/api/user";
import Image from "@components/ui/Image";
import Category from "@components/ui/Category";
import { CameraAiIcon } from "@components/Icons";
import { useEffect, useMemo, useState } from "react";
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

  const { data: me } = useMe();
  const { mutate: deletePostMutate, isPending: isDeleting } = useDeletePost();
  const { mutate: updatePostMutate, isPending: isUpdating } = useUpdatePost();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (PostData) {
      setEditTitle(PostData.title);
      setEditContent(PostData.content);
    }
  }, [PostData]);

  // ✅ PostData 선언 이후에 owner 계산
  const isOwner = useMemo(() => {
    if (!me || !PostData) return false;
    return me.username === PostData.username;
  }, [me, PostData]);

  const handleDelete = () => {
    if (!postId) return;
    const ok = confirm("게시물을 삭제할까요? 삭제하면 되돌릴 수 없습니다.");
    if (!ok) return;

    deletePostMutate(Number(postId), {
      onSuccess: () => navigate("/"),
      onError: () => alert("삭제에 실패했습니다. 로그인/권한을 확인하세요."),
    });
  };

  const handleUpdate = () => {
    if (!postId) return;
    updatePostMutate(
      {
        id: Number(postId),
        payload: {
          title: editTitle,
          content: editContent,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (error: any) => {
          console.error("게시물 수정 실패:", error);
          const status = error?.response?.status;
          const message = error?.response?.data?.message || error?.message;

          if (status === 401) {
            alert("로그인이 필요합니다.");
          } else if (status === 403) {
            alert("수정 권한이 없습니다. (본인의 게시물만 수정 가능)");
          } else {
            alert(`수정 실패: ${message || "알 수 없는 오류"}`);
          }
        },
      }
    );
  };

  return (
    !isPostDataLoading &&
    PostData && (
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="flex flex-col w-full ">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full text-2xl font-semibold px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              placeholder="제목"
            />
          ) : (
            <h1 className="w-full text-2xl font-semibold">{PostData.title}</h1>
          )}

          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex justify-between w-full">
              <p className="text-neutral-500">@{PostData.username}</p>
              <p>{PostData.created_at.slice(0, 10)}</p>
            </div>

            {isOwner && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditTitle(PostData.title);
                        setEditContent(PostData.content);
                      }}
                      className="px-4 py-2 text-sm font-semibold text-neutral-700 bg-neutral-200 rounded whitespace-nowrap"
                    >
                      취소
                    </button>
                    <button
                      disabled={isUpdating}
                      onClick={handleUpdate}
                      className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded whitespace-nowrap min-w-[72px] text-center disabled:opacity-50"
                    >
                      {isUpdating ? "저장 중..." : "저장"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded whitespace-nowrap"
                    >
                      수정
                    </button>
                    <button
                      disabled={isDeleting}
                      onClick={handleDelete}
                      className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded whitespace-nowrap min-w-[72px] text-center disabled:opacity-50"
                    >
                      {isDeleting ? "삭제 중..." : "삭제"}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <Image className="w-4/5" src={PostData.image_src} />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <CameraAiIcon className="w-5 h-5 " />
            <h2 className="text-lg font-semibold">
              인식된 옷 ({PostData.clothes_list.length})
            </h2>
          </div>

          {PostData.clothes_list.map((cloth) => (
            <Category
              key={cloth.id ?? `${cloth.type}-${cloth.detail}-${cloth.texture}`}
              image={cloth.image_src}
              type={cloth.type}
              detail={cloth.detail}
              print={cloth.print}
              texture={cloth.texture}
              clothstyle={cloth.style}
            />
          ))}
        </div>

        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="내용"
          />
        ) : (
          <p className="w-full">{PostData.content}</p>
        )}
      </div>
    )
  );
};

export default Post;
