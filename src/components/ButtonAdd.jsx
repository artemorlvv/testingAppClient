import React from "react";
import Button from "../ui/Button";
import { twMerge } from "tailwind-merge";

const ButtonAdd = ({ className, ...props }) => {
  return (
    <Button
      className={twMerge(
        "flex items-center gap-1 rounded-sm bg-green-500 text-white hover:bg-green-600",
        className,
      )}
      onClick={props.onClick}
    >
      <span className="">+</span>Добавить
    </Button>
  );
};

export default ButtonAdd;
