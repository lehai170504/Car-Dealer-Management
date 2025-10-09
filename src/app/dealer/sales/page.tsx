// src/app/(dealer)/sales/page.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Import các component đã được chỉnh sửa Dark Theme
import { SalesOrderTable } from "@/components/dealer/SalesOrderTable";
import { QuoteTable } from "@/components/dealer/QuoteTable";
import { DeliverySchedule } from "@/components/dealer/DeliverySchedule";

export default function SalesPage() {
  return (
    // Container chính với màu chữ sáng
    <div className="space-y-6 text-gray-100">
      {/* Header và Nút Tạo Mới */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-50">Quản lý Bán hàng</h1>

        {/* Nút Tạo Mới - Primary Dark Theme */}
        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white shadow-lg"
          onClick={() => console.log("Tạo Báo giá/Đơn hàng mới")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tạo Báo giá/Đơn hàng
        </Button>
      </div>

      <Tabs defaultValue="quotes" className="w-full">
        {/* TABS LIST - Dark Theme */}
        <TabsList className="grid w-full grid-cols-3 bg-gray-700 border border-gray-600">
          <TabsTrigger
            value="quotes"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Báo giá (Quote)
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Đơn hàng (Order)
          </TabsTrigger>
          <TabsTrigger
            value="delivery"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Giao xe (Delivery)
          </TabsTrigger>
        </TabsList>

        {/* TAB: Báo giá */}
        <TabsContent value="quotes" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Danh sách Báo giá
          </h2>
          <QuoteTable />
        </TabsContent>

        {/* TAB: Đơn hàng */}
        <TabsContent value="orders" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Danh sách Đơn hàng
          </h2>
          <SalesOrderTable />
        </TabsContent>

        {/* TAB: Giao xe */}
        <TabsContent value="delivery" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Lịch trình Giao xe
          </h2>
          <DeliverySchedule />
        </TabsContent>
      </Tabs>
    </div>
  );
}
