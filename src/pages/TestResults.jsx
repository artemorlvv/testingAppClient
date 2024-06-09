import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { authApi } from "../api";
import BorderContainer from "../components/BorderContainer";
import ResultsTable from "../components/ResultsTable";

const TestResults = (props) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [testInfo, setTestInfo] = useState(null);
  const [results, setResults] = useState(null);
  const [searchParams, setSearchParams] = useState({
    first_name: "",
    second_name: "",
    login: "",
    dateOrder: "DESC",
    scoreOrder: "",
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const res = await authApi.get("/api/test/results/" + id, {
          withCredentials: true,
        });
        console.log(res.data);
        setTestInfo(res.data);
        setResults(res.data.results);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [id]);

  if (isLoading) return <Loading />;

  if (!testInfo) return <div className="px-4 py-2">Тест не найден</div>;

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      <div className="flex gap-2">
        <BorderContainer>{`Название теста: ${testInfo.testTitle}`}</BorderContainer>
        <BorderContainer>
          {`Количество вопросов: ${testInfo.questionCount}`}
        </BorderContainer>
        <BorderContainer>
          {`Количество сдавших тест: ${testInfo.questionCount}`}
        </BorderContainer>
      </div>
      <div>
        <ResultsTable results={results} />
      </div>
    </div>
  );
};

export default TestResults;
