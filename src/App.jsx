import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useStore } from "./store";
import Auth from "./pages/Auth";
import AuthApi from "./api/AuthApi";
import Test from "./pages/Test";
import Layout from "./components/Layout";

const App = () => {
  const isAuth = useStore((state) => state.isAuth);
  const setIsAuth = useStore((state) => state.setIsAuth);
  const setRole = useStore((state) => state.setRole);
  const setLogin = useStore((state) => state.setLogin);
  const setFullName = useStore((state) => state.setFullName);

  useEffect(() => {
    if (!localStorage.token) return;
    try {
      const auth = async () => {
        const res = await AuthApi.auth();
        setRole(res.data.role);
        setLogin(res.data.login);
        setFullName(res.data.first_name + " " + res.data.second_name);
        setIsAuth(true);
      };
      auth();
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (!isAuth) return <Auth />;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="test/:testId" element={<Test />} />
      </Route>
    </Routes>
  );
};

export default App;
