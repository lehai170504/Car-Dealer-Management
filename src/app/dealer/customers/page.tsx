"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Import các component đã được chỉnh sửa Dark Theme
import { CustomerTable } from "@/components/dealer/CustomerTable";
import { TestDriveSchedule } from "@/components/dealer/TestDriveSchedule";
import { FeedbackComplaintTable } from "@/components/dealer/FeedbackComplaintTable";

export default function CustomerPage() {
  return (
    // Container chính với màu chữ và khoảng cách phù hợp với Dark Theme
    <div className="space-y-6 text-gray-100">
      {/* Header và Nút Tạo Mới */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-50">Quản lý Khách hàng</h1>

        {/* Nút Tạo Mới - Primary Dark Theme */}
        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white shadow-lg"
          onClick={() => console.log("Tạo Khách hàng mới/Lịch hẹn mới")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tạo Mới
        </Button>
      </div>

      <Tabs defaultValue="customers" className="w-full">
        {/* TABS LIST - Dark Theme */}
        <TabsList className="grid w-full grid-cols-3 bg-gray-700 border border-gray-600">
          <TabsTrigger
            value="customers"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Danh sách Khách hàng
          </TabsTrigger>
          <TabsTrigger
            value="test-drives"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Lịch hẹn Lái thử
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Phản hồi/Khiếu nại
          </TabsTrigger>
        </TabsList>

        {/* TAB: Danh sách Khách hàng */}
        <TabsContent value="customers" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Danh sách Khách hàng tiềm năng & đã mua
          </h2>
          <CustomerTable />
        </TabsContent>

        {/* TAB: Lịch hẹn Lái thử */}
        <TabsContent value="test-drives" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Quản lý Lịch hẹn Lái thử
          </h2>
          <TestDriveSchedule />
        </TabsContent>

        {/* TAB: Phản hồi/Khiếu nại */}
        <TabsContent value="feedback" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Quản lý Phản hồi và Khiếu nại
          </h2>
          <FeedbackComplaintTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
