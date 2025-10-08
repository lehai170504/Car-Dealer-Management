// src/app/(dealer)/dashboard/page.tsx
'use client';

import { DollarSign, Users, Car, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Import các component con (sẽ được tạo ở phần 2)
import { SalesPerformanceChart } from "@/components/dealer/SalesPerformanceChart";
import { LeadSourceChart } from "@/components/dealer/LeadSourceChart";
import { InventoryStatusTable } from "@/components/dealer/InventoryStatusTable";


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

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Đại lý</h1>
      <p className="text-gray-600">Tổng quan về hiệu suất bán hàng, khách hàng và tồn kho.</p>

      {/* Row 1: Key Performance Indicators (KPIs) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Doanh số Tháng này"
          value="1.2 Tỷ VNĐ"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="+20.1% so với tháng trước"
        />
        <KpiCard
          title="Đơn hàng Mới"
          value="15 đơn"
          icon={<Car className="h-4 w-4 text-muted-foreground" />}
          description="5 đơn đã chuyển cọc thành công"
        />
        <KpiCard
          title="Khách hàng tiềm năng Mới"
          value="45 Leads"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="30% được tạo qua Lái thử"
        />
        <KpiCard
          title="Lịch hẹn Lái thử Hôm nay"
          value="3 lịch hẹn"
          icon={<CalendarCheck className="h-4 w-4 text-muted-foreground" />}
          description="1 lịch chưa xác nhận"
        />
      </div>

      <Separator />

      {/* Row 2: Charts and Tables (Bán hàng & Hiệu suất) */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Biểu đồ Doanh số (Lớn) */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Hiệu suất Bán hàng (3 tháng gần nhất)</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesPerformanceChart />
          </CardContent>
        </Card>

        {/* Biểu đồ Nguồn Khách hàng (Nhỏ) */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Phân bổ Lead theo Nguồn</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadSourceChart />
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Tồn kho */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Bảng Tồn kho (Chỉ tập trung vào những mẫu quan trọng) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tình trạng Tồn kho & Tốc độ tiêu thụ</CardTitle>
          </CardHeader>
          <CardContent>
            <InventoryStatusTable />
          </CardContent>
        </Card>

        {/* Thẻ nhắc nhở/Hỗ trợ */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Công việc Cần làm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="border-l-4 border-red-500 pl-3">
              <p className="font-semibold">2 Khiếu nại cấp Cao</p>
              <p className="text-xs text-muted-foreground">Cần phản hồi trong hôm nay.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3">
              <p className="font-semibold">1 Báo giá sắp hết hạn</p>
              <p className="text-xs text-muted-foreground">Liên hệ khách hàng KH001.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}