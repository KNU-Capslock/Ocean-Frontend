import { useMe, useUpdateUser, useDeleteUser } from "@/hooks/api/user";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { data: me, isLoading } = useMe();
  const { mutate: updateUserMutate, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteUserMutate, isPending: isDeleting } = useDeleteUser();

  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  useEffect(() => {
    if (me) {
      setEditUsername(me.username);
      setEditEmail(me.email);
    }
  }, [me]);

  const handleUpdate = () => {
    const payload: any = {};

    if (editUsername !== me?.username) {
      payload.username = editUsername;
    }
    if (editEmail !== me?.email) {
      payload.email = editEmail;
    }
    if (editPassword) {
      payload.password = editPassword;
    }

    if (Object.keys(payload).length === 0) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    updateUserMutate(payload, {
      onSuccess: () => {
        setIsEditing(false);
        setEditPassword("");
        alert("프로필이 수정되었습니다.");
      },
      onError: (error: any) => {
        console.error("프로필 수정 실패:", error);
        const status = error?.response?.status;
        const message = error?.response?.data?.message || error?.message;

        if (status === 401) {
          alert("로그인이 필요합니다.");
        } else if (status === 403) {
          alert("수정 권한이 없습니다.");
        } else {
          alert(`수정 실패: ${message || "알 수 없는 오류"}`);
        }
      },
    });
  };

  const handleDelete = () => {
    const ok = confirm(
      "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );
    if (!ok) return;

    deleteUserMutate(undefined, {
      onSuccess: () => {
        sessionStorage.removeItem("token");
        alert("계정이 삭제되었습니다.");
        navigate("/login");
      },
      onError: (error: any) => {
        console.error("계정 삭제 실패:", error);
        const status = error?.response?.status;
        const message = error?.response?.data?.message || error?.message;

        if (status === 401) {
          alert("로그인이 필요합니다.");
        } else {
          alert(`삭제 실패: ${message || "알 수 없는 오류"}`);
        }
      },
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    alert("로그아웃되었습니다.");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-neutral-500 font-semibold">로딩 중...</p>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-neutral-500 font-semibold">
          로그인이 필요합니다.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 text-white bg-blue-500 rounded-lg font-semibold hover:bg-blue-600"
        >
          로그인하기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="w-24 h-24 overflow-hidden border-4 rounded-full border-neutral-300">
          <img src="https://picsum.photos/256/256" alt="Profile" />
        </div>

        <h1 className="text-2xl font-bold">프로필</h1>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm text-neutral-700">
            사용자 이름
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="사용자 이름"
            />
          ) : (
            <p className="w-full px-3 py-2 bg-neutral-100 rounded-lg">
              {me.username}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm text-neutral-700">
            이메일
          </label>
          {isEditing ? (
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이메일"
            />
          ) : (
            <p className="w-full px-3 py-2 bg-neutral-100 rounded-lg">
              {me.email}
            </p>
          )}
        </div>

        {isEditing && (
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-neutral-700">
              비밀번호 (변경 시에만 입력)
            </label>
            <input
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="새 비밀번호 (선택사항)"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 mt-4">
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditUsername(me.username);
                  setEditEmail(me.email);
                  setEditPassword("");
                }}
                className="flex-1 px-4 py-3 font-semibold text-neutral-700 bg-neutral-200 rounded-lg hover:bg-neutral-300"
              >
                취소
              </button>
              <button
                disabled={isUpdating}
                onClick={handleUpdate}
                className="flex-1 px-4 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? "저장 중..." : "저장"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              프로필 수정
            </button>
          )}

          <button
            onClick={() => navigate("/qr")}
            className="w-full px-4 py-3 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            QR 코드 생성
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 font-semibold text-neutral-700 bg-neutral-200 rounded-lg hover:bg-neutral-300"
          >
            로그아웃
          </button>

          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="w-full px-4 py-3 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "삭제 중..." : "계정 삭제"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
