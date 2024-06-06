import React from "react";
import InputText from "../ui/InputText";

const RadioButtonCreate = (props) => {
  return (
    <button
      className={`flex cursor-default items-center gap-2 rounded-sm px-4 py-2 transition-colors `}
      onClick={props.onClick}
    >
      <div
        className={`rounded-full border-2 border-neutral-500 p-2 ${props.active ? "border-blue-400 bg-blue-400" : null} transition-colors`}
      />
      <InputText value={props.text} onChange={props.onInputChange} />
    </button>
  );
};

export default RadioButtonCreate;
