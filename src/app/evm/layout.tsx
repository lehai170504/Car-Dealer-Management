"use client";

import { Sidebar } from "@/components/commons/Sidebar";
import { Header } from "@/components/commons/Header";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

/**
 * Xác định tiêu đề động theo đường dẫn
 */
function getPageTitle(pathname: string): string {
  if (pathname.includes("vehicles")) return "Quản lý xe - EVM";
  if (pathname.includes("dealers")) return "Quản lý đại lý";
  if (pathname.includes("orders")) return "Đơn hàng hệ thống";
  if (pathname.includes("reports")) return "Báo cáo thống kê";
  if (pathname.includes("profile")) return "Hồ sơ EVM";
  if (pathname.includes("dashboard")) return "Bảng điều khiển EVM";
  return "EVM Portal - Quản trị hệ thống";
}

export default function EVMLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = useMemo(() => getPageTitle(pathname), [pathname]);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar cho vai trò EVM */}
      <div className="w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700">
        <Sidebar role="evm" />
      </div>

      {/* Khu vực chính */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header có tiêu đề động */}
        <Header title={title} />

        {/* Nội dung trang */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900 text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
