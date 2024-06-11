import React, { useEffect, useState } from "react";
import { authApi } from "../api";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import InputText from "../ui/InputText";
import LoadingAnimation from "../components/LoadingAnimation";
import PageNavigation from "../components/PageNavigation";
import Th from "../components/Th";
import sortDescImg from "../assets/sort_desc.svg";
import sortAscImg from "../assets/sort_asc.svg";
import Td from "../components/Td";
import { formatDate } from "../utils";

const MyTests = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [tests, setTests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortParams, setSortParams] = useState({
    title: "",
    dateOrder: "DESC",
  });

  const fetchTests = async (params, pageNum) => {
    if (isFetching) return;
    setIsFetching(true);
    const newParams = params || sortParams;
    const queryParams = new URLSearchParams();

    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        if (newParams[key].trim() !== "") {
          queryParams.append(key, newParams[key]);
        }
      }
    });
    queryParams.set("page", pageNum || 1);

    const url = `/api/test/my?${queryParams.toString()}`;

    try {
      const res = await authApi.get(url, { withCredentials: true });
      setTests(res.data.tests);
      setTotalPages(res.data.totalPages);
      setTotalResults(res.data.count);
      setCurrentPage(pageNum || 1);
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

  const handlePageClick = (num) => {
    fetchTests(sortParams, num);
  };

  const handleInputChange = (e) => {
    const updatedSortParams = { ...sortParams };
    updatedSortParams[e.target.name] = e.target.value;
    setSortParams(updatedSortParams);
  };

  const handleClear = () => {
    const updatedSortParams = { ...sortParams };
    updatedSortParams.title = "";
    setSortParams(updatedSortParams);
  };

  const handleDateClick = () => {
    if (isFetching) return;
    const updatedSortParams = { ...sortParams };
    if (updatedSortParams.dateOrder === "DESC") {
      updatedSortParams.dateOrder = "ASC";
    } else {
      updatedSortParams.dateOrder = "DESC";
    }
    setSortParams(updatedSortParams);
    fetchTests(updatedSortParams);
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      <h1 className="mb-2 text-2xl">Мои тесты</h1>
      <Link to={"/test/create"} className="self-start">
        <Button className={"flex w-full items-center gap-1"}>
          <span className="text-xl">+</span>Новый
        </Button>
      </Link>
      <h2 className="text-xl">{`Тестов найдено: ${totalResults}`}</h2>
      <div className="flex items-center gap-2">
        <InputText
          placeholder="Название..."
          name="title"
          value={sortParams.title}
          onChange={handleInputChange}
        />

        <Button
          onClick={() => fetchTests()}
          className={"relative overflow-hidden"}
        >
          <span>Поиск</span>
          {isFetching && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-blue-400">
              <LoadingAnimation className="invert" />
            </div>
          )}
        </Button>

        <Button onClick={handleClear}>Очистить</Button>
      </div>
      <table>
        <thead>
          <tr>
            <Th>Название</Th>
            <Th>
              <div className="flex justify-center">
                <Button
                  className={
                    "flex gap-2 rounded-sm bg-neutral-200 text-black hover:bg-neutral-300"
                  }
                  onClick={() => handleDateClick()}
                >
                  <span>Дата создания</span>
                  <img
                    src={
                      sortParams.dateOrder === "DESC" ? sortDescImg : sortAscImg
                    }
                  />
                </Button>
              </div>
            </Th>
            <Th>Количество вопросов</Th>
            <Th>Количество сдавших</Th>
            <Th>Подробнее</Th>
          </tr>
        </thead>
        <tbody>
          {tests.length > 0 &&
            tests.map((test) => (
              <tr key={test.id}>
                <Td>{test.title}</Td>
                <Td>{formatDate(test.created_at)}</Td>
                <Td>{test.Questions.length}</Td>
                <Td>{test.Results.length}</Td>
                <Td>
                  <Link
                    className="text-blue-500 hover:underline"
                    to={`/test/results/${test.id}`}
                  >
                    Перейти
                  </Link>
                </Td>
              </tr>
            ))}
        </tbody>
      </table>
      {!tests.length && !isFetching && (
        <div className="flex w-full justify-center">
          <p>Тесты не найдены</p>
        </div>
      )}
      {totalPages > 1 && (
        <PageNavigation
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={handlePageClick}
        />
      )}
    </div>
  );
};

export default MyTests;
