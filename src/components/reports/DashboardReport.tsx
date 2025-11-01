"use client";

import React, { useEffect } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { TableReport } from "@/components/reports/TableReport";

export const DashboardReport = () => {
  const { summary, trend, loading, error, fetchTrend } = useDashboard();

  useEffect(() => {
    // Mặc định lấy xu hướng 30 ngày gần nhất
    fetchTrend();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-400 py-6">Đang tải dữ liệu...</p>
    );
  if (error) return <p className="text-center text-red-500 py-6">{error}</p>;

  return (
    <div className="space-y-8">
      {/* 🟦 Tổng quan dashboard */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
            <p className="text-gray-400">Tổng đơn hàng</p>
            <p className="text-2xl font-semibold text-white">
              {summary.totalOrders}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
            <p className="text-gray-400">Đã giao</p>
            <p className="text-2xl font-semibold text-green-400">
              {summary.delivered}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
            <p className="text-gray-400">Top đại lý</p>
            <ul className="mt-2 space-y-1">
              {summary.topDealers.map((dealer, idx) => (
                <li key={idx} className="flex justify-between text-gray-200">
                  <span>{dealer.id}</span>
                  <span className="font-medium">{dealer.orders}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 📊 Bảng xu hướng đơn hàng */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            📈 Xu hướng đơn hàng
          </h3>
          <span className="text-sm text-gray-400">
            (Hiển thị theo ngày gần nhất)
          </span>
        </div>

        <TableReport
          data={trend}
          getRowKey={(r) => r._id}
          columns={[
            {
              key: "_id",
              label: "Ngày",
              render: (v) => new Date(v as string).toLocaleDateString("vi-VN"),
            },
            {
              key: "orders",
              label: "Số lượng đơn",
              align: "center",
            },
          ]}
        />
      </div>
    </div>
  );
};
