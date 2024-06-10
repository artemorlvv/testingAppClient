import React, { useState } from "react";
import arrowUpImg from "../assets/arrowUp.svg";
import Button from "../ui/Button";

const Dropdown = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="relative">
      <Button
        className="flex items-center gap-1 bg-neutral-200 text-black hover:bg-neutral-300"
        onClick={() => setModalShow(!modalShow)}
      >
        <span>{props.options[props.active] || props.nullValue}</span>
        <img src={arrowUpImg} className={modalShow ? "" : "rotate-180"} />
      </Button>
      {modalShow && (
        <div className="absolute right-0 top-full z-[1] mt-2 rounded-lg bg-neutral-200 p-2">
          {props.nullValue && (
            <Button
              className="w-full bg-neutral-200 text-black hover:bg-neutral-300"
              onClick={() => {
                props.onChange("");
                setModalShow(false);
              }}
            >
              {props.nullValue}
            </Button>
          )}
          {Object.entries(props.options).map(([key, value]) => (
            <Button
              className="w-full bg-neutral-200 text-black hover:bg-neutral-300"
              key={key}
              onClick={() => {
                props.onChange(key);
                setModalShow(false);
              }}
            >
              {value}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
