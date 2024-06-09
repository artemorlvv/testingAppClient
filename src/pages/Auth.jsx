import React, { useState } from "react";
import InputText from "../ui/InputText";
import Button from "../ui/Button";
import AuthApi from "../api/AuthApi";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const setIsAuth = useStore((state) => state.setIsAuth);
  const setRole = useStore((state) => state.setRole);
  const setLogin = useStore((state) => state.setLogin);
  const setFullName = useStore((state) => state.setFullName);
  const [isAuthorization, setIsAuthorization] = useState(true);
  const [formValues, setFormValues] = useState({
    first_name: "",
    second_name: "",
    login: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthorization) {
      if (formValues.first_name.trim() === "") {
        return setError("Введите имя");
      }
      if (formValues.second_name.trim() === "") {
        return setError("Введите фамилию");
      }
    }
    if (formValues.login.trim() === "") {
      return setError("Введите логин");
    }
    if (formValues.password.trim() === "") {
      return setError("Введите пароль");
    }
    try {
      let res = null;
      if (isAuthorization)
        res = await AuthApi.login(formValues.login, formValues.password);
      else
        res = await AuthApi.registration(
          formValues.first_name,
          formValues.second_name,
          formValues.login,
          formValues.password,
        );
      setRole(res.data.role);
      setLogin(res.data.login);
      setFullName(res.data.first_name + " " + res.data.second_name);
      setIsAuth(true);
      navigate("/");
    } catch (e) {
      console.log(e);
      const errMessage = e?.response?.data?.message;
      errMessage ? setError(errMessage) : setError("Неопознанная ошибка");
    }
  };

  const resetFormValues = () => {
    setFormValues({
      first_name: "",
      second_name: "",
      login: "",
      password: "",
    });
  };

  const toggleAuthorization = () => {
    setIsAuthorization(!isAuthorization);
    resetFormValues();
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-neutral-200 p-4">
        <h1 className="text-xl">
          {isAuthorization ? "Авторизация" : "Регистрация"}
        </h1>
        {error ? <p>{error}</p> : null}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {!isAuthorization && (
            <>
              <InputText
                label={"Имя"}
                name="first_name"
                value={formValues.first_name}
                onChange={handleInputChange}
              />
              <InputText
                label={"Фамилия"}
                name="second_name"
                value={formValues.second_name}
                onChange={handleInputChange}
              />
            </>
          )}
          <InputText
            label={"Логин"}
            name="login"
            value={formValues.login}
            onChange={handleInputChange}
          />
          <InputText
            label={"Пароль"}
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <Button type="submit">
            {isAuthorization ? "Войти" : "Продолжить"}
          </Button>
        </form>
        <p
          className="cursor-pointer self-start text-left text-base text-blue-500 hover:underline"
          onClick={toggleAuthorization}
        >
          {isAuthorization ? "Создать аккаунт" : "Войти"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
