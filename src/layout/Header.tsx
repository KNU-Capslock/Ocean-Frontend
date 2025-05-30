import { HeaderText } from "@/constants/HeaderText";
import { LeftIcon, NotiIcon } from "@components/Icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState<String | null>();
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    setText(HeaderText[pathname] ?? null);
    setHeaderVisible(
      pathname != "/onboard" && pathname != "/login" && pathname != "/register"
    );
  }, [pathname]);

  return (
    headerVisible && (
      <>
        <header className="fixed top-0 w-full z-[1] max-w-[512px] flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white">
          {text ? (
            <LeftIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            />
          ) : (
            <div className="w-6" />
          )}
          {text ? (
            <h1 className="text-lg font-bold">{text}</h1>
          ) : (
            <h1 className="text-xl font-extrabold">OCEAN</h1>
          )}
          <NotiIcon className="w-6 h-6 bg-neutral-600" />
        </header>
        <div className="mb-12" />
      </>
    )
  );
};

export default Header;
