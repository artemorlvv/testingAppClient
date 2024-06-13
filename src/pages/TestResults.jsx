import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { authApi } from "../api";
import BorderContainer from "../components/BorderContainer";
import ResultsTable from "../components/ResultsTable";
import InputText from "../ui/InputText";
import Button from "../ui/Button";
import PageNavigation from "../components/PageNavigation";
import TestStats from "../components/TestStats";
import { twMerge } from "tailwind-merge";
import Checkbox from "../components/Checkbox";

const TestResults = (props) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("results");
  const [answersVisible, setAnsversVisible] = useState(false);
  const [changingAnswersVisible, setChangingAnsversVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
  const navigate = useNavigate();

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

  const handleDeleteTest = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await authApi.delete("/api/test/" + id, { withCredentials: true });
      navigate("/test/my");
    } catch (e) {
      console.log(e);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAnswersVisibleClick = async () => {
    if (changingAnswersVisible) return;
    try {
      setChangingAnsversVisible(true);
      await authApi.put(
        "/api/test/change_answers_visible/" + id,
        { answers_visible: !answersVisible },
        { withCredentials: true },
      );
      setAnsversVisible(!answersVisible);
    } catch (e) {
      console.log(e);
    } finally {
      setChangingAnsversVisible(false);
    }
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
        setAnsversVisible(res.data.answers_visible);
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

  const Results = () => {
    return (
      <>
        {/* <p className="mt-2 text-2xl">Результаты:</p> */}
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
      </>
    );
  };

  const tabComponents = {
    results: <Results />,
    stats: <TestStats />,
  };

  if (isLoading) return <Loading />;

  if (!testInfo) return <div className="px-4 py-2">Тест не найден</div>;

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      {showDeleteModal && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-300/50">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-4">
            <p className="mb-2 max-w-[250px] text-center text-xl">
              Вы уверены, что хотите удалить этот тест?
            </p>
            <div className="flex w-full justify-center gap-2">
              <Button onClick={() => setShowDeleteModal(false)}>
                Отменить
              </Button>
              <Button
                onClick={handleDeleteTest}
                className={"bg-red-400 hover:bg-red-500"}
              >
                Удалить
              </Button>
            </div>
          </div>
        </div>
      )}
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
        <Button
          className={"bg-red-400 hover:bg-red-500"}
          onClick={() => setShowDeleteModal(true)}
        >
          Удалить
        </Button>
        <Checkbox
          active={answersVisible}
          onClick={handleAnswersVisibleClick}
          text="Показывать результаты"
          className="ml-auto"
        />
      </div>
      <div className="flex grow gap-2">
        <div className="mb-2 flex flex-col gap-2 border-r pr-2">
          <Button
            className={twMerge(
              "rounded-sm border-2 border-blue-400 bg-transparent text-black hover:border-blue-500 hover:text-white",
              currentTab === "results" && "bg-blue-400 text-white",
            )}
            onClick={() => setCurrentTab("results")}
          >
            Результаты
          </Button>
          <Button
            className={twMerge(
              "rounded-sm border-2 border-blue-400 bg-transparent text-black hover:border-blue-500 hover:text-white",
              currentTab === "stats" && "bg-blue-400 text-white",
            )}
            onClick={() => setCurrentTab("stats")}
          >
            Статистика
          </Button>
        </div>
        <div className="flex grow flex-col gap-2">
          {tabComponents[currentTab]}
        </div>
      </div>
    </div>
  );
};

export default TestResults;
