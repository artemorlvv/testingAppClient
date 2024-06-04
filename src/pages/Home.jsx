import React from "react";
import { useStore } from "../store";
import Button from "../ui/Button";
import TestsList from "../components/TestsList";

const Home = () => {
  const login = useStore((state) => state.login);
  const role = useStore((state) => state.role);
  const fullName = useStore((state) => state.fullName);

  return (
    <div>
      <p>Логин: {login}</p>
      <p>Роль: {role}</p>
      <p>Имя и фамилия: {fullName}</p>
      <TestsList />
    </div>
  );
};

export default Home;
