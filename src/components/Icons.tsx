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
