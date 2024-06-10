import React, { useState } from "react";
import { useStore } from "../store";
import Button from "../ui/Button";
import Th from "../components/Th";
import sortDescImg from "../assets/sort_desc.svg";
import sortAscImg from "../assets/sort_asc.svg";
import InputText from "../ui/InputText";
import Dropdown from "../components/Dropdown";
import { authApi } from "../api";
import PageNavigation from "../components/PageNavigation";
import Td from "../components/Td";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";

const Home = () => {
  const [tests, setTests] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortParams, setSortParams] = useState({
    title: "",
    first_name: "",
    second_name: "",
    result: "",
    dateOrder: "DESC",
  });
  const resultTypes = {
    passed: "Пройденные",
    notPassed: "Не пройденные",
  };

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

    const url = `/api/test?${queryParams.toString()}`;

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

  const handleInputChange = (e) => {
    const updatedSortParams = { ...sortParams };
    updatedSortParams[e.target.name] = e.target.value;
    setSortParams(updatedSortParams);
  };

  const handleClear = () => {
    const updatedSortParams = { ...sortParams };
    updatedSortParams.title = "";
    updatedSortParams.first_name = "";
    updatedSortParams.second_name = "";
    updatedSortParams.result = "";
    setSortParams(updatedSortParams);
  };

  const handleSortRoleChange = (key) => {
    const updatedSortParams = { ...sortParams };
    updatedSortParams.result = key;
    setSortParams(updatedSortParams);
  };

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      <h1 className="mb-2 text-2xl">Тесты</h1>
      <p className="text-xl">{`Найдено: ${totalResults}`}</p>
      <div className="flex items-center gap-2">
        <InputText
          placeholder="Название..."
          name="title"
          value={sortParams.title}
          onChange={handleInputChange}
        />
        <InputText
          placeholder="Имя автора..."
          name="first_name"
          value={sortParams.first_name}
          onChange={handleInputChange}
        />
        <InputText
          placeholder="Фамилия автора..."
          name="second_name"
          value={sortParams.second_name}
          onChange={handleInputChange}
        />
        <Dropdown
          className="min-w-[186px] justify-between"
          options={resultTypes}
          active={sortParams.result}
          nullValue={"Все"}
          onChange={handleSortRoleChange}
        />

        <Button onClick={() => fetchTests()}>Поиск</Button>

        <Button onClick={handleClear}>Очистить</Button>
      </div>
      <table>
        <thead>
          <tr>
            <Th>Название</Th>
            <Th>Автор</Th>
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
            <Th>Правильных ответов</Th>
            <Th>Ссылка</Th>
          </tr>
        </thead>
        {tests.length > 0 && (
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <Td>{test.title}</Td>
                <Td>{`${test.User.first_name} ${test.User.second_name}`}</Td>
                <Td>{formatDate(test.created_at)}</Td>
                <Td>
                  {test.Results[0]
                    ? `${test.Results[0].score} из ${test.Questions.length}`
                    : "Тест не пройден"}
                </Td>
                <Td>
                  <Link
                    className="text-blue-500 hover:underline"
                    to={`/test/${test.id}`}
                  >
                    Перейти
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {!tests.length && (
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

export default Home;
