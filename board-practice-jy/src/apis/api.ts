import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_COMMERCE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});