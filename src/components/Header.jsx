import React from "react";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { useStore } from "../store";
import AuthApi from "../api/AuthApi";
import Button from "../ui/Button";
import adminImg from "../assets/admin.svg";
// import testImg from "../assets/test.svg";
import testImg from "../assets/test2.svg";

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
      <div className="wrap flex items-center gap-2">
        {role === "ADMIN" && (
          <Link to="/admin">
            <Button className="bg-neutral-200 p-2 hover:bg-neutral-300">
              <img src={adminImg} />
            </Button>
          </Link>
        )}
        {(role === "TEACHER" || role === "ADMIN") && (
          <Link to="/test/my">
            <Button className="bg-neutral-200 p-2 hover:bg-neutral-300">
              <img src={testImg} />
            </Button>
          </Link>
        )}
        <UserButton onLogout={logout} fullName={fullName} />
      </div>
    </div>
  );
};

export default Header;
