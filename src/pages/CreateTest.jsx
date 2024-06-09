import React, { useEffect, useState } from "react";
import InputText from "../ui/InputText";
import QuestionsListCreate from "../components/QuestionsListCreate";
import Button from "../ui/Button";
import RadioQuestionCreate from "../components/RadioQuestionCreate";
import CheckboxQuestionCreate from "../components/CheckboxQuestionCreate";
import closeImg from "../assets/close.svg";
import { authApi } from "../api";
import { Link } from "react-router-dom";

const CreateTest = () => {
  const [title, setTitle] = useState("");
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdId, setCreatedId] = useState(null);

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
    } else if (type === "checkbox") {
      setQuestions([
        ...questions,
        { question_type: "checkbox", question_text: "", options: [] },
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

  const handleOptionAdd = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionNumber].options.push({
      option_text: "",
      is_correct: false,
    });
    setQuestions(updatedQuestions);
  };

  const handleOptionTextChange = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionNumber].options[index].option_text = text;
    setQuestions(updatedQuestions);
  };

  const handleRadioClick = (index) => {
    const updatedQuestions = [...questions];
    const currentOptions = updatedQuestions[currentQuestionNumber].options;

    currentOptions.forEach((option, i) => {
      option.is_correct = i === index;
    });

    setQuestions(updatedQuestions);
  };

  const handleCheckboxClick = (index) => {
    const updatedQuestions = [...questions];
    let currentOption =
      updatedQuestions[currentQuestionNumber].options[index].is_correct;
    updatedQuestions[currentQuestionNumber].options[index].is_correct =
      !currentOption;

    setQuestions(updatedQuestions);
  };

  const handleOptionDelete = (index) => {
    const updatedQuestions = [...questions];
    const currentOptions = updatedQuestions[currentQuestionNumber].options;

    currentOptions.splice(index, 1);

    setQuestions(updatedQuestions);
  };

  const handleMoveOptionUp = (index) => {
    if (index > 0) {
      const updatedQuestions = [...questions];
      const currentOptions = updatedQuestions[currentQuestionNumber].options;

      [currentOptions[index - 1], currentOptions[index]] = [
        currentOptions[index],
        currentOptions[index - 1],
      ];

      setQuestions(updatedQuestions);
    }
  };

  const handleMoveOptionDown = (index) => {
    const updatedQuestions = [...questions];
    const currentOptions = updatedQuestions[currentQuestionNumber].options;

    if (index < currentOptions.length - 1) {
      [currentOptions[index], currentOptions[index + 1]] = [
        currentOptions[index + 1],
        currentOptions[index],
      ];

      setQuestions(updatedQuestions);
    }
  };

  const handleDeleteQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(currentQuestionNumber, 1);
    setQuestions(updatedQuestions);
    setCurrentQuestionNumber(0);
  };

  const createError = (errorMessage) => {
    setError(errorMessage);
  };

  const closeError = () => {
    setError(null);
  };

  const handleCreateTest = async () => {
    if (loading) return;
    setLoading(true);
    let isError = false;
    try {
      if (title.trim() === "") return createError("Введите название теста");
      questions.forEach((question, index) => {
        if (question.question_text.trim() === "") {
          isError = true;
          return createError(`Введите текст вопроса в задаче №${index + 1}`);
        }
        if (question.question_type === "input") {
          if (question.correct_answer.trim() === "") {
            isError = true;
            return createError(
              `Введите правильный ответ в задаче №${index + 1}`,
            );
          }
        } else if (question.question_type === "radio") {
          if (question.options.length < 2) {
            isError = true;
            return createError(
              `В задаче №${index + 1} менее двух вариантов ответов`,
            );
          }
          question.options.forEach((option) => {
            if (option.option_text.trim() === "") {
              isError = true;
              return createError(
                `В задаче №${index + 1} присутствуют пустые варианты ответов`,
              );
            }
          });
          if (isError) return;
          const hasCorrectOption = question.options.some(
            (option) => option.is_correct === true,
          );
          if (!hasCorrectOption) {
            isError = true;
            return createError(
              `В задаче №${index + 1} не выбран правильный ответ`,
            );
          }
        } else if (question.question_type === "checkbox") {
          if (question.options.length < 2) {
            isError = true;
            return createError(
              `В задаче №${index + 1} менее двух вариантов ответов`,
            );
          }
          question.options.forEach((option) => {
            if (option.option_text.trim() === "") {
              isError = true;
              return createError(
                `В задаче №${index + 1} присутствуют пустые варианты ответов`,
              );
            }
          });
          if (isError) return;
          const hasCorrectOption = question.options.some(
            (option) => option.is_correct === true,
          );
          if (!hasCorrectOption) {
            isError = true;
            return createError(
              `В задаче №${index + 1} не выбраны правильныe ответы`,
            );
          }
        }
      });
      if (isError) return;
      const res = await authApi.post(
        "/api/test/create",
        { title, questions },
        { withCredentials: true },
      );
      setCreatedId(res.data.id);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      {createdId && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-neutral-400/50">
          <div className="flex flex-col gap-2 rounded-lg bg-white p-4">
            <p className="mb-2 text-2xl">Тест успешно создан</p>
            <Link to={`/test/${createdId}`}>
              <Button className={"w-full"}>Пройти тест</Button>
            </Link>
            <Link to={`/test/results/${createdId}`}>
              <Button className={"w-full"}>Страница теста</Button>
            </Link>
            <Link to="/test/my">
              <Button className={"w-full"}>Мои тесты</Button>
            </Link>
            <Link to="/">
              <Button className={"w-full"}>На главную</Button>
            </Link>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute left-1/2 top-4 flex w-full max-w-[400px] -translate-x-1/2 items-center justify-between gap-2 rounded-md bg-red-400 py-2 pl-4 pr-2 text-white">
          <div className="flex flex-col">
            <p>Ошибка:</p>
            <p className="">{error}</p>
          </div>
          <button
            className="min-h-6 min-w-6 self-baseline rounded-sm p-1 hover:bg-red-500"
            onClick={closeError}
          >
            <img src={closeImg} />
          </button>
        </div>
      )}
      <div className="flex  gap-2 rounded-sm border px-4 py-2">
        <div className="grow">
          <InputText
            className={"w-full"}
            placeholder={"Название теста..."}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {questions.length > 0 && (
          <Button onClick={handleCreateTest}>Опубликовать</Button>
        )}
      </div>
      {questions[currentQuestionNumber] && (
        <div className="flex flex-col gap-2 rounded-sm border px-4 py-2">
          <div className="flex gap-2">
            <p className="w-max self-end border-b-2 border-neutral-800">{`Задача №${currentQuestionNumber + 1}`}</p>
            <Button
              className="bg-red-400 text-base hover:bg-red-500"
              onClick={handleDeleteQuestion}
            >
              Удалить
            </Button>
          </div>
          <InputText
            className={"w-full max-w-[750px]"}
            placeholder="Текст задачи..."
            value={questions[currentQuestionNumber]?.question_text}
            onChange={(e) => handleQuestionTextChange(e.target.value)}
          />
        </div>
      )}
      <div className="flex grow flex-col gap-2 sm:flex-row">
        <div className="flex grow flex-col gap-2 rounded-sm border px-4 py-2">
          {!questions[currentQuestionNumber] && (
            <div className="flex grow items-center justify-center">
              <p>Создайте первый вопрос</p>
            </div>
          )}
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
              onAdd={handleOptionAdd}
              options={questions[currentQuestionNumber]?.options}
              onChange={handleOptionTextChange}
              onClick={handleRadioClick}
              onDelete={handleOptionDelete}
              onMoveUp={handleMoveOptionUp}
              onMoveDown={handleMoveOptionDown}
            />
          ) : null}
          {questions[currentQuestionNumber]?.question_type === "checkbox" ? (
            <CheckboxQuestionCreate
              onAdd={handleOptionAdd}
              options={questions[currentQuestionNumber]?.options}
              onChange={handleOptionTextChange}
              onClick={handleCheckboxClick}
              onDelete={handleOptionDelete}
              onMoveUp={handleMoveOptionUp}
              onMoveDown={handleMoveOptionDown}
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
