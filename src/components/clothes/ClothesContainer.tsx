import type { HTMLAttributes } from "react";
import Image from "@components/ui/Image";

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
      className={
        "flex items-center justify-center w-40 h-40 bg-neutral-200 p-4 rounded-3xl" +
        (className ?? "")
      }
    >
      <Image
        src={clothImg}
        alt={clothType}
        className="flex w-28 h-28 object-cover "
      />
    </div>
  );
};

export default ClothesContainer;
