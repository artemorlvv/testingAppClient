import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { authApi } from "../api";
import BorderContainer from "../components/BorderContainer";
import ResultsTable from "../components/ResultsTable";
import InputText from "../ui/InputText";
import Button from "../ui/Button";
import PageNavigation from "../components/PageNavigation";

const TestResults = (props) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [testInfo, setTestInfo] = useState(null);
  const [results, setResults] = useState(null);
  const [searchParams, setSearchParams] = useState({
    first_name: "",
    second_name: "",
    login: "",
    dateOrder: "DESC",
    scoreOrder: "",
  });
  const [totalPages, setTotalPages] = useState(0);

  const handleClear = () => {
    const updatedSearchParams = { ...searchParams };
    updatedSearchParams.first_name = "";
    updatedSearchParams.second_name = "";
    updatedSearchParams.login = "";
    setSearchParams(updatedSearchParams);
  };

  const fetchResults = async (data, pageNum) => {
    if (isLoading) return;
    if (isFetchingResults) return;
    try {
      setIsFetchingResults(true);
      const res = await authApi.post(
        `/api/test/results/${id}?page=${pageNum || page}`,
        data || searchParams,
        {
          withCredentials: true,
        },
      );
      setResults(res.data.results);
      setTotalPages(res.data.totalPages);
      setPage(pageNum || 1);
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetchingResults(false);
    }
  };

  const handlePageClick = (pageNum) => {
    if (isLoading) return;
    if (isFetchingResults) return;
    fetchResults(searchParams, pageNum);
  };

  const handleSearchInputChange = (e) => {
    const updatedSearchParams = { ...searchParams };
    updatedSearchParams[e.target.name] = e.target.value;
    setSearchParams(updatedSearchParams);
  };

  const handleScoreClick = () => {
    const updatedSearchParams = { ...searchParams };
    updatedSearchParams.dateOrder = "";
    if (updatedSearchParams.scoreOrder === "DESC")
      updatedSearchParams.scoreOrder = "ASC";
    else updatedSearchParams.scoreOrder = "DESC";
    setSearchParams(updatedSearchParams);
    fetchResults(updatedSearchParams);
  };

  const handleDateClick = () => {
    const updatedSearchParams = { ...searchParams };
    updatedSearchParams.scoreOrder = "";
    if (updatedSearchParams.dateOrder === "DESC")
      updatedSearchParams.dateOrder = "ASC";
    else updatedSearchParams.dateOrder = "DESC";
    setSearchParams(updatedSearchParams);
    fetchResults(updatedSearchParams);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const res = await authApi.get(`/api/test/results/${id}`, {
          withCredentials: true,
        });
        setTestInfo(res.data);
        setResults(res.data.results);
        setTotalPages(res.data.totalPages);
        setPage(1);
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
        <BorderContainer>
          <p>
            <span className="mr-2 text-neutral-500">Название теста:</span>
            {testInfo.testTitle}
          </p>
        </BorderContainer>
        <BorderContainer>
          <p>
            <span className="mr-2 text-neutral-500">Количество вопросов:</span>
            {testInfo.questionCount}
          </p>
        </BorderContainer>
        <BorderContainer>
          <p>
            <span className="mr-2 text-neutral-500">
              Количество сдавших тест:
            </span>
            {testInfo.passedCount}
          </p>
        </BorderContainer>
      </div>
      <p className="mt-2 text-2xl">Результаты:</p>
      <div className="flex items-center gap-2">
        <InputText
          placeholder="Логин..."
          value={searchParams.login}
          name="login"
          onChange={handleSearchInputChange}
        />
        <InputText
          placeholder="Имя..."
          value={searchParams.first_name}
          name="first_name"
          onChange={handleSearchInputChange}
        />
        <InputText
          placeholder="Фамилия..."
          value={searchParams.second_name}
          name="second_name"
          onChange={handleSearchInputChange}
        />
        <Button onClick={() => fetchResults()}>Поиск</Button>
        <Button onClick={handleClear}>Очистить</Button>
      </div>
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <ResultsTable
            results={results}
            dateOrder={searchParams.dateOrder}
            scoreOrder={searchParams.scoreOrder}
            onScoreClick={handleScoreClick}
            onDateClick={handleDateClick}
          />
        </div>
      </div>
      {totalPages > 1 && (
        <PageNavigation
          totalPages={totalPages}
          currentPage={page}
          onPageClick={handlePageClick}
        />
      )}
    </div>
  );
};

export default TestResults;
