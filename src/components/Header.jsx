import React from "react";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { useStore } from "../store";
import AuthApi from "../api/AuthApi";

const Header = () => {
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
  return (
    <div className="flex flex-wrap items-center justify-between border-b px-4 py-2">
      <Link
        className="text-xl decoration-2 underline-offset-2 hover:underline"
        to={"/"}
      >
        Главная
      </Link>
      <UserButton onLogout={logout} fullName={fullName} />
    </div>
  );
};

export default Header;