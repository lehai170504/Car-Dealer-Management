import axios, { AxiosError } from "axios";
import {
  refreshToken as refreshTokenAPI,
  logout,
} from "@/services/auth/authService";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sdn-be-1htr.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ==================== Refresh queue để tránh gọi nhiều lần ====================
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

// ==================== Request Interceptor ====================
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== Response Interceptor ====================
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // ✅ Nếu gặp lỗi 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Nếu đang refresh → đợi cho tới khi refresh xong
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            if (typeof newToken === "string") {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Bắt đầu refresh
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshed = await refreshTokenAPI();
        const newToken = refreshed.token;
        const newRefreshToken = refreshed.refreshToken;

        // ✅ Cập nhật localStorage & header
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", newToken);
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        console.error("❌ Refresh token failed, logging out...", refreshError);
        processQueue(refreshError as AxiosError, null);

        // Gọi logout API nếu có thể
        try {
          await logout();
        } catch (err) {
          console.warn("Logout after refresh fail:", err);
        }

        // Xóa token & redirect login
        if (typeof window !== "undefined") {
          localStorage.clear();
          window.location.href = "/auth/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ❌ Nếu không phải lỗi 401 → trả lỗi gốc
    return Promise.reject(error);
  }
);

export default axiosInstance;
