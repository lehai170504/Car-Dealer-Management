// src/app/(dealer)/sales/page.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import { OrderTable } from "@/components/order/SalesOrderTable";
import { QuoteTable } from "@/components/quotes/QuoteTable";
import { PaymentTable } from "@/components/payments/PaymentTable";

export default function SalesPage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="space-y-6 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-50">Quản lý Bán hàng</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="quotes" className="w-full">
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
            Bảng thanh toán (Payment)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quotes" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Danh sách Báo giá
          </h2>
          <QuoteTable />
        </TabsContent>

        <TabsContent value="orders" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Danh sách Đơn hàng
          </h2>
          <OrderTable />
        </TabsContent>

        <TabsContent value="delivery" className="pt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Danh sách thanh toán
          </h2>
          <PaymentTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
