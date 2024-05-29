import React from "react";
import { useStore } from "../store";
import Button from "../ui/Button";
import AuthApi from "../api/AuthApi";

const Home = () => {
  const setIsAuth = useStore((state) => state.setIsAuth);
  const login = useStore((state) => state.login);
  const role = useStore((state) => state.role);
  const fullName = useStore((state) => state.fullName);

  const logout = async () => {
    try {
      await AuthApi.logout();
      setIsAuth(false);
    } catch (e) {
      console.log(e);
    }
  };

  const testFunc = async () => {
    try {
      const res = await AuthApi.test();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p>Логин: {login}</p>
      <p>Роль: {role}</p>
      <p>Имя и фамилия: {fullName}</p>
      <Button onClick={logout}>Выйти</Button>
      <Button onClick={testFunc}>Test</Button>
    </div>
  );
};

export default Home;
