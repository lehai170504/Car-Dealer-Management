"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register } from "@/services/auth/authService";
import { CreateUserRequest, UserRole } from "@/types/users";
import { createUserSchema } from "@/validations/userSchema";
import { useDealers } from "@/hooks/useDealers";

interface CreateUserResult {
  isLoading: boolean;
  error: string | null;
  dealers: ReturnType<typeof useDealers>["filteredDealers"];
  loadingDealers: boolean;
  createUser: (credentials: CreateUserRequest) => Promise<void>;
}

/** 🧩 Hook tạo người dùng kèm danh sách Dealer */
export const useCreateUser = (): CreateUserResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 🔹 Lấy danh sách Dealer từ hook có sẵn
  const { filteredDealers, loading: loadingDealers } = useDealers();

  /** 🟦 Hàm tạo user */
  const createUser = async (credentials: CreateUserRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      // ✅ Validate dữ liệu bằng Yup
      await createUserSchema.validate(credentials, { abortEarly: false });

      // ✅ Bắt buộc chọn dealer nếu role yêu cầu
      if (
        (credentials.role === "DealerManager" ||
          credentials.role === "DealerStaff") &&
        !credentials.dealer
      ) {
        const msg = "Vui lòng chọn đại lý cho người dùng này.";
        toast.error(msg);
        setError(msg);
        return;
      }

      // ✅ Gọi API tạo user
      await register(credentials);
      toast.success("Tạo tài khoản thành công ✅");

      router.refresh(); // reload trang để cập nhật danh sách
    } catch (err: any) {
      if (err.name === "ValidationError") {
        // ❌ Lỗi từ Yup validation
        const messages = err.errors.join("\n");
        setError(messages);
        toast.error(messages);
      } else {
        // ❌ Lỗi từ API hoặc network
        console.error("❌ Registration error:", err);
        const message =
          err.response?.data?.message ||
          err.message ||
          "Đã xảy ra lỗi khi đăng ký.";
        setError(message);
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Memo hóa danh sách dealer
  const dealers = useMemo(() => filteredDealers, [filteredDealers]);

  return { isLoading, error, dealers, loadingDealers, createUser };
};
