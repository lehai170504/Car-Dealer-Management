// src/components/evm/EVM_ProductPage.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Import các component EVM (đã được chỉnh sửa sang Dark Theme)
import { EVM_VehicleMasterTable } from "@/components/evm/VehicleMasterTable";
import { EVM_InventoryDistribution } from "@/components/evm/InventoryDistribution";
import { EVM_PricingPolicyTable } from "@/components/evm/PricingPolicyTable";

export default function EVM_ProductPage() {
  return (
    // Áp dụng nền tối cho trang (nếu cần thiết, hoặc để container này trong nền tối)
    <div className="space-y-6 p-6 bg-gray-800 text-gray-100 min-h-screen">
      {/* Tiêu đề trang và Nút Tạo Mới */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-50">
          Quản lý Sản phẩm (EVM)
        </h1>
        <Button
          onClick={() => console.log("Tạo Model/Chính sách mới")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tạo Mới
        </Button>
      </div>

      {/* Tabs Component với Dark Theme */}
      <Tabs defaultValue="master" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-700 h-auto p-1 rounded-lg border border-gray-600">
          <TabsTrigger
            value="master"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-emerald-400 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-gray-50 transition-colors"
          >
            Danh mục Xe
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-emerald-400 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-gray-50 transition-colors"
          >
            Phân bổ Tồn kho
          </TabsTrigger>
          <TabsTrigger
            value="pricing"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-emerald-400 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-600 text-gray-300 hover:text-gray-50 transition-colors"
          >
            Chính sách Giá/KM
          </TabsTrigger>
        </TabsList>

        {/* TAB: Danh mục Xe (Model, Cấu hình, Màu sắc) */}
        <TabsContent value="master" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-50">
            Danh mục Xe Master
          </h2>
          <EVM_VehicleMasterTable />
        </TabsContent>

        {/* TAB: Phân bổ Tồn kho (Tổng, đã phân bổ, khả dụng) */}
        <TabsContent value="inventory" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-50">
            Quản lý & Phân bổ Tồn kho
          </h2>
          <EVM_InventoryDistribution />
        </TabsContent>

        {/* TAB: Chính sách Giá và Khuyến mãi */}
        <TabsContent value="pricing" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-50">
            Thiết lập Chính sách Giá và Khuyến mãi
          </h2>
          <EVM_PricingPolicyTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
