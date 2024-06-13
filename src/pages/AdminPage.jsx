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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDeleteUser = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await authApi.delete("/api/user/" + deleteUserId, {
        withCredentials: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setShowDeleteModal(false);
      setIsDeleting(false);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex grow flex-col gap-2 px-4 py-2">
      {showDeleteModal && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-neutral-300/50">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-4">
            <p className="mb-2 max-w-[250px] text-center text-xl">
              Вы уверены, что хотите удалить этого пользователя?
            </p>
            <div className="flex w-full justify-center gap-2">
              <Button onClick={() => setShowDeleteModal(false)}>
                Отменить
              </Button>
              <Button
                onClick={handleDeleteUser}
                className={"bg-red-400 hover:bg-red-500"}
              >
                Удалить
              </Button>
            </div>
          </div>
        </div>
      )}
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
            <Th>Удаление</Th>
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
                <Td>
                  <Button
                    className={"bg-red-400 hover:bg-red-500"}
                    onClick={() => {
                      setDeleteUserId(user.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Удалить
                  </Button>
                </Td>
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
