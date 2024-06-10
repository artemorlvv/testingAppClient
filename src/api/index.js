import axios from "axios";
const serverUrl =
  process.env.NODE_ENV === "development"
    ? import.meta.env.VITE_DEV_SERVER_URL
    : import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: serverUrl,
});

const authApi = axios.create({
  baseURL: serverUrl,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

authApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      const config = error.config;
      if (!config._again) {
        config._again = true;
        try {
          const response = await axios.get(serverUrl + "/api/user/refresh", {
            withCredentials: true,
          });
          const newToken = response.data.accessToken;

          localStorage.setItem("token", newToken);

          config.headers.Authorization = `Bearer ${newToken}`;
          return axios(config);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export { api, authApi };
