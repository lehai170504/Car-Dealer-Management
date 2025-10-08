// src/app/(evm)/layout.tsx
import { Sidebar } from "@/components/commons/Sidebar";
import { Header } from "@/components/commons/Header";

export default function EVMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar cho vai trò 'evm' */}
      <div className="w-64 flex-shrink-0">
        <Sidebar role="evm" /> 
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header với tiêu đề phù hợp */}
        <Header 
          title="EVM Portal - Quản trị hệ thống" 
          userName="Quản trị EVM" // Có thể tùy chỉnh tên người dùng mặc định
          role="EVM Admin" // Có thể tùy chỉnh vai trò mặc định
        />
        
        {/* Nội dung trang */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}