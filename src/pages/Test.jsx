import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authApi } from "../api";

const Test = () => {
  const { testId } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await authApi.get("/api/test/" + testId);
        console.log(res);
        setQuestions(res.data.questions);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTest();
  }, [testId]);

  return <div>{testId}</div>;
};

export default Test;
