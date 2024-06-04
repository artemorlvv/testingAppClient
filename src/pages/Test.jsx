import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authApi } from "../api";
import QuestionsList from "../components/QuestionsList";
import QuestionText from "../components/QuestionText";
import Question from "../components/Question";
import { useStore } from "../store";

const Test = () => {
  const { testId } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [testTitle, setTestTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const clearSelectedOptions = useStore((state) => state.clearSelectedOptions);

  useEffect(() => {
    const fetchTest = async () => {
      setLoading(true);
      clearSelectedOptions();
      try {
        const res = await authApi.get("/api/test/" + testId);
        console.log(res);
        setQuestions(res.data.questions);
        setTestTitle(res.data.title);
        setQuestionNumber(0);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [testId]);

  if (loading) return <p>loading</p>;

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      <div className="rounded-sm border px-6 py-4">
        <h1 className="text-2xl">{testTitle}</h1>
      </div>
      <QuestionText
        question={questions[questionNumber]}
        questionNumber={questionNumber}
      />
      <div className="flex grow gap-2">
        <Question question={questions[questionNumber]} />
        <QuestionsList
          questions={questions}
          onClick={(num) => setQuestionNumber(num)}
          questionNumber={questionNumber}
        />
      </div>
    </div>
  );
};

export default Test;
