"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealerTable } from "@/components/dealers/DealerList";
import { DebtTable } from "@/components/debt/DebtTable";
import { ContractTable } from "@/components/contracts/ContractTable";

export default function EVM_DealerPage() {
  return (
    <div className="space-y-6 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-sky-500">Quản lý Đại lý</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-700 border border-gray-600">
          <TabsTrigger
            value="list"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Tài khoản Người dùng
          </TabsTrigger>
          <TabsTrigger
            value="finance"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Công nợ & Tài chính
          </TabsTrigger>
          <TabsTrigger
            value="accounts"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
          >
            Danh sách & Hợp đồng
          </TabsTrigger>
        </TabsList>

        {/* Danh sách đại lý */}
        <TabsContent value="list" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Danh sách Đại lý và Hiệu suất
          </h2>
          <DealerTable />
        </TabsContent>

        {/* Công nợ */}
        <TabsContent value="finance" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Quản lý Công nợ
          </h2>
          <DebtTable />
        </TabsContent>

        {/* Hợp đồng */}
        <TabsContent value="accounts" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Quản lý Hợp đồng
          </h2>
          <ContractTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
