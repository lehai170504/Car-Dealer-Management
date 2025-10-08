// src/app/(dealer)/sales/page.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SalesOrderTable } from "@/components/dealer/SalesOrderTable"; 
import { QuoteTable } from "@/components/dealer/QuoteTable"; 
import { DeliverySchedule } from "@/components/dealer/DeliverySchedule";

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý Bán hàng</h1>
        <Button onClick={() => console.log("Tạo mới")}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo Báo giá/Đơn hàng
        </Button>
      </div>

      <Tabs defaultValue="quotes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quotes">Báo giá (Quote)</TabsTrigger>
          <TabsTrigger value="orders">Đơn hàng (Order)</TabsTrigger>
          <TabsTrigger value="delivery">Giao xe (Delivery)</TabsTrigger>
        </TabsList>
        
        {/* TAB: Báo giá (Tạo, Quản lý, Chuyển đổi sang Đơn hàng) */}
        <TabsContent value="quotes" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Danh sách Báo giá</h2>
          {/* Component Bảng Báo giá (dùng shadcn/ui Table/DataTable) */}
          <QuoteTable /> 
        </TabsContent>
        
        {/* TAB: Đơn hàng (Quản lý, Thanh toán, Trả góp) */}
        <TabsContent value="orders" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Danh sách Đơn hàng</h2>
          {/* Component Bảng Đơn hàng */}
          <SalesOrderTable /> 
        </TabsContent>

        {/* TAB: Giao xe (Theo dõi trạng thái, Đặt lịch) */}
        <TabsContent value="delivery" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Lịch trình Giao xe</h2>
          {/* Component Lịch/Bảng theo dõi giao xe */}
          <DeliverySchedule /> 
        </TabsContent>
      </Tabs>
    </div>
  );
}