// src/utils/axiosInstance.ts

import axios, { AxiosError } from "axios";

// Đảm bảo NEXT_PUBLIC_ENV đã được định nghĩa trong file .env.local
// hoặc là giá trị mặc định nếu biến môi trường không được đặt.
const BASE_URL = process.env.NEXT_PUBLIC_ENV || "https://sdn-be-1htr.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout 10 giây
});

// === Interceptor cho Request: Tự động thêm Token ===
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// === Interceptor cho Response: Xử lý lỗi chung ===
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Nếu lỗi là 401 Unauthorized (Token hết hạn/Không hợp lệ)
    if (error.response?.status === 401) {
      // Xóa thông tin đăng nhập và chuyển hướng người dùng
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      
      // Có thể ném lỗi với một thông báo chung cho người dùng
      return Promise.reject(new Error("Phiên làm việc hết hạn. Vui lòng đăng nhập lại."));
    }

    // Với các lỗi khác, ném lỗi gốc
    return Promise.reject(error);
  }
);


export default axiosInstance;