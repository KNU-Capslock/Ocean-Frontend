import type { HTMLAttributes } from "react";
import { ShirtIcon } from "@components/Icons";

interface ReportProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
  type: string;
  detail: string;
  print: string;
  texture: string;
  clothstyle: string;
  created_at: string;
}

const Report = ({
  image,
  type,
  detail,
  print,
  texture,
  clothstyle,
  created_at,
  ...rest
}: ReportProps) => {
  return (
    <div className="flex flex-col p-4 gap-4 rounded-2xl  w-[350px] bg-white shadow-2xl">
      <ShirtIcon className="w-6 h-6 text-neutral-500 flex-shrink-0" />

      <div className="flex flex-col items-center ">
        <img
          src={
            image ??
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?fit=crop&w=100&q=80"
          }
          alt="의류 이미지"
          className="w-64 h-64 rounded-lg object-cover border"
        />
      </div>
      <div>
        <Text label="종류" value={type} />
        <Text label="디테일" value={detail} />
        <Text label="프린트" value={print} />
        <Text label="텍스쳐" value={texture} />
        <Text label="스타일" value={clothstyle} />
        <Text label="등록한 날" value={created_at} />
      </div>
    </div>
  );
};

export default Report;

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value?: string;
}

const Text = ({ value = "-", ...props }: TextProps) => {
  return (
    <div className={"flex items-center gap-2 text-black text-base "}>
      <span className="font-semibold">{props.label}</span>
      <span className="font-normal">{value}</span>
    </div>
  );
};
