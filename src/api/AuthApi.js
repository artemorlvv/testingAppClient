import { api, authApi } from ".";

class AuthApi {
  async registration(first_name, second_name, login, password) {
    const res = await api.post(
      "/api/user/registration",
      { first_name, second_name, login, password },
      { withCredentials: true },
    );
    localStorage.setItem("token", res.data.accessToken);
    return res;
  }

  async login(login, password) {
    const res = await api.post(
      "/api/user/login",
      { login, password },
      { withCredentials: true },
    );
    localStorage.setItem("token", res.data.accessToken);
    return res;
  }

  auth() {
    return authApi.get("/api/user/auth", { withCredentials: true });
  }

  logout() {
    localStorage.removeItem("token");
    return authApi.get("/api/user/logout", { withCredentials: true });
  }

  test() {
    return authApi.get("/api/user/test", { withCredentials: true });
  }
}

export default new AuthApi();
