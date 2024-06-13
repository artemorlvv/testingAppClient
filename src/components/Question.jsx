import React, { useMemo } from "react";
import RadioButton from "./RadioButton";
import { useStore } from "../store";
import Checkbox from "./Checkbox";
import InputText from "../ui/InputText";

const Question = (props) => {
  const selectedOptions = useStore((state) => state.selectedOptions);
  const correctAnswers = useStore((state) => state.correctAnswers);
  const setRadioSelectedOption = useStore(
    (state) => state.setRadioSelectedOption,
  );
  const setCheckboxSelectedOption = useStore(
    (state) => state.setCheckboxSelectedOption,
  );

  const questionType = useMemo(
    () => props.question.question_type,
    [props.question],
  );

  const onRadioButtonClick = (optionId) => {
    if (props.isFinished) return;
    setRadioSelectedOption(props.question.id, optionId);
  };

  const onCheckboxButtonClick = (optionId) => {
    if (props.isFinished) return;
    setCheckboxSelectedOption(props.question.id, optionId);
  };

  if (questionType === "radio") {
    return (
      <div className="flex grow flex-col gap-2 rounded-sm border px-6 py-4">
        {props.isFinished && props.answersVisible && (
          <p>Ответ, который был правильным выделен синим цветом</p>
        )}
        {props.question.options.map((option, index) => (
          <RadioButton
            disabled={props.isFinished}
            text={option.option_text}
            key={index}
            active={selectedOptions[props.question.id] === option.id}
            correct={correctAnswers[props.question.id] === option.id}
            answersVisible={props.answersVisible}
            onClick={() => onRadioButtonClick(option.id)}
          />
        ))}
      </div>
    );
  }

  if (questionType === "checkbox") {
    return (
      <div className="flex grow flex-col gap-2 rounded-sm border px-6 py-4">
        {props.isFinished && props.answersVisible && (
          <p>Ответы, которые были правильными выделены синим цветом</p>
        )}
        {props.question.options.map((option, index) => (
          <Checkbox
            disabled={props.isFinished}
            text={option.option_text}
            key={index}
            active={selectedOptions[props.question.id]?.includes(option.id)}
            correct={correctAnswers[props.question.id]?.includes(option.id)}
            answersVisible={props.answersVisible}
            onClick={() => onCheckboxButtonClick(option.id)}
          />
        ))}
      </div>
    );
  }

  if (questionType === "input") {
    return (
      <div className="flex grow flex-col gap-2 rounded-sm border px-6 py-4">
        {props.isFinished && props.answersVisible && (
          <p>
            Правильный ответ:{" "}
            <span className="font-semibold">
              {correctAnswers[props.question.id]}
            </span>
          </p>
        )}
        <InputText
          disabled={props.isFinished}
          className={props.isFinished && "hover:border-neutral-300"}
          value={selectedOptions[props.question.id] || ""}
          onChange={(e) => onRadioButtonClick(e.target.value)}
          placeholder={"Ответ..."}
        />
      </div>
    );
  }

  return (
    <div className="flex grow rounded-sm border px-6 py-4">
      <div>ВОПРОС</div>
    </div>
  );
};

export default Question;
