"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { LoginCredentials } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, Zap, CornerRightUp } from "lucide-react";
import Link from "next/link";

const TechOverlay = () => (
  <div className="absolute inset-0 overflow-hidden opacity-50">
    <div
      className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover opacity-10"
      style={{
        backgroundImage:
          "radial-gradient(circle at 100% 0%, rgba(0,255,140,0.1), transparent 50%)",
      }}
    ></div>
    <div
      className="absolute inset-0 bg-[length:20px_20px] opacity-10"
      style={{
        backgroundImage:
          "linear-gradient(to right, #00A89A 1px, transparent 1px), linear-gradient(to bottom, #00A89A 1px, transparent 1px)",
      }}
    ></div>
  </div>
);

export default function LoginPage() {
  // ✅ Gọi hook login đã tích hợp với AuthContext
  const { isLoading, error, loginUser } = useLogin();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser(credentials);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* --- Cột trái --- */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative shadow-2xl">
        <TechOverlay />
        <div className="z-10 text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 text-4xl font-extrabold tracking-tight">
            <Zap className="h-10 w-10 text-emerald-400 animate-pulse-slow" />
            <span>EVM Connect DMS</span>
          </div>
          <h2 className="text-5xl font-extrabold mt-6 leading-tight">
            <span className="text-emerald-400">Kết Nối & Quản Lý</span>
            <br />
            Mạng Lưới Xe Điện Toàn Quốc
          </h2>
          <p className="text-xl text-gray-400 mt-4 max-w-lg mx-auto">
            Nền tảng hợp nhất giúp theo dõi hiệu suất, tồn kho và trải nghiệm
            khách hàng giữa Hãng xe và Đại lý theo thời gian thực.
          </p>
          <div className="mt-12 flex justify-center space-x-4">
            <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/40 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg transform hover:scale-105 transition duration-300">
              <CornerRightUp className="h-8 w-8 text-emerald-300 rotate-45" />
            </div>
            <div className="h-16 w-16 bg-blue-500/10 border border-blue-500/40 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg transform hover:scale-105 transition duration-300">
              <Zap className="h-8 w-8 text-blue-300" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Cột phải: Form đăng nhập --- */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <Card className="w-full max-w-md shadow-2xl border border-gray-100 rounded-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 lg:hidden mb-4 text-3xl font-extrabold tracking-tight">
              <Zap className="h-7 w-7 text-emerald-600" />
              <span>EVM Connect</span>
            </div>
            <CardTitle className="text-3xl font-bold">
              Chào mừng trở lại
            </CardTitle>
            <CardDescription>
              Đăng nhập để truy cập hệ thống Quản lý Đại lý (DMS).
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Công ty</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ten.ban@congty.com"
                    required
                    value={credentials.email}
                    onChange={handleChange}
                    className="pl-10 h-11 border-gray-300 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    className="pl-10 h-11 border-gray-300 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/50 transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang đăng nhập...
                  </span>
                ) : (
                  "Đăng Nhập"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                Hệ thống được vận hành bởi EVM.{" "}
                <Link
                  href="#"
                  className="font-medium text-gray-600 hover:underline"
                >
                  Điều khoản dịch vụ.
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
