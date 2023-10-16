import axios from "axios";
import { sessionGet } from "./session";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.authorization !== false) {
      const token = sessionGet('token');
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      } else {
        localStorage.clear();
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const baseUrl = axiosInstance;
export { baseUrl };
