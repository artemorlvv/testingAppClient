import React from "react";
import { twMerge } from "tailwind-merge";

const InputText = ({ className, label, ...props }) => {
  return (
    <div>
      {label && <p className="pl-2">{label}</p>}
      <input
        type={"text" || props.type}
        className={twMerge(
          "rounded-lg border-2 border-neutral-300 px-[0.8em] py-[0.4em] outline-none transition-colors  hover:border-neutral-400 focus:!border-blue-400",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export default InputText;
