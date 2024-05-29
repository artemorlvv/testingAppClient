import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

const authApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

authApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      const config = error.config
      if (!config._again) {
        config._again = true
        try {
          const response = await axios.get(
            import.meta.env.VITE_SERVER_URL + "/api/user/refresh",
            { withCredentials: true }
          )
          const newToken = response.data.accessToken

          localStorage.setItem("token", newToken)

          config.headers.Authorization = `Bearer ${newToken}`
          return axios(config)
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError)
        }
      }
    }
    return Promise.reject(error)
  }
)

export { api, authApi }
