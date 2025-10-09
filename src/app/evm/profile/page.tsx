// src/app/(evm)/profile/page.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Lock, Settings, Mail, Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Dữ liệu mẫu (Giả định người dùng đang đăng nhập)
const EVM_USER = {
  name: "Trần Minh Hùng",
  role: "EVM Admin",
  email: "hung.tm@evm.com",
  department: "Quản lý Hệ thống",
  lastLogin: "2025-10-07 14:30:00",
};

export default function EVM_ProfilePage() {
  return (
    // Container chính cho nền tối
    <div className="space-y-6 p-6 bg-gray-800 text-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-50">
        Profile & Cài đặt (EVM Admin)
      </h1>
      <p className="text-gray-400">
        Quản lý thông tin tài khoản và cấu hình hệ thống.
      </p>

      <Tabs defaultValue="account" className="w-full">
        {/* TABS LIST - Dark Theme */}
        <TabsList className="grid w-full grid-cols-3 lg:w-3/4 xl:w-2/3 bg-gray-700 border border-gray-600">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Thông tin Chung
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Bảo mật & Mật khẩu
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Cài đặt Hệ thống
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Thông tin Chung */}
        <TabsContent value="account" className="pt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-50">
                <User className="mr-2 h-5 w-5 text-sky-400" /> Thông tin Cá nhân
                & Tổ chức
              </CardTitle>
              <CardDescription className="text-gray-400">
                Cập nhật tên và thông tin liên hệ. Vai trò được xác định bởi hệ
                thống.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:w-4/5 xl:w-2/3">
              {/* Phần thông tin vai trò (Nổi bật trên nền tối) */}
              <div className="grid grid-cols-2 gap-4 p-4 border border-gray-600 rounded-lg bg-gray-700/50">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400 flex items-center">
                    <Briefcase className="h-3 w-3 mr-1 text-gray-400" /> Vai trò
                  </Label>
                  <p className="font-semibold text-base text-yellow-400">
                    {EVM_USER.role}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400 flex items-center">
                    <User className="h-3 w-3 mr-1 text-gray-400" /> Phòng ban
                  </Label>
                  <p className="font-semibold text-base text-gray-200">
                    {EVM_USER.department}
                  </p>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Phần chỉnh sửa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="evm-name" className="text-gray-200">
                    Họ và Tên
                  </Label>
                  <Input
                    id="evm-name"
                    defaultValue={EVM_USER.name}
                    className="bg-gray-700 border-gray-600 text-gray-50 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="evm-email"
                    className="flex items-center text-gray-200"
                  >
                    <Mail className="h-3 w-3 mr-1 text-sky-400" /> Email Công ty
                  </Label>
                  <Input
                    id="evm-email"
                    defaultValue={EVM_USER.email}
                    readOnly
                    className="bg-gray-700/80 border-gray-600 text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label className="text-gray-200">Hoạt động gần nhất</Label>
                  <Input
                    defaultValue={`Đăng nhập gần nhất: ${EVM_USER.lastLogin}`}
                    readOnly
                    className="bg-gray-700/80 border-gray-600 text-gray-400 text-sm cursor-not-allowed"
                  />
                </div>
              </div>
              <Button
                onClick={() => console.log("Lưu thông tin EVM")}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                Lưu Thay đổi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: Bảo mật & Mật khẩu */}
        <TabsContent value="security" className="pt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-50">
                <Lock className="mr-2 h-5 w-5 text-sky-400" /> Đổi Mật khẩu
              </CardTitle>
              <CardDescription className="text-gray-400">
                Đảm bảo mật khẩu của bạn là duy nhất và an toàn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 lg:w-4/5 xl:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="current-pass" className="text-gray-200">
                    Mật khẩu Hiện tại
                  </Label>
                  <Input
                    id="current-pass"
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    className="bg-gray-700 border-gray-600 text-gray-50 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass" className="text-gray-200">
                    Mật khẩu Mới
                  </Label>
                  <Input
                    id="new-pass"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    className="bg-gray-700 border-gray-600 text-gray-50 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-pass" className="text-gray-200">
                    Xác nhận Mật khẩu Mới
                  </Label>
                  <Input
                    id="confirm-pass"
                    type="password"
                    placeholder="Xác nhận mật khẩu mới"
                    className="bg-gray-700 border-gray-600 text-gray-50 focus:border-sky-500"
                  />
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => console.log("Đổi mật khẩu EVM")}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Đổi Mật khẩu
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Cài đặt Hệ thống (Chỉ Admin) */}
        <TabsContent value="settings" className="pt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-50">
                <Settings className="mr-2 h-5 w-5 text-sky-400" /> Cài đặt Hệ
                thống
              </CardTitle>
              <CardDescription className="text-gray-400">
                Quản lý các thông số cấu hình chung (chỉ Admin).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 lg:w-4/5 xl:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sys-timeout" className="text-gray-200">
                    Thời gian chờ phiên (phút)
                  </Label>
                  <Input
                    id="sys-timeout"
                    defaultValue="60"
                    type="number"
                    className="bg-gray-700 border-gray-600 text-gray-50 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-region" className="text-gray-200">
                    Khu vực Mặc định
                  </Label>
                  <Input
                    id="default-region"
                    defaultValue="Toàn quốc"
                    className="bg-gray-700 border-gray-600 text-gray-50 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="support-email" className="text-gray-200">
                    Email Hỗ trợ Kỹ thuật
                  </Label>
                  <Input
                    id="support-email"
                    defaultValue="support@evmdms.com"
                    className="bg-gray-700 border-gray-600 text-gray-50 focus:border-sky-500"
                  />
                </div>
              </div>
              <Button
                onClick={() => console.log("Lưu cài đặt hệ thống")}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                Lưu Cấu hình
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
