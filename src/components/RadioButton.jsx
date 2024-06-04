import React from "react";

const RadioButton = (props) => {
  return (
    <button
      className="flex items-center gap-2 rounded-sm px-4 py-2 transition-colors hover:bg-neutral-200"
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
