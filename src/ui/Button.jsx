import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        "rounded-lg bg-blue-400 px-[0.8em] py-[0.4em] text-white transition-colors hover:bg-blue-500",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
