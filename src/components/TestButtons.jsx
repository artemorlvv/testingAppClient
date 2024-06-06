import React from "react";
import Button from "../ui/Button";

const TestButtons = (props) => {
  return (
    <div className="flex w-full gap-2">
      <Button
        className={`w-full ${props.firstQuestion && "invisible"}`}
        onClick={props.onPrev}
      >
        Назад
      </Button>
      <Button
        className={`w-full ${props.lastQuestion && props.hideLast ? "invisible" : null}`}
        onClick={props.onNext}
      >
        {props.lastQuestion ? "Завершить" : "Вперед"}
      </Button>
    </div>
  );
};

export default TestButtons;
