import { NotiIcon } from "@components/Icons";

const Header = () => {
  return (
    <>
      <header className="fixed top-0 w-full max-w-[512px] flex justify-between px-4 py-3 bg-white">
        <div className="w-6" />
        <h1 className="text-xl font-extrabold">OCEAN</h1>
        <NotiIcon className="w-6 h-6 bg-neutral-600" />
      </header>
      <div className="mb-14" />
    </>
  );
};

export default Header;
