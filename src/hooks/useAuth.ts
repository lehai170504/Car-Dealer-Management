// src/hooks/useAuth.ts

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginCredentials, LoginResponse } from "@/types/auth"; // Đảm bảo import đúng
import { login, logout } from "@/services/auth/authService"; // Import service

interface UseLoginResult {
  isLoading: boolean;
  error: string | null;
  loginUser: (credentials: LoginCredentials) => Promise<void>;
}

/**
 * Custom hook để xử lý logic đăng nhập.
 * Quản lý trạng thái loading, error và chuyển hướng.
 */
export const useLogin = (): UseLoginResult => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (credentials: LoginCredentials) => {
    setError(null);
    setIsLoading(true);

    try {
      const response: LoginResponse = await login(credentials);
      const userRole = response.user.role;

      // Xử lý chuyển hướng dựa trên vai trò
      if (userRole === "Admin") {
        router.push("/evm/dashboard");
      } else if (userRole === "Dealer Manager") {
        router.push("/dealer/dashboard");
      } else {
        // Vai trò không hợp lệ
        setError(
          "Đăng nhập thành công nhưng vai trò không hợp lệ. Vui lòng liên hệ quản trị viên."
        );
        logout(); // Tự động xóa token
      }
    } catch (err: any) {
      // Lấy thông báo lỗi chi tiết từ backend hoặc Interceptor
      const errorMessage =
        err.message ||
        err.response?.data?.message ||
        "Đã xảy ra lỗi không xác định. Vui lòng thử lại.";
        
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, loginUser };
};