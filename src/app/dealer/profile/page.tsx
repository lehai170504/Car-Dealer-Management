"use client";

import { useState } from "react";
import Swal from "sweetalert2";
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
import { User, Mail, Loader2, Briefcase, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { useUserProfile } from "@/hooks/useUserProfile";
import { useRefreshToken } from "@/hooks/useRefreshToken";

export default function Dealer_ProfilePage() {
  const { userProfile, isLoading, error, userName, setUserName } =
    useUserProfile();

  const [isSaving, setIsSaving] = useState(false);
  const { refresh, loading: isRefreshing } = useRefreshToken();

  /** 🔹 Lưu thông tin profile */
  const handleSaveProfile = async () => {
    setIsSaving(true);

    try {
      console.log("Đang lưu thông tin Đại lý:", { name: userName });

      // Giả lập gọi API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        text: "Thông tin đại lý của bạn đã được lưu.",
        confirmButtonColor: "#0ea5e9",
        background: "#1f2937",
        color: "#f3f4f6",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Không thể lưu thông tin. Vui lòng thử lại.",
        confirmButtonColor: "#ef4444",
        background: "#1f2937",
        color: "#f3f4f6",
      });
    } finally {
      setIsSaving(false);
    }
  };

  /** 🔹 Làm mới token */
  const handleRefreshToken = async () => {
    const result = await refresh();

    if (result) {
      console.log("🔄 Token mới:", result.token);
      console.log("👤 User:", result.user);

      Swal.fire({
        icon: "success",
        title: "Làm mới token thành công!",
        text: "Hệ thống đã cấp token mới cho bạn.",
        confirmButtonColor: "#0ea5e9",
        background: "#1f2937",
        color: "#f3f4f6",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Làm mới token thất bại!",
        text: "Phiên đăng nhập của bạn có thể đã hết hạn. Vui lòng đăng nhập lại.",
        confirmButtonColor: "#ef4444",
        background: "#1f2937",
        color: "#f3f4f6",
      });
    }
  };

  // ================== Loading / Error ==================
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-sky-500" />
        <span className="text-lg">Đang tải thông tin đại lý...</span>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <p className="text-xl text-red-400">
          ⚠️{" "}
          {error ||
            "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại."}
        </p>
      </div>
    );
  }

  // ================== UI chính ==================
  return (
    <div className="space-y-8 px-4 py-6 md:px-10 md:py-8 bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-100">
          Profile & Thông tin Đại lý ({userProfile.role})
        </h1>

        <Button
          onClick={handleRefreshToken}
          disabled={isRefreshing}
          variant="outline"
          className="text-sky-400 border-sky-600 hover:bg-sky-600 hover:text-white bg-gray-700"
        >
          {isRefreshing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Đang làm mới...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" /> Làm mới Token
            </>
          )}
        </Button>
      </div>

      <p className="text-gray-400">
        Quản lý tài khoản cá nhân và chi tiết đại lý.
      </p>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-3/4 xl:w-2/3 bg-gray-800 border border-gray-700 rounded-md">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300 hover:bg-gray-700"
          >
            Thông tin Cá nhân
          </TabsTrigger>
          <TabsTrigger
            value="dealer-info"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300 hover:bg-gray-700"
          >
            Thông tin Đại lý
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300 hover:bg-gray-700"
          >
            Bảo mật & Mật khẩu
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="pt-6">
          <Card className="bg-gray-800 border border-gray-700 shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-100">
                <User className="mr-2 h-5 w-5 text-sky-400" /> Tài khoản Nhân
                viên
              </CardTitle>
              <CardDescription className="text-gray-400">
                Cập nhật tên và email của bạn. Vai trò được xác định bởi hệ
                thống.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:w-4/5 xl:w-2/3">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-700/50">
                <Label className="text-xs text-gray-300 flex items-center">
                  <Briefcase className="h-3 w-3 mr-1 text-gray-400" /> Vai trò
                </Label>
                <p className="font-semibold text-base text-amber-400">
                  {userProfile.role}
                </p>
              </div>

              <Separator className="bg-gray-700" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealer-name" className="text-gray-300">
                    Họ và Tên
                  </Label>
                  <Input
                    id="dealer-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-gray-100 focus:border-sky-500 focus:ring-sky-500"
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
                    defaultValue={userProfile.email}
                    readOnly
                    className="bg-gray-700/70 border-gray-600 text-gray-300 cursor-not-allowed"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                {isSaving ? "Đang lưu..." : "Lưu Thay đổi"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
