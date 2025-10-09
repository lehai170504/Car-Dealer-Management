// src/app/(dealer)/layout.tsx
import { Sidebar } from "@/components/commons/Sidebar";
import { Header } from "@/components/commons/Header"; // Header đã được chỉnh sửa Dark Theme

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Container chính với nền tối
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar (Đã được xử lý Dark Theme bên trong) */}
      <div className="w-64 flex-shrink-0">
        <Sidebar role="dealer" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header (Đã được xử lý Dark Theme) */}
        <Header
          title="Quản lý Đại lý"
          role="DEALER_MANAGER"
          userName="Nguyễn Văn A"
        />

        {/* Main Content - Nền tối cho nội dung */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
}
