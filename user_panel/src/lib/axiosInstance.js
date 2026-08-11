import axios from "axios";
import useAuthStore from "./authStore";

const API_URL =
  import.meta.env.VITE_APP_NODE_ENV === "production"
    ? import.meta.env.VITE_APP_PRODUCTION_API_URL
    : import.meta.env.VITE_APP_DEVELOPMENT_API_URL;

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
