import type { HTMLAttributes } from "react";

import { ShirtIcon } from "@components/Icons";
import Image from "./Image";

interface CategoryProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
  type: string;
  detail: string;
  print: string;
  texture: string;
  clothstyle: string;
}

const Category = ({
  image,
  type,
  detail,
  print,
  texture,
  clothstyle,
  ...rest
}: CategoryProps) => {
  return (
    <div
      className="flex items-center gap-4 px-4 py-2 rounded-xl bg-gray-50"
      {...rest}
    >
      <ShirtIcon className="flex-shrink-0 w-6 h-6 text-neutral-500" />
      <Image
        src={
          image ??
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?fit=crop&w=100&q=80"
        }
        alt="의류 이미지"
        className="object-cover w-16 h-16 border-2 rounded-lg border-neutral-300"
      />
      <div className="flex flex-wrap gap-1.5">
        {[type, detail, print, texture, clothstyle].map((tag, i) => (
          <span
            key={i}
            className="px-3 py-0.5 text-sm font-medium bg-white border rounded-full border-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Category;
