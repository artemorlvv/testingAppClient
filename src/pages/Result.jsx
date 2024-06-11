import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authApi } from "../api";
import QuestionsList from "../components/QuestionsList";
import QuestionText from "../components/QuestionText";
import Question from "../components/Question";
import { useStore } from "../store";
import TestButtons from "../components/TestButtons";
import BorderContainer from "../components/BorderContainer";

const Result = () => {
  const { id } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [testTitle, setTestTitle] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const clearSelectedOptions = useStore((state) => state.clearSelectedOptions);
  const selectedOptions = useStore((state) => state.selectedOptions);
  const setSelectedOptions = useStore((state) => state.setSelectedOptions);
  const setCorrectAnswers = useStore((state) => state.setCorrectAnswers);
  const [sendingAnswers, setSendingAnswers] = useState(false);
  const [result, setResult] = useState(null);
  const [correctOptions, setCorrectOptions] = useState({});

  useEffect(() => {
    const fetchTest = async () => {
      setLoading(true);
      clearSelectedOptions();
      try {
        const res = await authApi.get("/api/test/result/" + id, {
          withCredentials: true,
        });
        setQuestions(res.data.questions);
        setTestTitle(res.data.title);
        setUserInfo(res.data.user);
        setQuestionNumber(0);
        setResult(res.data.result);
        setSelectedOptions(res.data.userAnswers || {});
        setCorrectAnswers(res.data.correctAnswers || {});
        setCorrectOptions(res.data.correctOptions);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [id]);

  const onNext = async () => {
    if (questionNumber < questions.length - 1) {
      return setQuestionNumber(questionNumber + 1);
    }
    if (sendingAnswers) return;
    setSendingAnswers(true);
    try {
      const res = await authApi.post(
        "/api/test/check",
        { testId, selectedOptions },
        {
          withCredentials: true,
        },
      );
      setResult(res.data.result);
      setCorrectAnswers(res.data.correctAnswers || {});
      setCorrectOptions(res.data.correctOptions);
    } catch (e) {
      console.log(e);
    } finally {
      setSendingAnswers(false);
    }
  };

  if (loading) return <p>loading</p>;

  if (!questions.length) return <div>Тест не найден</div>;

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      <div className="rounded-sm border px-6 py-4">
        <h1 className="text-2xl">{testTitle}</h1>
      </div>
      <div className="flex gap-2">
        <BorderContainer>
          {`${userInfo.first_name} ${userInfo.second_name}`}
        </BorderContainer>
        <BorderContainer>{`Логин: ${userInfo.login}`}</BorderContainer>
      </div>
      <QuestionText
        question={questions[questionNumber]}
        questionNumber={questionNumber}
      />
      <div className="flex grow flex-col gap-2 sm:flex-row">
        <div className="flex flex-col gap-2 sm:grow">
          <Question
            question={questions[questionNumber]}
            isFinished={result !== null}
          />
          <TestButtons
            firstQuestion={questionNumber === 0}
            lastQuestion={questionNumber === questions.length - 1}
            onPrev={() => setQuestionNumber(questionNumber - 1)}
            onNext={onNext}
            hideLast={result ? true : false}
          />
        </div>
        <div className="flex flex-col gap-2 sm:min-w-[280px]">
          {result ? (
            <div className="rounded-sm border px-4 py-2">
              <p>Правильных ответов:</p>
              <p>{`${result.score} из ${questions.length}`}</p>
            </div>
          ) : null}
          <QuestionsList
            questions={questions}
            onClick={(num) => setQuestionNumber(num)}
            questionNumber={questionNumber}
            correctOptions={correctOptions}
            isFinished={result !== null}
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
