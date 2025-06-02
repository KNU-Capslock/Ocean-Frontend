import { useGetClothes } from "@/hooks/api/cloth";
import { useLLM } from "@/hooks/api/llm";
import ClothesGrid from "@components/clothes/ClothesGrid";
import { EnterIcon, ShirtIcon } from "@components/Icons";
import Image from "@components/ui/Image";
import RecommendButton from "@components/ui/RecommendButton";
import { getOneCloth } from "@services/cloth";
import { useRef, useState } from "react";
const Clothes = () => {
  const [visible, setVisible] = useState(false);
  const { data: clothes } = useGetClothes();
  const { mutate: llm } = useLLM();
  const [text, setText] = useState("");
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const [chat, setChat] = useState<
    { text: string; image?: string; isLLM: boolean }[]
  >([
    {
      text: "안녕하세요! 원하는 스타일·상황을 말해주세요! 가진 옷을 기반으로 추천해드립니다 😉",
      isLLM: true,
    },
  ]);
  return (
    <div className="relative">
      <ClothesGrid />
      <RecommendButton
        onClick={() => {
          setVisible((visible) => !visible);
        }}
        className="fixed z-20 w-28 py-1.5 text-xl -translate-x-1/2 rounded-full shadow-lg left-1/2 bottom-20"
      />
      {visible && (
        <div className="absolute top-0 z-10 w-screen h-full">
          <div
            style={{
              backgroundColor: "#0000ff35",
              width: "calc(min(50%, 512px) - 4rem)",
            }}
            className="fixed z-10 flex flex-col items-center gap-4 p-4 -translate-x-1/2 border-2 border-blue-600 h-3/4 rounded-xl left-1/2 bottom-36"
          >
            <div className="flex flex-col flex-grow w-full gap-2 overflow-y-scroll scrollbar-hide">
              {chat.map((message) => {
                if (message.isLLM)
                  return (
                    <div className="p-3 bg-white rounded-tl-none w-fit rounded-2xl">
                      {message.text.split("\n").map((text) => {
                        return <p>{text}</p>;
                      })}
                      {message.image && (
                        <div
                          className={
                            "aspect-square relative cursor-pointer mt-2 flex-shrink-0 w-48 flex flex-grow-0 items-center justify-center bg-neutral-200 p-8 rounded-2xl"
                          }
                        >
                          <ShirtIcon className="absolute w-6 h-6 left-4 top-4 text-neutral-600" />
                          <Image
                            src={message.image}
                            className="flex flex-grow-0 aspect-square z-[1]"
                          />
                        </div>
                      )}
                    </div>
                  );
                return (
                  <div className="self-end p-3 bg-white rounded-tr-none w-fit rounded-2xl">
                    {message.text}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center w-full gap-4">
              <input
                placeholder="여기에 질문을 입력"
                ref={textInputRef}
                onChange={(e) => {
                  setText(e.currentTarget.value);
                }}
                className="flex-grow w-full h-4 p-4 bg-white rounded-lg"
              />
              <div
                className="absolute cursor-pointer flex items-center justify-center p-0.5 bg-blue-500 rounded right-6"
                onClick={() => {
                  setChat((chat) => [...chat, { text: text, isLLM: false }]);
                  textInputRef!.current!.value = "";
                  llm(
                    {
                      json: clothes!,
                      request: text,
                    },
                    {
                      onSuccess: (res) => {
                        setChat((chat) => [
                          ...chat,
                          { text: res.content, isLLM: true },
                        ]);
                        getOneCloth(res.item).then((val) => {
                          setChat((chat) => [
                            ...chat,
                            {
                              text: "사용자님이 가지고 계신 의상중\n다음 의상을 추천해요:",
                              image: val.image_src,
                              isLLM: true,
                            },
                          ]);
                        });
                      },
                    }
                  );
                }}
              >
                <EnterIcon className="bg-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clothes;
