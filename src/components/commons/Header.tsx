"use client";

import { useEffect, useState, useMemo } from "react";
import { Bell, Settings, LogOut, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { logout, getProfile } from "@/services/auth/authService";
import { UserProfile } from "@/types/auth";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
        logout();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const userName = user?.name || "Người dùng";
  const userRole = (user?.role || "Khách").toUpperCase();

  const initials = useMemo(() => {
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, [userName]);

  const handleSettingsClick = () => {
    let profilePath = "/";
    if (userRole.includes("EVM")) profilePath = "/evm/profile";
    else if (userRole.includes("DEALER")) profilePath = "/dealer/profile";

    if (profilePath !== "/") router.push(profilePath);
    else console.warn("Vai trò người dùng không xác định.");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const primaryColor = "text-sky-400";
  const hoverBg = "hover:bg-gray-700";

  if (loading) {
    return (
      <header className="flex items-center justify-between h-16 border-b border-gray-700 bg-gray-900 px-6">
        <h1 className="text-xl font-semibold text-gray-50 tracking-tight">
          {title}
        </h1>
        <div className="text-gray-400 text-sm animate-pulse">Đang tải...</div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between h-16 border-b border-gray-700 bg-gray-900 px-6 shadow-xl">
      {/* Tiêu đề */}
      <h1 className="text-xl font-semibold text-gray-50 tracking-tight">
        {title}
      </h1>

      <div className="flex items-center space-x-4">
        {/* Thanh tìm kiếm */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhanh..."
            className="w-[200px] lg:w-[300px] pl-9 rounded-full bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-sky-500 transition-all"
          />
        </div>

        {/* Nút thông báo */}
        <Button
          variant="ghost"
          size="icon"
          className={`relative rounded-full ${hoverBg}`}
        >
          <Bell className="h-5 w-5 text-gray-300" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-gray-900"></span>
        </Button>

        {/* Dropdown user (chỉ tên + menu) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 ${hoverBg}`}
            >
              <User className={`h-5 w-5 ${primaryColor}`} />
              <span className="text-gray-100 text-sm font-medium">
                {userName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-gray-800 border-gray-700 text-gray-50 shadow-2xl"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-gray-50">
                  {userName}
                </p>
                <p className="text-xs leading-none text-gray-400">{userRole}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-gray-700" />

            <DropdownMenuItem
              className="cursor-pointer text-gray-200 hover:bg-gray-700 focus:bg-gray-700"
              onClick={handleSettingsClick}
            >
              <Settings className={`mr-2 h-4 w-4 ${primaryColor}`} />
              Cài đặt tài khoản
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:bg-red-900/40 focus:bg-red-900/40"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
