import React from "react";
import ButtonAdd from "./ButtonAdd";
import InputText from "../ui/InputText";
import Button from "../ui/Button";
import deleteImg from "../assets/delete.svg";
import arrowImg from "../assets/arrow.svg";

const CheckboxQuestionCreate = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="">Варианты ответов:</p>
      {props.options.map((option, index) => (
        <div className="flex items-center gap-2" key={index}>
          <button
            className="rounded-sm p-2 hover:bg-neutral-200"
            onClick={() => props.onClick(index)}
          >
            <div
              className={`rounded-sm border-2 border-neutral-400 p-3 ${option.is_correct && "bg-blue-400"}`}
            />
          </button>
          <InputText
            value={option.option_text}
            onChange={(e) => props.onChange(index, e.target.value)}
          />
          <Button className={"p-2"} onClick={() => props.onMoveUp(index)}>
            <img src={arrowImg} />
          </Button>
          <Button className={"p-2"} onClick={() => props.onMoveDown(index)}>
            <img src={arrowImg} className="rotate-180" />
          </Button>
          <Button
            className={"bg-red-400 p-2 hover:bg-red-500"}
            onClick={() => props.onDelete(index)}
          >
            <img src={deleteImg} />
          </Button>
        </div>
      ))}
      <ButtonAdd className={"self-start"} onClick={props.onAdd} />
    </div>
  );
};

export default CheckboxQuestionCreate;
