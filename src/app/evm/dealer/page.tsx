"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { EVM_DealerList } from "@/components/evm/DealerList";
import { EVM_FinanceManagement } from "@/components/evm/FinanceManagement";
import { EVM_UserAccountManagement } from "@/components/evm/UserAccountManagement";
import { useState } from "react";
import { CreateDealerModal } from "@/components/evm/CreateDealerModal";

export default function EVM_DealerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-800 p-8 text-gray-100">
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Quản lý Đại lý <span className="text-emerald-400">(EVM)</span>
          </h1>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm Đại lý Mới
          </Button>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-700 rounded-xl p-1 shadow-inner">
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-semibold data-[state=active]:rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              Danh sách & Hợp đồng
            </TabsTrigger>
            <TabsTrigger
              value="finance"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-semibold data-[state=active]:rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              Công nợ & Tài chính
            </TabsTrigger>
            <TabsTrigger
              value="accounts"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-semibold data-[state=active]:rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              Tài khoản Người dùng
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="pt-6">
            <div className="bg-gray-700/50 p-6 rounded-xl shadow-xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-600 pb-2">
                Danh sách Đại lý và Hiệu suất
              </h2>
              <EVM_DealerList />
            </div>
          </TabsContent>

          <TabsContent value="finance" className="pt-6">
            <div className="bg-gray-700/50 p-6 rounded-xl shadow-xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-600 pb-2">
                Quản lý Công nợ và Doanh số theo Đại lý
              </h2>
              <EVM_FinanceManagement />
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="pt-6">
            <div className="bg-gray-700/50 p-6 rounded-xl shadow-xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-600 pb-2">
                Quản lý Tài khoản EVM và Đại lý
              </h2>
              <EVM_UserAccountManagement />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* Modal thêm đại lý */}
      <CreateDealerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
