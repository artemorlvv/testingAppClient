import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { authApi } from "../api";
import Th from "../components/Th";
import Td from "../components/Td";
import { formatDate } from "../utils";
import sortDescImg from "../assets/sort_desc.svg";
import sortAscImg from "../assets/sort_asc.svg";
import Button from "../ui/Button";
import InputText from "../ui/InputText";
import PageNavigation from "../components/PageNavigation";
import Dropdown from "../components/Dropdown";

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortParams, setSortParams] = useState({
    login: "",
    first_name: "",
    second_name: "",
    role: "",
    dateOrder: "DESC",
  });
  const roles = {
    USER: "Пользователь",
    TEACHER: "Преподаватель",
    ADMIN: "Администратор",
  };

  const fetchUsers = async (params, pageNum) => {
    if (isLoading) return;
    setIsLoading(true);
    const newParams = params || sortParams;
    const queryParams = new URLSearchParams();

    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        if (
          typeof newParams[key] === "string" &&
          newParams[key].trim() !== ""
        ) {
          queryParams.append(key, newParams[key]);
        } else if (typeof newParams[key] !== "string") {
          queryParams.append(key, newParams[key]);
        }
      }
    });
    queryParams.set("page", pageNum || 1);

    const url = `/api/user/all?${queryParams.toString()}`;

    try {
      const res = await authApi.get(url, { withCredentials: true });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setTotalUsers(res.data.count);
      setCurrentPage(pageNum || 1);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const updatedSortParams = { ...sortParams };
    updatedSortParams[e.target.name] = e.target.value;
    setSortParams(updatedSortParams);
  };

  const handleDateClick = () => {
    if (isLoading) return;
    const updatedSortParams = { ...sortParams };
    if (updatedSortParams.dateOrder === "DESC") {
      updatedSortParams.dateOrder = "ASC";
    } else {
      updatedSortParams.dateOrder = "DESC";
    }
    setSortParams(updatedSortParams);
    fetchUsers(updatedSortParams);
  };

  const handleClear = () => {
    const updatedSortParams = { ...sortParams };
    updatedSortParams.login = "";
    updatedSortParams.first_name = "";
    updatedSortParams.second_name = "";
    updatedSortParams.role = "";
    setSortParams(updatedSortParams);
  };

  const handlePageClick = (num) => {
    fetchUsers(sortParams, num);
  };

  const handleSortRoleChange = (key) => {
    const updatedSortParams = { ...sortParams };
    updatedSortParams.role = key;
    setSortParams(updatedSortParams);
  };

  const handleRoleChange = async (index, userId, role) => {
    try {
      await authApi.post(
        "/api/user/change_role",
        { userId, role },
        { withCredentials: true },
      );
      const updatedUsers = [...users];
      updatedUsers[index].role = role;
      setUsers(updatedUsers);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      <h1 className="text-2xl">Панель администратора</h1>
      <h2 className="mt-2 text-xl">{`Найдено пользователей: ${totalUsers}`}</h2>
      <div className="flex items-center gap-2">
        <InputText
          placeholder="Логин..."
          name="login"
          value={sortParams.login}
          onChange={handleInputChange}
        />
        <InputText
          placeholder="Имя..."
          name="first_name"
          value={sortParams.first_name}
          onChange={handleInputChange}
        />
        <InputText
          placeholder="Фамилия..."
          name="second_name"
          value={sortParams.second_name}
          onChange={handleInputChange}
        />

        <Dropdown
          className="min-w-[187px]"
          options={roles}
          active={sortParams.role}
          nullValue={"Все"}
          onChange={handleSortRoleChange}
        />

        <Button onClick={() => fetchUsers()}>Поиск</Button>
        <Button onClick={handleClear}>Очистить</Button>
      </div>
      <table>
        <thead>
          <tr>
            <Th className="">id</Th>
            <Th>Логин</Th>
            <Th>Имя</Th>
            <Th>Фамилия</Th>
            <Th>Роль</Th>
            <Th className="min-w-[250px]">
              <div className="flex justify-center">
                <Button
                  className={
                    "flex gap-2 rounded-sm bg-neutral-200 text-black hover:bg-neutral-300"
                  }
                  onClick={() => handleDateClick()}
                >
                  <span>Дата регистрации</span>
                  <img
                    src={
                      sortParams.dateOrder === "DESC" ? sortDescImg : sortAscImg
                    }
                  />
                </Button>
              </div>
            </Th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.login}</Td>
                <Td>{user.first_name}</Td>
                <Td>{user.second_name}</Td>
                <Td>
                  <div className="flex justify-center">
                    <Dropdown
                      options={roles}
                      active={user.role}
                      onChange={(role) =>
                        handleRoleChange(index, user.id, role)
                      }
                    />
                  </div>
                </Td>
                <Td>{formatDate(user.registration_date)}</Td>
              </tr>
            ))}
        </tbody>
      </table>
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

export default AdminPage;
