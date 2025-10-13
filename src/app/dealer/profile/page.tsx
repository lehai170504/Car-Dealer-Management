"use client";

import { useEffect, useState, useMemo } from "react";
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
import { User, Lock, Building2, Mail, Loader2, Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { UserProfile } from "@/types/auth";
import { getProfile } from "@/services/auth/authService";

export default function Dealer_ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profileData = await getProfile();

        if (profileData) {
          setUserProfile(profileData);
          setUserName(profileData.name);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSaveProfile = () => {
    console.log("Đang lưu thông tin Đại lý:", { name: userName });
    setIsSaving(true);
    setTimeout(() => {
      setUserProfile((prev) => (prev ? { ...prev, name: userName } : null));
      console.log("Lưu thông tin thành công!");
      setIsSaving(false);
    }, 1500);
  };

  const handleChangePassword = () => {
    console.log("Đang đổi mật khẩu...");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800 text-gray-100">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-sky-500" />
        <span className="text-lg">Đang tải thông tin đại lý...</span>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800 text-gray-100">
        <p className="text-xl text-red-400">
          ⚠️ Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold text-gray-50">
        Profile & Thông tin Đại lý ({userProfile.role})
      </h1>
      <p className="text-gray-400">
        Quản lý tài khoản cá nhân và chi tiết đại lý.
      </p>

      <Tabs defaultValue="personal" className="w-full">
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

        <TabsContent value="personal" className="pt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-200">
                <User className="mr-2 h-5 w-5 text-sky-400" /> Tài khoản Nhân
                viên
              </CardTitle>
              <CardDescription className="text-gray-400">
                Cập nhật tên và email của bạn. Vai trò được xác định bởi hệ
                thống.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:w-4/5 xl:w-2/3">
              <div className="p-4 border border-gray-600 rounded-lg bg-gray-700/50">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400 flex items-center">
                    <Briefcase className="h-3 w-3 mr-1 text-gray-400" /> Vai trò
                  </Label>
                  <p className="font-semibold text-base text-amber-300">
                    {userProfile.role}
                  </p>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealer-name">Họ và Tên</Label>
                  <Input
                    id="dealer-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                    defaultValue={
                      userProfile.email || `${userProfile.id}@dealer.com`
                    }
                    readOnly
                    className="bg-gray-700/70 border-gray-600 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={isSaving || userName === userProfile.name}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Lưu Thay đổi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dealer-info" className="pt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-200">
                <Building2 className="mr-2 h-5 w-5 text-amber-400" /> Chi tiết
                Đại lý
              </CardTitle>
              <CardDescription className="text-gray-400">
                Thông tin cơ bản của đại lý (không thể chỉnh sửa).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:w-4/5 xl:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Mã Đại lý</Label>
                  <Input
                    defaultValue="DL001"
                    readOnly
                    className="bg-gray-700/70 border-gray-600 text-gray-300 font-mono font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Tên Đại lý</Label>
                  <Input
                    defaultValue="Đại lý Miền Bắc - Hà Nội"
                    readOnly
                    className="bg-gray-700/70 border-gray-600 text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2 p-3 border border-red-700 rounded-lg bg-red-800/50">
                <Label className="text-xs text-red-400 font-medium">
                  Hợp đồng có hiệu lực đến (Dữ liệu mẫu)
                </Label>
                <p className="font-semibold text-red-300">2027-12-31</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="pt-4">
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
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleChangePassword}
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
