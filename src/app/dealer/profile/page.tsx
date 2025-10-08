// src/app/(dealer)/profile/page.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Lock, Building2, Phone, Mail } from "lucide-react"; // Thêm icon
import { Separator } from "@/components/ui/separator";

// Dữ liệu mẫu (Giả định người dùng và đại lý đang đăng nhập)
const DEALER_USER = {
  name: "Nguyễn Văn A",
  role: "Dealer Manager",
  email: "a.nguyen@dlhanoi.com",
  phone: "0901234567",
};

const DEALER_INFO = {
    dealerName: "Đại lý Miền Bắc - Hà Nội",
    dealerCode: "DL001",
    address: "Số 123, Phố ABC, Quận XYZ, Hà Nội",
    contractExpiry: "2027-12-31",
};

export default function Dealer_ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile & Thông tin Đại lý</h1>
      <p className="text-gray-600">Quản lý tài khoản cá nhân và chi tiết đại lý.</p>
      
      <Tabs defaultValue="personal" className="w-full">
        {/* TABS LIST */}
        <TabsList className="grid w-full grid-cols-3 lg:w-3/4 xl:w-2/3">
          <TabsTrigger value="personal">Thông tin Cá nhân</TabsTrigger>
          <TabsTrigger value="dealer-info">Thông tin Đại lý</TabsTrigger>
          <TabsTrigger value="security">Bảo mật & Mật khẩu</TabsTrigger>
        </TabsList>
        
        {/* TAB 1: Thông tin Cá nhân */}
        <TabsContent value="personal" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><User className="mr-2 h-5 w-5"/> Tài khoản Nhân viên</CardTitle>
              <CardDescription>Cập nhật tên, email và số điện thoại của bạn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:w-4/5 xl:w-2/3">
              
              {/* Vai trò (Đã làm nổi bật) */}
              <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-1">
                      <Label className="text-xs text-gray-500">Vai trò trong Đại lý</Label>
                      <p className="font-semibold text-base">{DEALER_USER.role}</p>
                  </div>
              </div>
              
              <Separator />

              {/* Phần chỉnh sửa (Sử dụng lưới 2 cột) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealer-name">Họ và Tên</Label>
                  <Input id="dealer-name" defaultValue={DEALER_USER.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealer-email" className="flex items-center"><Mail className="h-3 w-3 mr-1"/> Email</Label>
                  <Input id="dealer-email" defaultValue={DEALER_USER.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealer-phone" className="flex items-center"><Phone className="h-3 w-3 mr-1"/> Số điện thoại</Label>
                  <Input id="dealer-phone" defaultValue={DEALER_USER.phone} />
                </div>
              </div>
              
              <Button onClick={() => console.log('Lưu thông tin cá nhân dealer')}>Lưu Thay đổi</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* TAB 2: Thông tin Đại lý */}
        <TabsContent value="dealer-info" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><Building2 className="mr-2 h-5 w-5"/> Chi tiết Đại lý</CardTitle>
              <CardDescription>Thông tin chính thức của đại lý, được quản lý bởi Hãng xe (EVM).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:w-4/5 xl:w-2/3">
                {/* Thông tin cơ bản */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Mã Đại lý</Label>
                        <Input defaultValue={DEALER_INFO.dealerCode} readOnly className="bg-gray-100 font-mono font-semibold" />
                    </div>
                    <div className="space-y-2">
                        <Label>Tên Đại lý</Label>
                        <Input defaultValue={DEALER_INFO.dealerName} readOnly className="bg-gray-100" />
                    </div>
                </div>
                
                {/* Địa chỉ và Hợp đồng */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Địa chỉ Showroom</Label>
                        <Input defaultValue={DEALER_INFO.address} readOnly className="bg-gray-100" />
                    </div>
                    <div className="space-y-2 p-3 border border-red-200 rounded-lg bg-red-50">
                        <Label className="text-xs text-red-600 font-medium">Hợp đồng có hiệu lực đến</Label>
                        <p className="font-semibold text-red-700">{DEALER_INFO.contractExpiry}</p>
                    </div>
                </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Bảo mật & Mật khẩu */}
        <TabsContent value="security" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><Lock className="mr-2 h-5 w-5"/> Đổi Mật khẩu</CardTitle>
              <CardDescription>Đảm bảo mật khẩu tài khoản đại lý của bạn là an toàn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 lg:w-4/5 xl:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="current-pass-dealer">Mật khẩu Hiện tại</Label>
                        <Input id="current-pass-dealer" type="password" placeholder="Nhập mật khẩu hiện tại" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-pass-dealer">Mật khẩu Mới</Label>
                        <Input id="new-pass-dealer" type="password" placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-pass-dealer">Xác nhận Mật khẩu Mới</Label>
                        <Input id="confirm-pass-dealer" type="password" placeholder="Xác nhận mật khẩu mới" />
                    </div>
                </div>
              <Button variant="destructive" onClick={() => console.log('Đổi mật khẩu dealer')}>Đổi Mật khẩu</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}