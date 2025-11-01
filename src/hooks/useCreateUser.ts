"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth/authService";
import { CreateUserRequest } from "@/types/users";
import { toast } from "sonner";
import { createUserSchema } from "@/validations/userSchema";

interface CreateUserResult {
  isLoading: boolean;
  error: string | null;
  createUser: (credentials: CreateUserRequest) => Promise<void>;
}

export const useCreateUser = (): CreateUserResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const createUser = async (credentials: CreateUserRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      // ✅ Kiểm tra dữ liệu trước khi gọi API
      await createUserSchema.validate(credentials, { abortEarly: false });

      await register(credentials);
      toast.success("Tạo tài khoản thành công");
    } catch (err: any) {
      if (err.name === "ValidationError") {
        // Nếu lỗi đến từ Yup
        const messages = err.errors.join("\n");
        setError(messages);
        toast.error(messages);
      } else {
        // Nếu lỗi từ API
        console.error("Registration error:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Đã xảy ra lỗi khi đăng ký.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createUser };
};
