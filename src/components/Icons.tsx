import type { HTMLAttributes } from "react";

export const MoveIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={
        "icon-[icon-park-outline--to-right] " + (props.className ?? "")
      }
    />
  );
};

export const HomeIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={
        "icon-[material-symbols--home-outline-rounded] " +
        (props.className ?? "")
      }
    />
  );
};

export const ClosetIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mdi--closet] " + (props.className ?? "")}
    />
  );
};

export const CameraIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mdi--camera] " + (props.className ?? "")}
    />
  );
};

export const CalenderIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[uil--calender] " + (props.className ?? "")}
    />
  );
};

export const NotiIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mdi--notifications] " + (props.className ?? "")}
    />
  );
};

export const LeftIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mingcute--left-fill] " + (props.className ?? "")}
    />
  );
};

export const HatIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mingcute--hat-line] " + (props.className ?? "")}
    />
  );
};

export const JacketIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[lucide-lab--jacket] " + (props.className ?? "")}
    />
  );
};

export const ShirtIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[tabler--shirt] " + (props.className ?? "")}
    />
  );
};

export const PantsIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[icon-park--clothes-pants] " + (props.className ?? "")}
    />
  );
};

export const ShoesIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={
        "icon-[icon-park-outline--spikedshoes] " + (props.className ?? "")
      }
    />
  );
};

export const GPTIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[hugeicons--chat-gpt] " + (props.className ?? "")}
    />
  );
};

export const XIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[dashicons--no-alt] " + (props.className ?? "")}
    />
  );
};

export const DownIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mingcute--down-line] " + (props.className ?? "")}
    />
  );
};

export const WarnIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={
        "icon-[material-symbols--warning-rounded] " + (props.className ?? "")
      }
    />
  );
};

export const BarSpinner = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[svg-spinners--bars-fade] " + (props.className ?? "")}
    />
  );
};

export const BlockSpinner = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[svg-spinners--blocks-wave] " + (props.className ?? "")}
    />
  );
};

export const CameraAiIcon = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={"icon-[mingcute--camera-2-ai-line] " + (props.className ?? "")}
    />
  );
};
