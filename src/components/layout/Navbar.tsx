"use client";

import { LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white px-4 py-2 shadow-md border-b">
      {/* Left: Logo / Title */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-blue-600">EV Dealer</span>
        <span className="text-gray-500 text-sm">Dashboard</span>
      </div>

      {/* Right: Dropdown User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">Admin</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="h-4 w-4" />
            <span>Thông tin cá nhân</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="h-4 w-4" />
            <span>Cài đặt</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
