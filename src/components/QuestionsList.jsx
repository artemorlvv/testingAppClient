import React from "react";
import Button from "../ui/Button";
import { twMerge } from "tailwind-merge";

const QuestionsList = (props) => {
  return (
    <div className="flex h-min flex-col gap-2 rounded-sm border p-4">
      <p className="">Список задач:</p>
      {props.questions.map((q, index) => (
        <Button
          key={index}
          onClick={() => props.onClick(index)}
          className={twMerge(
            "rounded-sm border bg-transparent text-black hover:bg-neutral-200",
            props.questionNumber === index &&
              "border-blue-400 bg-blue-400 text-white hover:bg-blue-400",
            props.isFinished &&
              props.correctOptions[q.id] &&
              props.answersVisible
              ? "outline outline-2 outline-green-400"
              : null,
            props.isFinished &&
              !props.correctOptions[q.id] &&
              props.answersVisible
              ? "outline outline-2 outline-red-400"
              : null,
          )}
        >{`Задача №${index + 1}`}</Button>
      ))}
    </div>
  );
};

export default QuestionsList;
