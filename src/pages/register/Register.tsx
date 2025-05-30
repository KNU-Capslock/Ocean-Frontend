import { useLogin } from "@/hooks/api/login";
import { useRegister } from "@/hooks/api/user";
import { WarnIcon } from "@components/Icons";
import Button from "@components/ui/Button";
import TextInput from "@components/ui/TextInput";
import type { RegisterPayload } from "@services/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [account, setAccount] = useState<RegisterPayload>({
    username: "",
    email: "",
    password: "",
  });

  const { mutate: register } = useRegister();
  const { mutate: login } = useLogin();

  const navigate = useNavigate();

  const [isWarn, setIsWarn] = useState(false);

  const [warnText, setWarnText] = useState("");

  const handleLogin = () => {
    if (
      account.username == "" ||
      account.password == "" ||
      account.email == ""
    ) {
      setWarnText("아이디, 비밀번호, 이메일을 확인해주세요.");
      setIsWarn(true);
    } else {
      register(account, {
        onSuccess: () => {
          login(
            { username: account.username, password: account.password },
            {
              onSuccess: (res) => {
                sessionStorage.setItem("token", res.token);
                navigate("/");
              },
              onError: () => {
                setWarnText("에러가 발생했습니다. 다시 시도해주세요.");
                setIsWarn(true);
              },
            }
          );
        },
        onError: () => {
          setWarnText("아이디 또는 이메일이 중복되었습니다.");
          setIsWarn(true);
        },
      });
    }
  };

  useEffect(() => {
    const isLogined = !!sessionStorage.getItem("token");
    if (isLogined) navigate("/");
  }, []);
  return (
    <div className="flex flex-col items-center gap-32 px-8 pt-32">
      <section className="flex flex-col w-full gap-4">
        <h1 className="mb-2 text-4xl font-bold text-center">OCEAN 회원가입</h1>
        <p className="mb-2 text-sm text-center text-neutral-500">
          여기서 당신의 스타일은 더 똑똑하게, 옷장은 더 가볍고 즐거워집니다.
          <br />
          이제 매일의 코디 고민, 저희가 함께할게요.
        </p>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">아이디</p>
          <TextInput
            placeholder="닉네임"
            onChange={(e) => {
              setAccount({ ...account, username: e.currentTarget.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold">이메일</h2>
          <TextInput
            placeholder="이메일"
            onChange={(e) => {
              setAccount({ ...account, email: e.currentTarget.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold">비밀번호</h2>
          <TextInput
            placeholder="계정 비밀번호"
            type="password"
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                handleLogin();
              }
            }}
            onChange={(e) => {
              setAccount({ ...account, password: e.currentTarget.value });
            }}
          />
        </div>
        <div className="flex flex-col items-center gap-1 pt-4">
          <Button
            className="w-full"
            onClick={() => {
              handleLogin();
            }}
          >
            회원가입
          </Button>
        </div>
        {isWarn && (
          <div className="flex items-center gap-2 px-4 py-4 font-semibold text-white bg-red-500 rounded ">
            <WarnIcon />
            {warnText}
          </div>
        )}
      </section>
    </div>
  );
};

export default Register;
