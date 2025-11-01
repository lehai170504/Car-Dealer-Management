"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/services/auth/authService";
import { LoginCredentials, LoginResponse } from "@/types/auth";

interface UseLoginResult {
  isLoading: boolean;
  error: string | null;
  loginUser: (credentials: LoginCredentials) => Promise<void>;
}

export const useLogin = (): UseLoginResult => {
  const router = useRouter();
  const { loginUser: setAuthData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (credentials: LoginCredentials) => {
    setError(null);
    setIsLoading(true);

    try {
      const response: LoginResponse = await login(credentials);

      setAuthData(response.user, response.token, response.refreshToken);

      const role = response.user.role?.trim();
      switch (role) {
        case "Admin":
          router.push("/admin/users");
          break;
        case "DealerManager":
        case "DealerStaff":
          router.push("/dealer/dashboard");
          break;
        case "EVMStaff":
          router.push("/evm/catalog");
          break;
        default:
          setError("Vai trò không hợp lệ. Vui lòng liên hệ quản trị viên.");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Đã xảy ra lỗi không xác định. Vui lòng thử lại.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, loginUser };
};
