'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { CustomerTable } from "@/components/dealer/CustomerTable";
import { TestDriveSchedule } from "@/components/dealer/TestDriveSchedule";
import { FeedbackComplaintTable } from "@/components/dealer/FeedbackComplaintTable";


export default function CustomerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý Khách hàng</h1>
        <Button onClick={() => console.log("Tạo Khách hàng mới/Lịch hẹn mới")}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo Mới
        </Button>
      </div>
      
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Danh sách Khách hàng</TabsTrigger>
          <TabsTrigger value="test-drives">Lịch hẹn Lái thử</TabsTrigger>
          <TabsTrigger value="feedback">Phản hồi/Khiếu nại</TabsTrigger>
        </TabsList>
        
        {/* TAB: Danh sách Khách hàng (Tìm kiếm, Cập nhật thông tin) */}
        <TabsContent value="customers" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Danh sách Khách hàng tiềm năng & đã mua</h2>
          <CustomerTable /> 
        </TabsContent>
        
        {/* TAB: Lịch hẹn Lái thử (Tạo, Quản lý trạng thái) */}
        <TabsContent value="test-drives" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Quản lý Lịch hẹn Lái thử</h2>
          <TestDriveSchedule /> 
        </TabsContent>

        {/* TAB: Phản hồi/Khiếu nại (Ghi nhận, Theo dõi, Giải quyết) */}
        <TabsContent value="feedback" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Quản lý Phản hồi và Khiếu nại</h2>
          <FeedbackComplaintTable /> 
        </TabsContent>
      </Tabs>
    </div>
  );
}