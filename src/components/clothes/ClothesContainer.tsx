import { useState, type HTMLAttributes, useMemo } from "react";
import Image from "@components/ui/Image";
import { ShirtIcon } from "@components/Icons";
import Report from "@components/ui/Report";
import { useDeleteCloth, useUpdateCloth } from "@/hooks/api/cloth";
import { useMe } from "@/hooks/api/user";

interface ClothesContainerProps extends HTMLAttributes<HTMLDivElement> {
  clothId: number;
  clothImg: string;
  clothName: string;
  clothUsername: string;
  clothType: string;
  detail: string;
  print: string;
  texture: string;
  clothstyle: string;
}

const ClothesContainer = ({
  clothId,
  clothName,
  clothUsername,
  detail,
  print,
  texture,
  clothstyle,
  clothImg,
  clothType,
  className = "",
  ...props
}: ClothesContainerProps) => {
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(clothName);
  const [editType, setEditType] = useState(clothType);
  const [editDetail, setEditDetail] = useState(detail);
  const [editPrint, setEditPrint] = useState(print);
  const [editTexture, setEditTexture] = useState(texture);
  const [editStyle, setEditStyle] = useState(clothstyle);

  const { data: me } = useMe();
  const { mutate: deleteCloth, isPending } = useDeleteCloth();
  const { mutate: updateCloth, isPending: isUpdating } = useUpdateCloth();

  const isOwner = useMemo(() => {
    if (!me) return false;
    return me.username === clothUsername;
  }, [me, clothUsername]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = confirm("이 옷을 삭제할까요?");
    if (!ok) return;

    deleteCloth(clothId, {
      onSuccess: () => {
        setVisible(false);
      },
      onError: () => {
        alert("삭제 실패. 로그인 상태/권한을 확인해줘.");
      },
    });
  };

  const handleUpdate = () => {
    updateCloth(
      {
        id: clothId,
        payload: {
          name: editName,
          type: editType,
          detail: editDetail,
          print: editPrint,
          texture: editTexture,
          style: editStyle,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setVisible(false);
        },
        onError: (error: any) => {
          console.error("옷 수정 실패:", error);
          const status = error?.response?.status;
          const message = error?.response?.data?.message || error?.message;

          if (status === 401) {
            alert("로그인이 필요합니다.");
          } else if (status === 403) {
            alert("수정 권한이 없습니다. (본인의 옷만 수정 가능)");
          } else {
            alert(`수정 실패: ${message || "알 수 없는 오류"}`);
          }
        },
      }
    );
  };

  return (
    <>
      <div
        {...props}
        onClick={() => {
          setVisible(true);
        }}
        style={{
          width: "calc(50% - 0.5rem)",
        }}
        className={
          "aspect-square relative cursor-pointer flex flex-grow-0 items-center justify-center bg-neutral-200 p-8 rounded-3xl " +
          (className ?? "")
        }
      >
        <ShirtIcon className="absolute w-8 h-8 left-4 top-4 text-neutral-600" />

        {/* ✅ 삭제 버튼 (가로로) */}
        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="absolute top-4 right-4 px-3 py-1.5 text-sm font-semibold text-white bg-red-500 rounded-lg disabled:opacity-50"
          >
            {isPending ? "삭제중" : "삭제"}
          </button>
        )}

        <Image
          src={clothImg}
          alt={clothType}
          className="flex flex-grow-0 aspect-square z-[1]"
        />
      </div>

      {visible && (
        <div
          onClick={() => {
            setVisible(false);
            setIsEditing(false);
          }}
          className="fixed top-0 left-0 z-30 w-screen h-screen backdrop-blur-sm"
        >
          {isEditing ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col p-4 gap-4 rounded-2xl w-[350px] bg-white shadow-2xl"
            >
              <ShirtIcon className="flex-shrink-0 w-6 h-6 text-neutral-500" />

              <div className="flex flex-col items-center">
                <Image
                  src={clothImg}
                  alt="의류 이미지"
                  className="w-64 h-64 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <InputField
                  label="이름"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <InputField
                  label="종류"
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                />
                <InputField
                  label="디테일"
                  value={editDetail}
                  onChange={(e) => setEditDetail(e.target.value)}
                />
                <InputField
                  label="프린트"
                  value={editPrint}
                  onChange={(e) => setEditPrint(e.target.value)}
                />
                <InputField
                  label="텍스쳐"
                  value={editTexture}
                  onChange={(e) => setEditTexture(e.target.value)}
                />
                <InputField
                  label="스타일"
                  value={editStyle}
                  onChange={(e) => setEditStyle(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-neutral-700 bg-neutral-200 rounded-lg"
                >
                  취소
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg disabled:opacity-50"
                >
                  {isUpdating ? "수정 중..." : "저장"}
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              <Report
                image={clothImg}
                type={clothType}
                detail={detail}
                print={print}
                texture={texture}
                clothstyle={clothstyle}
              />
              {isOwner && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg"
                >
                  수정
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ClothesContainer;

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, value, onChange }: InputFieldProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-sm w-16 flex-shrink-0">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
