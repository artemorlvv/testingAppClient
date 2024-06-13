import React from "react";
import { twMerge } from "tailwind-merge";

const Checkbox = (props) => {
  return (
    <button
      className={twMerge(
        `flex items-center gap-2 rounded-sm px-4 py-2 transition-colors ${!props.disabled ? "cursor-pointer hover:bg-neutral-200" : "cursor-default"} ${props.correct && props.answersVisible && "outline outline-2 outline-blue-400"}`,
        props.className,
      )}
      onClick={props.onClick}
    >
      <div
        className={`rounded-sm border-2 border-neutral-500 p-2 ${props.active ? "border-blue-400 bg-blue-400" : null} transition-colors`}
      />
      <p>{props.text}</p>
    </button>
  );
};

export default Checkbox;
