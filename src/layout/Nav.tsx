import {
  CalenderIcon,
  CameraIcon,
  ClosetIcon,
  HomeIcon,
} from "@components/Icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    setNavVisible(
      pathname != "/onboard" && pathname != "/login" && pathname != "/register"
    );
  }, [pathname]);
  return (
    navVisible && (
      <>
        <div className="mt-16" />
        <nav className="fixed z-10 bottom-0 flex items-center justify-between w-full max-w-[512px] bg-white py-3 px-10">
          <HomeIcon
            onClick={() => {
              navigate("/");
            }}
            className="w-6 h-6 cursor-pointer"
          />
          <ClosetIcon
            onClick={() => {
              navigate("/clothes");
            }}
            className="w-6 h-6 cursor-pointer"
          />
          <div
            className="h-10 p-2 rounded-lg cursor-pointer bg-neutral-200"
            onClick={() => {
              navigate("/camera");
            }}
          >
            <CameraIcon className="w-6 h-6" />
          </div>
          <CalenderIcon className="w-6 h-6" />
          <div className="w-6 h-6 overflow-hidden border rounded-full border-neutral-300">
            <img src="https://picsum.photos/256/256" />
          </div>
        </nav>
      </>
    )
  );
};

export default Nav;
