// src/utils/axiosInstance.ts
import axios, { AxiosError } from "axios";
import { refreshToken, logout } from "@/services/auth/authService";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sdn-be-1htr.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// === Quản lý refresh queue ===
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// === Request Interceptor ===
axiosInstance.interceptors.request.use(
  (config) => {
    // ✅ Kiểm tra window (Next.js có thể render server-side)
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === Response Interceptor (Refresh Token Handling) ===
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // ✅ Chỉ xử lý lỗi 401 (Unauthorized)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Nếu đang refresh, chờ token mới rồi retry request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && typeof token === "string") {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshToken();
        const newToken = response.token;

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", newToken);
        }

        // Gán token mới cho axios mặc định
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        console.error("Refresh token failed → logging out:", refreshError);

        processQueue(refreshError as AxiosError, null);

        // ✅ Logout FE & BE an toàn
        try {
          await logout();
        } catch (err) {
          console.warn("Logout after refresh fail:", err);
        }

        // ✅ Chỉ redirect nếu đang ở client
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
