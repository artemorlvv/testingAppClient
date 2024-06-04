import React from "react";

const QuestionText = (props) => {
  return (
    <div className="rounded-sm border px-6 py-4">
      <p className="w-max border-b-2 border-neutral-800">{`Задача №${props.questionNumber + 1}`}</p>
      <p className="mt-2 text-xl">{props.question.question_text}</p>
    </div>
  );
};

export default QuestionText;
