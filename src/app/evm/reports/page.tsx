'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import các component EVM sẽ được tạo sau
import { EVM_SalesByDealer } from "@/components/evm/SalesByDealer";
import { EVM_InventoryOverview } from "@/components/evm/InventoryOverview";


export default function EVM_ReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Báo cáo Tổng hợp (EVM)</h1>
        <Button variant="outline" onClick={() => console.log("Mở bộ lọc")}>
          <Filter className="mr-2 h-4 w-4" />
          Bộ lọc & Export
        </Button>
      </div>
      
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sales">Doanh số & Hiệu suất</TabsTrigger>
          <TabsTrigger value="inventory">Tồn kho Tổng quan</TabsTrigger>
        </TabsList>
        
        {/* TAB: Doanh số & Hiệu suất (theo khu vực, đại lý) */}
        <TabsContent value="sales" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Báo cáo Doanh số Chi tiết</h2>
          <EVM_SalesByDealer /> 
        </TabsContent>
        
        {/* TAB: Tồn kho Tổng quan (tổng tồn, tốc độ bán) */}
        <TabsContent value="inventory" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Báo cáo Tồn kho & Tiêu thụ</h2>
          <EVM_InventoryOverview /> 
        </TabsContent>
      </Tabs>
    </div>
  );
}