import { useLogin } from "@/hooks/api/login";
import { WarnIcon } from "@components/Icons";
import Button from "@components/ui/Button";
import TextInput from "@components/ui/TextInput";
import type { LoginPayload } from "@services/login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [account, setAccount] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const { mutate: login } = useLogin();

  const navigate = useNavigate();

  const [isWarn, setIsWarn] = useState(false);

  const [warnText, setWarnText] = useState("");

  const handleLogin = () => {
    if (account.username == "" || account.password == "") {
      setWarnText("아이디, 비밀번호를 입력해주세요.");
      setIsWarn(true);
    } else {
      login(account, {
        onSuccess: (res) => {
          sessionStorage.setItem("token", res.token);
          navigate("/");
        },
        onError: () => {
          setWarnText("아이디 또는 비밀번호가 잘못되었습니다.");
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
        <h1 className="mb-24 text-6xl font-extrabold text-center">OCEAN</h1>
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
            로그인
          </Button>
          <a
            onClick={() => {
              navigate("/register");
            }}
            className="font-semibold underline cursor-pointer text-neutral-500"
          >
            회원가입 하기
          </a>
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

export default Login;
