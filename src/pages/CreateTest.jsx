import React, { useState } from "react";
import InputText from "../ui/InputText";
import QuestionsListCreate from "../components/QuestionsListCreate";
import Button from "../ui/Button";
import ButtonAdd from "../components/ButtonAdd";
import RadioQuestionCreate from "../components/RadioQuestionCreate";

const CreateTest = () => {
  const [title, setTitle] = useState("");
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);

  const onCreateQuestion = (type) => {
    if (type === "input") {
      setQuestions([
        ...questions,
        { question_type: "input", question_text: "", correct_answer: "" },
      ]);
    } else if (type === "radio") {
      setQuestions([
        ...questions,
        { question_type: "radio", question_text: "", options: [] },
      ]);
    }
    setCurrentQuestionNumber(questions.length);
  };

  const handleQuestionTextChange = (text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionNumber].question_text = text;
    setQuestions(updatedQuestions);
  };

  const handleInputAnswerChange = (text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionNumber].correct_answer = text;
    setQuestions(updatedQuestions);
  };

  const handleRadioOptionAdd = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionNumber].options.push({
      option_text: "",
      is_correct: false,
    });
    setQuestions(updatedQuestions);
  };

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      <div className="rounded-sm border px-4 py-2">
        <InputText
          className={"w-full max-w-[500px]"}
          placeholder={"Название теста..."}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 rounded-sm border px-4 py-2">
        {questions[currentQuestionNumber] ? (
          <>
            <p className="w-max border-b-2 border-neutral-800">{`Задача №${currentQuestionNumber + 1}`}</p>
            <InputText
              className={"w-full max-w-[750px]"}
              placeholder="Текст задачи..."
              value={questions[currentQuestionNumber]?.question_text}
              onChange={(e) => handleQuestionTextChange(e.target.value)}
            />
          </>
        ) : (
          <p>Создайте первый вопрос</p>
        )}
      </div>
      <div className="flex grow gap-2">
        <div className="flex grow flex-col gap-2 rounded-sm border px-4 py-2">
          {questions[currentQuestionNumber]?.question_type === "input" ? (
            <>
              <p>Правильный ответ:</p>
              <InputText
                className={"w-full max-w-[500px]"}
                value={questions[currentQuestionNumber]?.correct_answer}
                onChange={(e) => handleInputAnswerChange(e.target.value)}
              />
            </>
          ) : null}
          {questions[currentQuestionNumber]?.question_type === "radio" ? (
            <RadioQuestionCreate
              onAdd={handleRadioOptionAdd}
              options={questions[currentQuestionNumber]?.options}
            />
          ) : null}
        </div>
        <QuestionsListCreate
          length={questions.length}
          current={currentQuestionNumber}
          onCreate={onCreateQuestion}
          onClick={(num) => setCurrentQuestionNumber(num)}
        />
      </div>
    </div>
  );
};

export default CreateTest;
