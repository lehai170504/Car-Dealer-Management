// src/components/UserNav.tsx
'use client';

import { Settings, User, LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserRole } from "@/hooks/useUserRole"; // Import hook đã tạo

export function UserNav() {
  const router = useRouter();
  const userRole = useUserRole();

  /**
   * Xác định đường dẫn Profile dựa trên vai trò
   */
  const handleSettingsClick = () => {
    let profilePath = '/';

    if (userRole === 'EVM_ADMIN') {
      profilePath = '/evm/profile';
    } else if (userRole === 'DEALER_MANAGER' || userRole === 'DEALER_STAFF') {
      profilePath = '/dealer/profile';
    }

    if (profilePath !== '/') {
      router.push(profilePath);
    } else {
      console.error("Vai trò người dùng không xác định!");
    }
  };

  const getRoleLabel = () => {
    switch(userRole) {
        case 'EVM_ADMIN': return 'Quản trị EVM';
        case 'DEALER_MANAGER': return 'Quản lý Đại lý';
        case 'DEALER_STAFF': return 'Nhân viên Đại lý';
        default: return 'Người dùng';
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{userRole.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Minh Hùng</p>
            <p className="text-xs leading-none text-muted-foreground">
              {getRoleLabel()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* MỤC CẦN CHỈNH SỬA CHUNG */}
        <DropdownMenuItem 
          className="cursor-pointer" 
          onClick={handleSettingsClick} // Gọi hàm xử lý chuyển hướng
        >
          <Settings className="mr-2 h-4 w-4" />
          Cài đặt Tài khoản
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}