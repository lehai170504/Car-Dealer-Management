'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Import các component sẽ được tạo sau
import { VehicleCatalog } from "@/components/dealer/VehicleCatalog";
import { VehicleComparisonTool } from "@/components/dealer/VehicleComparisonTool";
import { PriceList } from "@/components/dealer/PriceList";

export default function CatalogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Truy vấn Thông tin Xe</h1>
        {/* Thanh tìm kiếm nhanh */}
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Tìm kiếm theo Model, Phiên bản..." className="pl-10" />
        </div>
      </div>
      
      <Tabs defaultValue="catalog" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="catalog">Danh mục Xe & Cấu hình</TabsTrigger>
          <TabsTrigger value="comparison">So sánh Mẫu xe</TabsTrigger>
          <TabsTrigger value="price">Bảng giá Bán</TabsTrigger>
        </TabsList>
        
        {/* TAB: Danh mục Xe & Cấu hình (Xem chi tiết, Ảnh, Spec) */}
        <TabsContent value="catalog" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Danh sách các Model và Phiên bản</h2>
          <VehicleCatalog /> 
        </TabsContent>
        
        {/* TAB: So sánh Mẫu xe (Chọn 2-3 mẫu để so sánh Spec và Giá) */}
        <TabsContent value="comparison" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Công cụ So sánh Mẫu xe</h2>
          <VehicleComparisonTool /> 
        </TabsContent>

        {/* TAB: Bảng giá Bán (Giá niêm yết, các options tính giá) */}
        <TabsContent value="price" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Bảng giá Bán lẻ Đề xuất (theo đại lý)</h2>
          <PriceList /> 
        </TabsContent>
      </Tabs>
    </div>
  );
}