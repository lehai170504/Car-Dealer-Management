// src/app/(evm)/dashboard/page.tsx
"use client";

import { DollarSign, BarChart3, Car, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Import các component con EVM Dashboard (đã chỉnh sửa Dark Theme)
import { EVM_GlobalSalesChart } from "@/components/evm/GlobalSalesChart";
import { EVM_DealerRankingTable } from "@/components/evm/DealerRankingTable";
import { EVM_InventoryHealth } from "@/components/evm/InventoryHealth";

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

// Component thẻ KPI nhỏ với Dark Theme
const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  description,
}) => (
  <Card className="bg-gray-800 border-gray-700 text-gray-50 shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      {/* Title */}
      <CardTitle className="text-sm font-medium text-gray-400">
        {title}
      </CardTitle>
      {/* Icon (đã được bọc ngoài để chỉnh màu) */}
      <div className="text-gray-500">{icon}</div>
    </CardHeader>
    <CardContent>
      {/* Value */}
      <div className="text-3xl font-bold text-sky-400">{value}</div>
      {/* Description */}
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </CardContent>
  </Card>
);

export default function EVM_DashboardPage() {
  return (
    // Container chính cho nền tối
    <div className="space-y-6 p-6 bg-gray-800 text-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-50">
        Dashboard Hãng xe (EVM)
      </h1>
      <p className="text-gray-400">
        Tổng quan hiệu suất toàn mạng lưới đại lý và sức khỏe sản phẩm.
      </p>

      {/* Row 1: Key Performance Indicators (KPIs) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Doanh số Toàn cầu QTD"
          value="450 Xe"
          icon={<BarChart3 className="h-5 w-5 text-emerald-400" />}
          description="Đạt 95% Mục tiêu Quý (Cần cải thiện 5%)"
        />
        <KpiCard
          title="Tồn kho Toàn cầu"
          value="250 Xe"
          icon={<Car className="h-5 w-5 text-yellow-400" />}
          description="Day Supply trung bình: 65 ngày (Tối ưu)"
        />
        <KpiCard
          title="Tình trạng Công nợ"
          value="5/10 Đại lý"
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
          description="Đã thanh toán đúng hạn trong tháng (50%)"
        />
        <KpiCard
          title="Cảnh báo Chính sách"
          value="2 Chính sách"
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
          description="Sắp hết hạn và cần gia hạn/cập nhật (Khẩn cấp)"
        />
      </div>

      <Separator className="bg-gray-700 my-6" />

      {/* Row 2: Charts and Tables (Hiệu suất Bán hàng) */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Biểu đồ Doanh số Toàn mạng lưới */}
        <Card className="lg:col-span-4 bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-50">
              Hiệu suất Bán hàng Tổng (6 tháng)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EVM_GlobalSalesChart />
          </CardContent>
        </Card>

        {/* Bảng Xếp hạng Đại lý */}
        <Card className="lg:col-span-3 bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-50">
              Xếp hạng Đại lý (Top & Bottom)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Loại bỏ padding mặc định của CardContent nếu component con đã có padding */}
            <EVM_DealerRankingTable />
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Tồn kho & Sức khỏe Sản phẩm */}
      <div className="grid gap-6 lg:grid-cols-1">
        <Card className="bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-50">
              Tổng quan Sức khỏe Tồn kho Sản phẩm
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <EVM_InventoryHealth />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
