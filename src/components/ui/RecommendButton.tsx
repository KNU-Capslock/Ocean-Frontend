import { GPTIcon } from "@components/Icons";
const RecommendButton = () => {
  return (
    <button
      className={
        "flex px-3 py-1 gap-1 text-sm cursor-pointer font-bold items-center justify-center text-blue-500 bg-white  border-2 border-blue-500 rounded-2xl shadow-2xl "
      }
    >
      <GPTIcon className="w-5 h-5" />
      추천
    </button>
  );
};

export default RecommendButton;
