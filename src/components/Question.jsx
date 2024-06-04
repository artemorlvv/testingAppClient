import React, { useMemo } from "react";
import RadioButton from "./RadioButton";
import { useStore } from "../store";
import Checkbox from "./Checkbox";
import InputText from "../ui/InputText";

const Question = (props) => {
  const selectedOptions = useStore((state) => state.selectedOptions);
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
    setRadioSelectedOption(props.question.id, optionId);
  };

  const onCheckboxButtonClick = (optionId) => {
    setCheckboxSelectedOption(props.question.id, optionId);
  };

  if (questionType === "radio") {
    return (
      <div className="flex grow flex-col gap-2 rounded-sm border px-6 py-4">
        {props.question.options.map((option, index) => (
          <RadioButton
            text={option.option_text}
            key={index}
            active={selectedOptions[props.question.id] === option.id}
            onClick={() => onRadioButtonClick(option.id)}
          />
        ))}
      </div>
    );
  }

  if (questionType === "checkbox") {
    return (
      <div className="flex grow flex-col gap-2 rounded-sm border px-6 py-4">
        {props.question.options.map((option, index) => (
          <Checkbox
            text={option.option_text}
            key={index}
            active={selectedOptions[props.question.id]?.includes(option.id)}
            onClick={() => onCheckboxButtonClick(option.id)}
          />
        ))}
      </div>
    );
  }

  if (questionType === "input") {
    return (
      <div className="flex grow flex-col gap-2 rounded-sm border px-6 py-4">
        <InputText
          value={selectedOptions[props.question.id] || ""}
          onChange={(e) => onRadioButtonClick(e.target.value)}
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
