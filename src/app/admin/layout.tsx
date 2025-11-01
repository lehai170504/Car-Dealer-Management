"use client";

import { Sidebar } from "@/components/commons/Sidebar";
import { Header } from "@/components/commons/Header";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { getProfile, logout } from "@/services/auth/authService";
import { UserProfile } from "@/types/auth";

function getPageTitle(pathname: string): string {
  if (pathname.includes("users")) return "Quản lý người dùng";
  if (pathname.includes("settings")) return "Cấu hình hệ thống";
  if (pathname.includes("reports")) return "Báo cáo thống kê";
  if (pathname.includes("profile")) return "Hồ sơ Admin";
  return "Admin Panel - Quản trị hệ thống";
}

type AdminRole = "Admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = useMemo(() => getPageTitle(pathname), [pathname]);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-gray-100">
        Đang tải thông tin người dùng...
      </div>
    );
  }

  let role: AdminRole;

  if (user?.role === "Admin") {
    role = "Admin";
  } else {
    console.warn("Vai trò không hợp lệ cho layout Admin.");
    logout();
    role = "Admin"; // fallback
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar role={role} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-800 text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
