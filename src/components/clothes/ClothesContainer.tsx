import type { HTMLAttributes } from "react";
import Image from "@components/ui/Image";
import { ShirtIcon } from "@components/Icons";

interface ClothesContainerProps extends HTMLAttributes<HTMLDivElement> {
  clothImg: string;
  clothType: string;
}

const ClothesContainer = ({
  clothImg,
  clothType,
  className = "",
  ...props
}: ClothesContainerProps) => {
  return (
    <div
      {...props}
      style={{
        width: "calc(50% - 0.5rem)",
      }}
      className={
        "aspect-square relative flex flex-grow-0 items-center justify-center bg-neutral-200 p-8 rounded-3xl" +
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
  );
};

export default ClothesContainer;
