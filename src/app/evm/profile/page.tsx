// src/app/(evm)/profile/page.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Lock, Settings, Mail, Briefcase } from "lucide-react"; // Thêm icon
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile & Cài đặt (EVM Admin)</h1>
      <p className="text-gray-600">Quản lý thông tin tài khoản và cấu hình hệ thống.</p>
      
      <Tabs defaultValue="account" className="w-full">
        {/* TABS LIST */}
        <TabsList className="grid w-full grid-cols-3 lg:w-3/4 xl:w-2/3">
          <TabsTrigger value="account">Thông tin Chung</TabsTrigger>
          <TabsTrigger value="security">Bảo mật & Mật khẩu</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt Hệ thống</TabsTrigger>
        </TabsList>
        
        {/* TAB 1: Thông tin Chung */}
        <TabsContent value="account" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><User className="mr-2 h-5 w-5"/> Thông tin Cá nhân & Tổ chức</CardTitle>
              <CardDescription>Cập nhật tên và thông tin liên hệ. Vai trò được xác định bởi hệ thống.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:w-4/5 xl:w-2/3">
              
              {/* Phần thông tin vai trò (Đã làm nổi bật) */}
              <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-1">
                      <Label className="text-xs text-gray-500 flex items-center"><Briefcase className="h-3 w-3 mr-1"/> Vai trò</Label>
                      <p className="font-semibold text-base">{EVM_USER.role}</p>
                  </div>
                  <div className="space-y-1">
                      <Label className="text-xs text-gray-500 flex items-center"><User className="h-3 w-3 mr-1"/> Phòng ban</Label>
                      <p className="font-semibold text-base">{EVM_USER.department}</p>
                  </div>
              </div>
              
              <Separator />

              {/* Phần chỉnh sửa (Sử dụng lưới 2 cột) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="evm-name">Họ và Tên</Label>
                  <Input id="evm-name" defaultValue={EVM_USER.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evm-email" className="flex items-center"><Mail className="h-3 w-3 mr-1"/> Email Công ty</Label>
                  {/* Email thường là readOnly vì là ID đăng nhập */}
                  <Input id="evm-email" defaultValue={EVM_USER.email} readOnly className="bg-gray-100" />
                </div>
                
                <div className="space-y-2 col-span-1 md:col-span-2">
                    <Label>Hoạt động gần nhất</Label>
                    <Input defaultValue={`Đăng nhập gần nhất: ${EVM_USER.lastLogin}`} readOnly className="bg-gray-100 text-sm" />
                </div>

              </div>
              <Button onClick={() => console.log('Lưu thông tin EVM')}>Lưu Thay đổi</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* TAB 2: Bảo mật & Mật khẩu */}
        <TabsContent value="security" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><Lock className="mr-2 h-5 w-5"/> Đổi Mật khẩu</CardTitle>
              <CardDescription>Đảm bảo mật khẩu của bạn là duy nhất và an toàn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 lg:w-4/5 xl:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="current-pass">Mật khẩu Hiện tại</Label>
                        <Input id="current-pass" type="password" placeholder="Nhập mật khẩu hiện tại" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-pass">Mật khẩu Mới</Label>
                        <Input id="new-pass" type="password" placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-pass">Xác nhận Mật khẩu Mới</Label>
                        <Input id="confirm-pass" type="password" placeholder="Xác nhận mật khẩu mới" />
                    </div>
                </div>
              <Button variant="destructive" onClick={() => console.log('Đổi mật khẩu EVM')}>Đổi Mật khẩu</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Cài đặt Hệ thống (Chỉ Admin) */}
        <TabsContent value="settings" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><Settings className="mr-2 h-5 w-5"/> Cài đặt Hệ thống</CardTitle>
              <CardDescription>Quản lý các thông số cấu hình chung (chỉ Admin).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 lg:w-4/5 xl:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sys-timeout">Thời gian chờ phiên (phút)</Label>
                  <Input id="sys-timeout" defaultValue="60" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-region">Khu vực Mặc định</Label>
                  <Input id="default-region" defaultValue="Toàn quốc" />
                </div>
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="support-email">Email Hỗ trợ Kỹ thuật</Label>
                  <Input id="support-email" defaultValue="support@evmdms.com" />
                </div>
              </div>
              <Button onClick={() => console.log('Lưu cài đặt hệ thống')}>Lưu Cấu hình</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}