"use client"; // Đảm bảo component này là Client Component vì sử dụng hooks

import { Bell, Settings, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
// Import hook Router
// Giả định bạn đã có hook này hoặc thay thế bằng logic Auth thực tế
// import { useUserRole } from "@/hooks/useUserRole";

// Khai báo lại type giả định
type UserRole = "EVM_ADMIN" | "DEALER_MANAGER" | "DEALER_STAFF" | string;

// Function giả định (thay thế cho useUserRole) để demo
// const getUserRole = (): UserRole => {
//   return "DEALER_MANAGER";
// };

interface HeaderProps {
  title: string;
  userName?: string;
  role?: UserRole; // Đã cập nhật type
}

/**
 * Component Header chung cho Dealer và EVM Portal (Dark Theme).
 */
export function Header({
  title,
  userName = "Minh Trí",
  role = "Dealer Manager",
}: HeaderProps) {
  const router = useRouter();
  // Lấy vai trò (sử dụng role từ props làm giá trị thực tế)
  const userRole = (role as string).toUpperCase();

  /**
   * Xác định đường dẫn Profile dựa trên vai trò và chuyển hướng.
   */
  const handleSettingsClick = () => {
    let profilePath = "/";

    if (userRole.includes("EVM")) {
      // Chuyển hướng cho EVM Admin/Staff
      profilePath = "/evm/profile";
    } else if (userRole.includes("DEALER")) {
      // Chuyển hướng cho Dealer Manager/Staff
      profilePath = "/dealer/profile";
    }

    if (profilePath !== "/") {
      router.push(profilePath);
    } else {
      console.error(
        "Vai trò người dùng không xác định. Không thể chuyển hướng Profile."
      );
    }
  };

  // Tên viết tắt cho Avatar Fallback
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
  // Màu primary cho Dark Mode
  const primaryColor = "text-sky-400";
  const hoverBg = "hover:bg-gray-700";

  return (
    // Header nền tối, border tối
    <header className="flex items-center justify-between h-16 border-b border-gray-700 bg-gray-900 px-6 shadow-xl">
      {/* 1. Tiêu đề Trang (Title) */}
      <h1 className="text-xl font-semibold text-gray-50 tracking-tight">
        {title}
      </h1>

      <div className="flex items-center space-x-4">
        {/* 2. Thanh Tìm kiếm nhanh (Quick Search) - Dark Theme */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhanh..."
            className="w-[200px] lg:w-[300px] pl-9 rounded-full bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-sky-500 transition-all"
          />
        </div>

        {/* 3. Nút Thông báo (Notifications) - Dark Theme */}
        <Button
          variant="ghost"
          size="icon"
          className={`relative rounded-full ${hoverBg}`}
        >
          <Bell className="h-5 w-5 text-gray-300" />
          {/* Badge thông báo mới */}
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-gray-900"></span>
        </Button>

        {/* 4. Dropdown Menu Người dùng */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`relative h-9 w-9 rounded-full p-0 ${hoverBg}`}
            >
              <Avatar className={`h-9 w-9 border-2 border-sky-400`}>
                <AvatarImage
                  src="https://placehold.co/100x100/10B981/fff?text=MT" // Màu nổi bật hơn
                  alt={userName}
                />
                <AvatarFallback className="bg-sky-600 text-white font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
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
                <p className="text-xs leading-none text-gray-400">{role}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />

            {/* MỤC CÀI ĐẶT */}
            <DropdownMenuItem
              className="cursor-pointer text-gray-200 hover:bg-gray-700 focus:bg-gray-700"
              onClick={handleSettingsClick}
            >
              <Settings className={`mr-2 h-4 w-4 ${primaryColor}`} />
              Cài đặt Tài khoản
            </DropdownMenuItem>

            {/* MỤC ĐĂNG XUẤT */}
            <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-red-900/40 focus:bg-red-900/40">
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
