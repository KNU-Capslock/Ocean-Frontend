import { useGetClothes } from "@/hooks/api/cloth";
import { useLLM } from "@/hooks/api/llm";
import ClothesGrid from "@components/clothes/ClothesGrid";
import Image from "@components/ui/Image";
import RecommendButton from "@components/ui/RecommendButton";
import TextInput from "@components/ui/TextInput";
import { getOneCloth } from "@services/cloth";
import { useState } from "react";
const Clothes = () => {
  const [visible, setVisible] = useState(false);
  const { data: clothes } = useGetClothes();
  const { mutate: llm } = useLLM();
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [response, setResponse] = useState("질문을 입력하세요");
  return (
    <div className="relative">
      <ClothesGrid />
      <RecommendButton
        onClick={() => {
          setVisible((visible) => !visible);
        }}
        className="fixed z-20 w-32 -translate-x-1/2 shadow-lg left-1/2 bottom-20"
      />
      {visible && (
        <div
          style={{ backgroundColor: "#0000ff35", width: "calc(50% - 4rem)" }}
          className="fixed z-10 flex flex-col items-center gap-4 p-4 -translate-x-1/2 border-2 border-blue-600 rounded-xl left-1/2 bottom-40"
        >
          <div className="p-4 bg-white h-120 rounded-xl">{response}</div>

          {image && (
            <div className="relative flex items-center justify-center flex-grow-0 w-1/2 p-6 aspect-square bg-neutral-100 rounded-3xl">
              <Image src={image} />
            </div>
          )}
          <div className="flex w-full gap-4">
            <TextInput
              onChange={(e) => {
                setText(e.currentTarget.value);
              }}
              className="flex-grow w-full h-4 bg-white"
            />
            <button
              onClick={() => {
                llm(
                  {
                    json: clothes!,
                    request: text,
                  },
                  {
                    onSuccess: (res) => {
                      setResponse(res.content);
                      getOneCloth(res.item).then((val) => {
                        setImage(val.image_src);
                      });
                    },
                  }
                );
              }}
              className="flex-shrink-0 px-3 font-bold bg-white rounded-lg"
            >
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clothes;
