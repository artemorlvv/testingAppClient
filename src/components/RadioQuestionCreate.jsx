import React from "react";
import ButtonAdd from "./ButtonAdd";
import RadioButtonCreate from "./RadioButtonCreate";

const RadioQuestionCreate = (props) => {
  return (
    <div>
      <p className="">Варианты ответов:</p>
      {props.options.map((option, index) => (
        <RadioButtonCreate
          key={index}
          text={option.option_text}
          onInputChange={(e) => console.log(e.target.value)}
        />
      ))}
      <ButtonAdd className={"self-start"} onClick={props.onAdd} />
    </div>
  );
};

export default RadioQuestionCreate;
