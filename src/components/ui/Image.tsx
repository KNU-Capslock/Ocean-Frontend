import type { ImgHTMLAttributes } from "react";

const Image = ({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} src={import.meta.env.VITE_BACKEND_URL + src} />;
};

export default Image;
