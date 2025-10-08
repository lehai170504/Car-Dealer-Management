'use client'; // Đảm bảo component này là Client Component vì sử dụng hooks

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
import { useRouter } from 'next/navigation'; // Import hook Router
// Giả định bạn đã có hook này hoặc thay thế bằng logic Auth thực tế
// import { useUserRole } from "@/hooks/useUserRole"; 

// Khai báo lại type giả định (để component này độc lập)
type UserRole = 'EVM_ADMIN' | 'DEALER_MANAGER' | 'DEALER_STAFF' | string;

// Function giả định (thay thế cho useUserRole) để demo
const getUserRole = (): UserRole => {
    // Trong thực tế, bạn sẽ lấy role từ props hoặc context
    // Ví dụ: Lấy từ props 'role' và ánh xạ
    return 'DEALER_MANAGER'; // Giá trị demo
}

interface HeaderProps {
  title: string;
  userName?: string;
  role?: UserRole; // Đã cập nhật type
}

/**
 * Component Header chung cho Dealer và EVM Portal.
 */
export function Header({ title, userName = "Minh Trí", role = "Dealer Manager" }: HeaderProps) {
  const router = useRouter();
  // Lấy vai trò (sử dụng role từ props làm giá trị thực tế/hoặc gọi hook)
  const userRole = (role as UserRole).toUpperCase(); 

  /**
   * Xác định đường dẫn Profile dựa trên vai trò và chuyển hướng.
   */
  const handleSettingsClick = () => {
    let profilePath = '/';

    if (userRole.includes('EVM')) {
      // Chuyển hướng cho EVM Admin/Staff
      profilePath = '/evm/profile';
    } else if (userRole.includes('DEALER')) {
      // Chuyển hướng cho Dealer Manager/Staff
      profilePath = '/dealer/profile';
    }

    if (profilePath !== '/') {
      router.push(profilePath);
    } else {
      console.error("Vai trò người dùng không xác định. Không thể chuyển hướng Profile.");
      // Xử lý chuyển hướng mặc định hoặc thông báo lỗi
    }
  };

  return (
    <header className="flex items-center justify-between h-16 border-b bg-white px-6 shadow-sm">
      
      {/* 1. Tiêu đề Trang (Title) */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">{title}</h1>

      <div className="flex items-center space-x-4">
        
        {/* 2. Thanh Tìm kiếm nhanh (Quick Search) */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Tìm kiếm nhanh..." 
            className="w-[200px] lg:w-[300px] pl-9 rounded-full bg-gray-50 border-gray-200 focus:border-primary transition-all"
          />
        </div>

        {/* 3. Nút Thông báo (Notifications) */}
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          {/* Badge thông báo mới */}
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
        </Button>

        {/* 4. Dropdown Menu Người dùng */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              <Avatar className="h-9 w-9 border-2 border-primary/50">
                <AvatarImage src="https://placehold.co/100x100/A3E635/000?text=MT" alt={userName} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">MT</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">{role}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* MỤC CHUNG ĐÃ ĐƯỢC CHỈNH SỬA */}
            <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={handleSettingsClick} // Gán hàm chuyển hướng
            >
              <Settings className="mr-2 h-4 w-4" />
              Cài đặt Tài khoản
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer text-red-500 hover:!bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}