import axios from "axios";
import { getCookie, removeCookie } from "./cookie";
import authStore from "@stores/authStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_COMMERCE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 에러 시 처리
      removeCookie("token"); // 쿠키에서 토큰 삭제
      authStore.setState({ userInfo: undefined}); // 상태 초기화
      window.location.href = "/login"; // 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  }
);
