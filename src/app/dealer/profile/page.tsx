// src/app/(dealer)/profile/page.tsx
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
import { User, Lock, Building2, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Dữ liệu mẫu
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
    <div className="space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold text-gray-50">
        Profile & Thông tin Đại lý
      </h1>
      <p className="text-gray-400">
        Quản lý tài khoản cá nhân và chi tiết đại lý.
      </p>

      <Tabs defaultValue="personal" className="w-full">
        {/* TABS LIST - Dark Theme */}
        <TabsList className="grid w-full grid-cols-3 lg:w-3/4 xl:w-2/3 bg-gray-700 border border-gray-600">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Thông tin Cá nhân
          </TabsTrigger>
          <TabsTrigger
            value="dealer-info"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Thông tin Đại lý
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Bảo mật & Mật khẩu
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Thông tin Cá nhân */}
        <TabsContent value="personal" className="pt-4">
          {/* Card Dark Theme */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-200">
                <User className="mr-2 h-5 w-5 text-sky-400" /> Tài khoản Nhân
                viên
              </CardTitle>
              <CardDescription className="text-gray-400">
                Cập nhật tên, email và số điện thoại của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:w-4/5 xl:w-2/3">
              {/* Vai trò (Làm nổi bật trên nền tối) */}
              <div className="p-4 border border-gray-600 rounded-lg bg-gray-700/50">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400">
                    Vai trò trong Đại lý
                  </Label>
                  <p className="font-semibold text-base text-amber-300">
                    {DEALER_USER.role}
                  </p>
                </div>
              </div>

              {/* Separator Dark Theme */}
              <Separator className="bg-gray-700" />

              {/* Phần chỉnh sửa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealer-name">Họ và Tên</Label>
                  <Input
                    id="dealer-name"
                    defaultValue={DEALER_USER.name}
                    className="bg-gray-700 border-gray-600 text-gray-200 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="dealer-email"
                    className="flex items-center text-gray-300"
                  >
                    <Mail className="h-3 w-3 mr-1 text-gray-400" /> Email
                  </Label>
                  <Input
                    id="dealer-email"
                    defaultValue={DEALER_USER.email}
                    className="bg-gray-700 border-gray-600 text-gray-200 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="dealer-phone"
                    className="flex items-center text-gray-300"
                  >
                    <Phone className="h-3 w-3 mr-1 text-gray-400" /> Số điện
                    thoại
                  </Label>
                  <Input
                    id="dealer-phone"
                    defaultValue={DEALER_USER.phone}
                    className="bg-gray-700 border-gray-600 text-gray-200 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Nút Lưu Thay đổi - Primary Dark Theme */}
              <Button
                className="bg-sky-600 hover:bg-sky-700 text-white"
                onClick={() => console.log("Lưu thông tin cá nhân dealer")}
              >
                Lưu Thay đổi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: Thông tin Đại lý */}
        <TabsContent value="dealer-info" className="pt-4">
          {/* Card Dark Theme */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-200">
                <Building2 className="mr-2 h-5 w-5 text-amber-400" /> Chi tiết
                Đại lý
              </CardTitle>
              <CardDescription className="text-gray-400">
                Thông tin chính thức của đại lý, được quản lý bởi Hãng xe (EVM).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:w-4/5 xl:w-2/3">
              {/* Thông tin cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Mã Đại lý</Label>
                  {/* Input ReadOnly Dark Theme */}
                  <Input
                    defaultValue={DEALER_INFO.dealerCode}
                    readOnly
                    className="bg-gray-700/70 border-gray-600 text-gray-300 font-mono font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Tên Đại lý</Label>
                  <Input
                    defaultValue={DEALER_INFO.dealerName}
                    readOnly
                    className="bg-gray-700/70 border-gray-600 text-gray-300"
                  />
                </div>
              </div>

              {/* Địa chỉ và Hợp đồng */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Địa chỉ Showroom</Label>
                  <Input
                    defaultValue={DEALER_INFO.address}
                    readOnly
                    className="bg-gray-700/70 border-gray-600 text-gray-300"
                  />
                </div>
                {/* Hợp đồng hết hạn (Màu đỏ cảnh báo Dark Theme) */}
                <div className="space-y-2 p-3 border border-red-700 rounded-lg bg-red-800/50">
                  <Label className="text-xs text-red-400 font-medium">
                    Hợp đồng có hiệu lực đến
                  </Label>
                  <p className="font-semibold text-red-300">
                    {DEALER_INFO.contractExpiry}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Bảo mật & Mật khẩu */}
        <TabsContent value="security" className="pt-4">
          {/* Card Dark Theme */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-200">
                <Lock className="mr-2 h-5 w-5 text-red-400" /> Đổi Mật khẩu
              </CardTitle>
              <CardDescription className="text-gray-400">
                Đảm bảo mật khẩu tài khoản đại lý của bạn là an toàn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 lg:w-4/5 xl:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="current-pass-dealer">Mật khẩu Hiện tại</Label>
                  {/* Input Dark Theme */}
                  <Input
                    id="current-pass-dealer"
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    className="bg-gray-700 border-gray-600 text-gray-200 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass-dealer">Mật khẩu Mới</Label>
                  <Input
                    id="new-pass-dealer"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    className="bg-gray-700 border-gray-600 text-gray-200 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-pass-dealer">
                    Xác nhận Mật khẩu Mới
                  </Label>
                  <Input
                    id="confirm-pass-dealer"
                    type="password"
                    placeholder="Xác nhận mật khẩu mới"
                    className="bg-gray-700 border-gray-600 text-gray-200 focus:border-sky-500"
                  />
                </div>
              </div>
              {/* Nút Đổi Mật khẩu - Destructive Dark Theme */}
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => console.log("Đổi mật khẩu dealer")}
              >
                Đổi Mật khẩu
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
