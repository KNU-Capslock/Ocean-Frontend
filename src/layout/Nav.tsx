import {
  CalenderIcon,
  CameraIcon,
  ClosetIcon,
  HomeIcon,
} from "@components/Icons";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-16" />
      <nav className="fixed bottom-0 flex items-center justify-between w-full max-w-[512px] bg-white py-3 px-10">
        <HomeIcon className="w-6 h-6" />
        <ClosetIcon className="w-6 h-6" />
        <div
          className="h-10 p-2 rounded-lg bg-neutral-200"
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
  );
};

export default Nav;
