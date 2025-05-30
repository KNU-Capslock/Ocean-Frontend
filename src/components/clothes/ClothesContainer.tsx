import type { HTMLAttributes } from "react";

interface ClothesContainerProps extends HTMLAttributes<HTMLDivElement> {
  clothImg: string;
  clothType: string;
}

const ClothesContainer = ({
  clothImg,
  clothType,
  className,
  ...props
}: ClothesContainerProps) => {
  return (
    <div
      {...props}
      className={"min-w-32 min-h-32 bg-neutral-50 p-4" + (className ?? "")}
    ></div>
  );
};

export default ClothesContainer;
