import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8002/api"
      : "/api",
  withCredentials: true,
});

export default axiosInstance;
