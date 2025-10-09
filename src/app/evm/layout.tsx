import { Sidebar } from "@/components/commons/Sidebar";
import { Header } from "@/components/commons/Header";
import React from "react";

export default function EVMLayout({ children }: { children: React.ReactNode }) {
  return (
    // Tổng thể màn hình với nền tối
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar cho vai trò 'evm' - Nền xám đậm hơn một chút và có border phân cách */}
      <div className="w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700">
        <Sidebar role="evm" />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header với tiêu đề phù hợp. (Giả định Header cũng được thiết kế để hiển thị tốt trên nền tối) */}
        <Header
          title="EVM Portal - Quản trị hệ thống"
          userName="Quản trị EVM"
          role="EVM Admin"
        />

        {/* Nội dung trang - Nền tối (bg-gray-900) và chữ sáng màu (text-gray-100) */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900 text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
