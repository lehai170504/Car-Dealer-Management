import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ENV;

// 2. Tạo một Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,

  // Thiết lập các headers mặc định
  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000, // 10 giây
});

// 3. (Tùy chọn) Thêm Interceptors
// Thường dùng để đính kèm Token xác thực (Authorization) vào mỗi request

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý phản hồi (Response Interceptor)
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý dữ liệu trả về nếu cần
    return response;
  },
  (error) => {
    // Xử lý lỗi tập trung (ví dụ: lỗi 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Chuyển hướng người dùng đến trang đăng nhập hoặc làm mới token
      console.log("Unauthorized - Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
