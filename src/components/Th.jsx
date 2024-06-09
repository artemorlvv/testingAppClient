import React from "react";
import { twMerge } from "tailwind-merge";

const Th = (props) => {
  return (
    <th
      className={twMerge(
        "w-[15%] border border-b-2 border-neutral-500 px-[0.8em] py-[0.4em]",
        props.className,
      )}
    >
      {props.children}
    </th>
  );
};

export default Th;
