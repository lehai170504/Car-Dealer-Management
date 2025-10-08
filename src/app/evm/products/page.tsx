'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Import các component EVM sẽ được tạo sau
import { EVM_VehicleMasterTable } from "@/components/evm/VehicleMasterTable";
import { EVM_InventoryDistribution } from "@/components/evm/InventoryDistribution";
import { EVM_PricingPolicyTable } from "@/components/evm/PricingPolicyTable";



export default function EVM_ProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý Sản phẩm (EVM)</h1>
        <Button onClick={() => console.log("Tạo Model/Chính sách mới")}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo Mới
        </Button>
      </div>
      
      <Tabs defaultValue="master" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="master">Danh mục Xe</TabsTrigger>
          <TabsTrigger value="inventory">Phân bổ Tồn kho</TabsTrigger>
          <TabsTrigger value="pricing">Chính sách Giá/KM</TabsTrigger>
        </TabsList>
        
        {/* TAB: Danh mục Xe (Model, Cấu hình, Màu sắc) */}
        <TabsContent value="master" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Danh mục Xe Master</h2>
          <EVM_VehicleMasterTable /> 
        </TabsContent>
        
        {/* TAB: Phân bổ Tồn kho (Tổng, đã phân bổ, khả dụng) */}
        <TabsContent value="inventory" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Quản lý & Phân bổ Tồn kho</h2>
          <EVM_InventoryDistribution /> 
        </TabsContent>

        {/* TAB: Chính sách Giá và Khuyến mãi */}
        <TabsContent value="pricing" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Thiết lập Chính sách Giá và Khuyến mãi</h2>
          <EVM_PricingPolicyTable /> 
        </TabsContent>
      </Tabs>
    </div>
  );
}