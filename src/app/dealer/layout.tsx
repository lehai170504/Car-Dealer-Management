"use client";

import { Sidebar } from "@/components/commons/Sidebar";
import { Header } from "@/components/commons/Header"; // Header dark theme có prop title
import { usePathname } from "next/navigation";
import { useMemo } from "react";

/**
 * Hàm tạo tiêu đề tự động từ đường dẫn
 * Ví dụ: /dealer/vehicles -> "Quản lý xe"
 */
function getPageTitle(pathname: string): string {
  if (pathname.includes("vehicles")) return "Quản lý xe";
  if (pathname.includes("customers")) return "Quản lý khách hàng";
  if (pathname.includes("orders")) return "Đơn hàng của đại lý";
  if (pathname.includes("profile")) return "Hồ sơ đại lý";
  if (pathname.includes("dashboard")) return "Bảng điều khiển";
  return "Khu vực đại lý";
}

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Tự động đổi title theo trang
  const title = useMemo(() => getPageTitle(pathname), [pathname]);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar tối */}
      <div className="w-64 flex-shrink-0">
        <Sidebar role="dealer" />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header có tiêu đề động */}
        <Header title={title} />

        {/* Nội dung chính */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-800 text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
