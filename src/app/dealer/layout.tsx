// src/app/(dealer)/layout.tsx
import { Sidebar } from "@/components/commons/Sidebar";
import { Header } from "@/components/commons/Header"; // Cần tạo Header component

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar role="dealer" />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Quản lý Đại lý" />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}