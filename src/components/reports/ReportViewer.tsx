"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ChevronDown } from "lucide-react";
import { useDealers } from "@/hooks/useDealers";
import { useReports } from "@/hooks/useReports";

export const ReportViewer = () => {
  const { filteredDealers } = useDealers();
  const reports = useReports();

  const [dealerId, setDealerId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchAllReports = () => {
    reports.sales.fetchReport({ dealerId, startDate, endDate });
    reports.inventory.fetchReport({ dealerId, startDate, endDate });
    reports.debt.fetchReport({ dealerId, startDate, endDate });
  };

  useEffect(() => {
    fetchAllReports();
  }, []);

  const formatCurrency = (num: number) => `$${num.toLocaleString()}`;

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen text-gray-200">
      {/* Filter Panel */}
      <div className="flex flex-wrap gap-4 items-end bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        {/* Start Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-300 mb-1">
            Ngày bắt đầu
          </label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40 bg-gray-700 text-gray-200 border-gray-600"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-300 mb-1">
            Ngày kết thúc
          </label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40 bg-gray-700 text-gray-200 border-gray-600"
          />
        </div>

        {/* Dealer Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-300 mb-1">
            Đại lý
          </label>
          <select
            value={dealerId}
            onChange={(e) => setDealerId(e.target.value)}
            className="w-48 bg-gray-700 text-gray-200 border border-gray-600 rounded px-2 py-1 appearance-none"
          >
            <option value="">All Dealers</option>
            {filteredDealers.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 sm:mt-0">
          <Button
            className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-md shadow-md transition-colors"
            onClick={fetchAllReports}
          >
            Fetch Reports
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-1">
          {[
            { value: "sales", label: "Báo cáo doanh thu" },
            { value: "inventory", label: "Báo cáo tồn kho" },
            { value: "debt", label: "Báo cáo công nợ" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 text-sm font-medium text-gray-300 data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md hover:bg-gray-700 transition-colors"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* --- SALES --- */}
        <TabsContent value="sales">
          {reports.sales.loading ? (
            <div className="flex items-center gap-2 text-gray-400">
              <Loader2 className="animate-spin" /> Đang tải doanh thu...
            </div>
          ) : reports.sales.error ? (
            <p className="text-red-500">{reports.sales.error}</p>
          ) : reports.sales.data ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Tổng đặt hàng",
                    value: reports.sales.data.summary.totalOrders,
                  },
                  {
                    label: "Tổng doanh thu",
                    value: formatCurrency(
                      reports.sales.data.summary.totalRevenue
                    ),
                  },
                  {
                    label: "Đơn đang chờ",
                    value: reports.sales.data.summary.pendingOrders,
                  },
                  {
                    label: "Đơn đã giao",
                    value: reports.sales.data.summary.deliveredOrders,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-4 bg-gray-800 rounded shadow border border-gray-700"
                  >
                    <p className="text-sm text-gray-400">{s.label}</p>
                    <p className="text-xl font-bold text-sky-400">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="border border-gray-700 rounded-lg overflow-x-auto">
                <Table className="min-w-full text-gray-200">
                  <TableHeader className="bg-gray-800 text-gray-300">
                    <TableRow>
                      <TableHead>Order No</TableHead>
                      <TableHead>Dealer</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Deposit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expected Delivery</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.sales.data.orders.map((o) => (
                      <TableRow
                        key={o._id}
                        className="hover:bg-gray-700/50 transition-colors"
                      >
                        <TableCell>{o.orderNo}</TableCell>
                        <TableCell>{o.dealer.name}</TableCell>
                        <TableCell>{o.customer.fullName}</TableCell>
                        <TableCell>{o.paymentMethod}</TableCell>
                        <TableCell>{formatCurrency(o.deposit)}</TableCell>
                        <TableCell>{o.status}</TableCell>
                        <TableCell>
                          {new Date(o.expectedDelivery).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : null}
        </TabsContent>

        {/* --- INVENTORY --- */}
        <TabsContent value="inventory">
          {reports.inventory.loading ? (
            <div className="flex items-center gap-2 text-gray-400">
              <Loader2 className="animate-spin" /> Đang tải tồn kho...
            </div>
          ) : reports.inventory.error ? (
            <p className="text-red-500">{reports.inventory.error}</p>
          ) : reports.inventory.data ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Items",
                    value: reports.inventory.data.summary.totalItems,
                  },
                  {
                    label: "Total Quantity",
                    value: reports.inventory.data.summary.totalQuantity,
                  },
                  {
                    label: "Low Stock Items",
                    value: reports.inventory.data.summary.lowStockItems,
                  },
                  {
                    label: "Out of Stock Items",
                    value: reports.inventory.data.summary.outOfStockItems,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-4 bg-gray-800 rounded shadow border border-gray-700"
                  >
                    <p className="text-sm text-gray-400">{s.label}</p>
                    <p className="text-xl font-bold text-sky-400">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="border border-gray-700 rounded-lg overflow-x-auto">
                <Table className="min-w-full text-gray-200">
                  <TableHeader className="bg-gray-800 text-gray-300">
                    <TableRow>
                      <TableHead>Owner</TableHead>
                      <TableHead>Variant</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Reserved</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Updated At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.inventory.data.allInventory.map((item) => (
                      <TableRow
                        key={item._id}
                        className="hover:bg-gray-700/50 transition-colors"
                      >
                        <TableCell>{item.owner.name}</TableCell>
                        <TableCell>{item.variant.trim}</TableCell>
                        <TableCell>{item.color.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.reserved}</TableCell>
                        <TableCell>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : null}
        </TabsContent>

        {/* --- DEBT --- */}
        <TabsContent value="debt">
          {reports.debt.loading ? (
            <div className="flex items-center gap-2 text-gray-400">
              <Loader2 className="animate-spin" /> Đang tải công nợ...
            </div>
          ) : reports.debt.error ? (
            <p className="text-red-500">{reports.debt.error}</p>
          ) : reports.debt.data ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Dealers",
                    value: reports.debt.data.summary.totalDealers,
                  },
                  {
                    label: "Dealers With Debt",
                    value: reports.debt.data.summary.dealersWithDebt,
                  },
                  {
                    label: "Total Debt",
                    value: formatCurrency(reports.debt.data.summary.totalDebt),
                  },
                  {
                    label: "Average Debt",
                    value: formatCurrency(
                      reports.debt.data.summary.averageDebt
                    ),
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-4 bg-gray-800 rounded shadow border border-gray-700"
                  >
                    <p className="text-sm text-gray-400">{s.label}</p>
                    <p className="text-xl font-bold text-sky-400">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="border border-gray-700 rounded-lg overflow-x-auto">
                <Table className="min-w-full text-gray-200">
                  <TableHeader className="bg-gray-800 text-gray-300">
                    <TableRow>
                      <TableHead>Dealer ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Total Debt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.debt.data.dealers.map((d) => (
                      <TableRow
                        key={d._id}
                        className="hover:bg-gray-700/50 transition-colors"
                      >
                        <TableCell>{d._id}</TableCell>
                        <TableCell>{d.name}</TableCell>
                        <TableCell>{d.address}</TableCell>
                        <TableCell>
                          {formatCurrency((d as any).outstandingDebt || 0)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
};
