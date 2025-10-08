'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Import các component EVM sẽ được tạo sau
import { EVM_DealerList } from "@/components/evm/DealerList";
import { EVM_FinanceManagement } from "@/components/evm/FinanceManagement";
import { EVM_UserAccountManagement } from "@/components/evm/UserAccountManagement";



export default function EVM_DealerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý Đại lý (EVM)</h1>
        <Button onClick={() => console.log("Thêm Đại lý mới")}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm Đại lý
        </Button>
      </div>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Danh sách & Hợp đồng</TabsTrigger>
          <TabsTrigger value="finance">Công nợ & Tài chính</TabsTrigger>
          <TabsTrigger value="accounts">Tài khoản Người dùng</TabsTrigger>
        </TabsList>
        
        {/* TAB: Danh sách & Hợp đồng */}
        <TabsContent value="list" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Danh sách Đại lý và Hiệu suất</h2>
          <EVM_DealerList /> 
        </TabsContent>
        
        {/* TAB: Công nợ & Tài chính */}
        <TabsContent value="finance" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Quản lý Công nợ và Doanh số theo Đại lý</h2>
          <EVM_FinanceManagement /> 
        </TabsContent>

        {/* TAB: Tài khoản Người dùng */}
        <TabsContent value="accounts" className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Quản lý Tài khoản EVM và Đại lý</h2>
          <EVM_UserAccountManagement /> 
        </TabsContent>
      </Tabs>
    </div>
  );
}