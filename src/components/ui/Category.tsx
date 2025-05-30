import type { HTMLAttributes } from "react";

import { ShirtIcon } from "@components/Icons";

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
      className="flex items-center gap-4 p-2 rounded-xl bg-gray-50"
      {...rest}
    >
      <ShirtIcon className="w-6 h-6 text-neutral-500 flex-shrink-0" />
      <img
        src={
          image ??
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?fit=crop&w=100&q=80"
        }
        alt="의류 이미지"
        className="w-16 h-16 rounded-lg object-cover border"
      />
      <div className="flex flex-wrap gap-2">
        {[type, detail, print, texture, clothstyle].map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-sm border rounded-full text-black border-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Category;
