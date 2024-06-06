import React from "react";

const RadioButton = (props) => {
  return (
    <button
      className={`flex cursor-default items-center gap-2 rounded-sm px-4 py-2 transition-colors ${!props.disabled && "cursor-pointer hover:bg-neutral-200"} ${props.correct && "outline outline-2 outline-blue-400"}`}
      onClick={props.onClick}
    >
      <div
        className={`rounded-full border-2 border-neutral-500 p-2 ${props.active ? "border-blue-400 bg-blue-400" : null} transition-colors`}
      />
      <p>{props.text}</p>
    </button>
  );
};

export default RadioButton;
