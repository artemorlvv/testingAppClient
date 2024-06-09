import React from "react";
import { twMerge } from "tailwind-merge";

const BorderContainer = (props) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 rounded-sm border px-4 py-2",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

export default BorderContainer;
