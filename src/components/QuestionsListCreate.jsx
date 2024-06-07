import React, { useState } from "react";
import Button from "../ui/Button";
import { twMerge } from "tailwind-merge";
import ButtonAdd from "./ButtonAdd";

const QuestionsListCreate = (props) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const onCreate = (type) => {
    if (props.onCreate) props.onCreate(type);
    setShowAddModal(false);
  };

  return (
    <div className="flex h-min flex-col gap-2 rounded-sm border p-4 md:min-w-[250px]">
      <p className="">Список задач:</p>
      {Array.from({ length: props.length }, (_, index) => (
        <Button
          key={index}
          onClick={() => props.onClick(index)}
          className={twMerge(
            "rounded-sm border bg-transparent text-black hover:bg-neutral-200",
            props.current === index &&
              "border-blue-400 bg-blue-400 text-white hover:bg-blue-400",
          )}
        >{`Задача №${index + 1}`}</Button>
      ))}
      <div className="relative">
        <ButtonAdd
          className={"flex w-full items-center justify-center"}
          onClick={() => setShowAddModal(!showAddModal)}
        />
        {showAddModal && (
          <div className="absolute right-0 top-full mt-1 flex min-w-[230px] flex-col gap-2 rounded-sm bg-neutral-200 p-3">
            <Button
              className="w-full rounded-sm bg-blue-400 text-white hover:bg-blue-500"
              onClick={() => onCreate("input")}
            >
              Поле ввода
            </Button>
            <Button
              className="w-full rounded-sm bg-blue-400 text-white hover:bg-blue-500"
              onClick={() => onCreate("radio")}
            >
              Один ответ
            </Button>
            <Button
              className="w-full rounded-sm bg-blue-400 text-white hover:bg-blue-500"
              onClick={() => onCreate("checkbox")}
            >
              Несколько ответов
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsListCreate;
