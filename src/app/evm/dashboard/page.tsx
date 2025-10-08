// src/app/(evm)/dashboard/page.tsx
'use client';

import { DollarSign, BarChart3, Car, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Import các component con EVM Dashboard (sẽ được tạo ở phần 2)
import { EVM_GlobalSalesChart } from "@/components/evm/GlobalSalesChart";
import { EVM_DealerRankingTable } from "@/components/evm/DealerRankingTable";
import { EVM_InventoryHealth } from "@/components/evm/InventoryHealth";


interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

// Component thẻ KPI nhỏ
const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function EVM_DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Hãng xe (EVM)</h1>
      <p className="text-gray-600">Tổng quan hiệu suất toàn mạng lưới đại lý và sức khỏe sản phẩm.</p>

      {/* Row 1: Key Performance Indicators (KPIs) - Mức độ EVM */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Doanh số Toàn cầu QTD"
          value="450 Xe"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          description="Đạt 95% Mục tiêu Quý"
        />
        <KpiCard
          title="Tồn kho Toàn cầu"
          value="250 Xe"
          icon={<Car className="h-4 w-4 text-muted-foreground" />}
          description="Day Supply trung bình: 65 ngày"
        />
        <KpiCard
          title="Tình trạng Công nợ"
          value="5/10 Đại lý"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="Đã thanh toán đúng hạn trong tháng"
        />
        <KpiCard
          title="Cảnh báo Chính sách"
          value="2 Chính sách"
          icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
          description="Sắp hết hạn và cần gia hạn/cập nhật"
        />
      </div>

      <Separator />

      {/* Row 2: Charts and Tables (Hiệu suất Bán hàng) */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Biểu đồ Doanh số Toàn mạng lưới (Lớn) */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Hiệu suất Bán hàng Tổng (6 tháng)</CardTitle>
          </CardHeader>
          <CardContent>
            <EVM_GlobalSalesChart />
          </CardContent>
        </Card>

        {/* Bảng Xếp hạng Đại lý (Nhỏ) */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Xếp hạng Đại lý (Top 5 & Bottom 3)</CardTitle>
          </CardHeader>
          <CardContent>
            <EVM_DealerRankingTable />
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Tồn kho & Sức khỏe Sản phẩm */}
      <div className="grid gap-6 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Tổng quan Sức khỏe Tồn kho Sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <EVM_InventoryHealth />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}