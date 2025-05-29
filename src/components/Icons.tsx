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
      className={"icon-[tabler-shirt] " + (props.className ?? "")}
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
