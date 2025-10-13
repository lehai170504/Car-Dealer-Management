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
import { User, Lock, Settings, Mail, Briefcase, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { UserProfile } from "@/types/auth";
import { getProfile } from "@/services/auth/authService";

export default function EVM_ProfilePage() {
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

  const isAdmin = useMemo(() => {
    return userProfile?.role === "Admin";
  }, [userProfile]);

  const handleSaveProfile = () => {
    console.log("Đang lưu thông tin EVM:", { name: userName });
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

  const handleSaveSystemSettings = () => {
    console.log("Đang lưu cài đặt hệ thống...");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800 text-gray-100">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-sky-500" />
        <span className="text-lg">Đang tải thông tin cá nhân...</span>
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
    <div className="space-y-6 p-6 bg-gray-800 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-50">
        Profile & Cài đặt ({userProfile.role})
      </h1>
      <p className="text-gray-400">
        Quản lý thông tin tài khoản và cấu hình hệ thống.
      </p>

      <Tabs defaultValue="account" className="w-full">
        <TabsList
          className={`grid w-full grid-cols-${
            isAdmin ? "3" : "2"
          } lg:w-3/4 xl:w-2/3 bg-gray-700 border border-gray-600`}
        >
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
          {isAdmin && (
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
            >
              Cài đặt Hệ thống
            </TabsTrigger>
          )}
        </TabsList>

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
              <div className="grid grid-cols-2 gap-4 p-4 border border-gray-600 rounded-lg bg-gray-700/50">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400 flex items-center">
                    <Briefcase className="h-3 w-3 mr-1 text-gray-400" /> Vai trò
                  </Label>
                  <p className="font-semibold text-base text-yellow-400">
                    {userProfile.role}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-400 flex items-center">
                    <User className="h-3 w-3 mr-1 text-gray-400" /> Phòng ban
                  </Label>
                  <p className="font-semibold text-base text-gray-50">
                    Phòng Kỹ thuật
                  </p>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="evm-name" className="text-gray-200">
                    Họ và Tên
                  </Label>
                  <Input
                    id="evm-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                    defaultValue={
                      userProfile.email || `${userProfile.id}@evm.com`
                    }
                    readOnly
                    className="bg-gray-700/80 border-gray-600 text-gray-400 cursor-not-allowed"
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
                onClick={handleChangePassword}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Đổi Mật khẩu
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
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
                  onClick={handleSaveSystemSettings}
                  className="bg-sky-600 hover:bg-sky-700 text-white"
                >
                  Lưu Cấu hình
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
