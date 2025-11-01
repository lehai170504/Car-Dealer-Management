"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth/authService";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface UseLogoutResult {
  isLoading: boolean;
  logoutUser: () => Promise<void>;
}

export const useLogout = (): UseLogoutResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { logoutUser: clearAuthData } = useAuth();
  const router = useRouter();

  const logoutUser = async () => {
    setIsLoading(true);
    try {
      // Gọi API logout (nếu server có endpoint)
      await logout();
      toast.success("Đăng xuất thành công!");
    } catch (err: any) {
      console.error("Logout error:", err);
      toast.error("Có lỗi khi đăng xuất. Đã xóa dữ liệu cục bộ.");
    } finally {
      clearAuthData();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      setIsLoading(false);
      router.push("/auth/login");
    }
  };

  return { isLoading, logoutUser };
};
