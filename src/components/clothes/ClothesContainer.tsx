import { useState, type HTMLAttributes } from "react";
import Image from "@components/ui/Image";
import { ShirtIcon } from "@components/Icons";
import Report from "@components/ui/Report";

interface ClothesContainerProps extends HTMLAttributes<HTMLDivElement> {
  clothImg: string;
  clothType: string;
  detail: string;
  print: string;
  texture: string;
  clothstyle: string;
}

const ClothesContainer = ({
  detail,
  print,
  texture,
  clothstyle,
  clothImg,
  clothType,
  className = "",
  ...props
}: ClothesContainerProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div
        {...props}
        onClick={() => {
          setVisible(true);
        }}
        style={{
          width: "calc(50% - 0.5rem)",
        }}
        className={
          "aspect-square relative cursor-pointer flex flex-grow-0 items-center justify-center bg-neutral-200 p-8 rounded-3xl" +
          (className ?? "")
        }
      >
        <ShirtIcon className="absolute w-8 h-8 left-4 top-4 text-neutral-600" />
        <Image
          src={clothImg}
          alt={clothType}
          className="flex flex-grow-0 aspect-square z-[1]"
        />
      </div>
      {visible && (
        <div
          onClick={() => {
            setVisible(false);
          }}
          className="fixed top-0 left-0 z-20 w-screen h-screen"
        >
          <Report
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            image={clothImg}
            type={clothType}
            detail={detail}
            print={print}
            texture={texture}
            clothstyle={clothstyle}
          />
        </div>
      )}
    </>
  );
};

export default ClothesContainer;
