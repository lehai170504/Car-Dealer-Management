"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Import các component đã được chỉnh sửa Dark Theme
import { VehicleCatalog } from "@/components/dealer/VehicleCatalog";
import { VehicleComparisonTool } from "@/components/dealer/VehicleComparisonTool";
import { PriceList } from "@/components/dealer/PriceList";

export default function CatalogPage() {
  return (
    // Container chính với nền tối
    <div className="space-y-6 p-6 bg-gray-800 text-gray-100 min-h-screen">
      {/* Header và Thanh tìm kiếm */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-50">
          Truy vấn Thông tin Xe
        </h1>

        {/* Thanh tìm kiếm nhanh - Dark Theme */}
        <div className="relative w-1/3 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm theo Model, Phiên bản..."
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-500 focus:border-sky-500"
          />
        </div>
      </div>

      <Tabs defaultValue="catalog" className="w-full">
        {/* TABS LIST - Dark Theme */}
        <TabsList className="grid w-full grid-cols-3 bg-gray-700 border border-gray-600">
          <TabsTrigger
            value="catalog"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Danh mục Xe & Cấu hình
          </TabsTrigger>
          <TabsTrigger
            value="comparison"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            So sánh Mẫu xe
          </TabsTrigger>
          <TabsTrigger
            value="price"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Bảng giá Bán
          </TabsTrigger>
        </TabsList>

        {/* TAB: Danh mục Xe & Cấu hình */}
        <TabsContent value="catalog" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Danh sách các Model và Phiên bản
          </h2>
          <VehicleCatalog />
        </TabsContent>

        {/* TAB: So sánh Mẫu xe */}
        <TabsContent value="comparison" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Công cụ So sánh Mẫu xe
          </h2>
          <VehicleComparisonTool />
        </TabsContent>

        {/* TAB: Bảng giá Bán */}
        <TabsContent value="price" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Bảng giá Bán lẻ Đề xuất (theo đại lý)
          </h2>
          <PriceList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
