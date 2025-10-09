// src/app/(dealer)/dashboard/page.tsx
"use client";

import { DollarSign, Users, Car, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Import các component con đã được chỉnh sửa Dark Theme
import { SalesPerformanceChart } from "@/components/dealer/SalesPerformanceChart";
import { LeadSourceChart } from "@/components/dealer/LeadSourceChart";
import { InventoryStatusTable } from "@/components/dealer/InventoryStatusTable";

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

// Component thẻ KPI nhỏ - Chỉnh sửa cho Dark Theme
const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  description,
}) => (
  // Nền thẻ tối, border và shadow nhẹ
  <Card className="bg-gray-800 border-gray-700 shadow-xl transition-shadow hover:shadow-sky-900">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">
        {title}
      </CardTitle>
      {/* Icon được tô màu nổi bật */}
      <span className="text-sky-400">{icon}</span>
    </CardHeader>
    <CardContent>
      {/* Giá trị chính nổi bật */}
      <div className="text-3xl font-bold text-gray-50">{value}</div>
      {/* Mô tả chi tiết */}
      <p className="text-xs text-emerald-400 mt-1">{description}</p>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  return (
    <div className="space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold text-gray-50">Dashboard Đại lý</h1>
      <p className="text-gray-400">
        Tổng quan về hiệu suất bán hàng, khách hàng và tồn kho.
      </p>

      {/* Row 1: Key Performance Indicators (KPIs) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Doanh số Tháng này"
          value="1.2 Tỷ VNĐ"
          // Icon DollarSign sẽ được tô màu sky-400 từ KpiCard
          icon={<DollarSign className="h-4 w-4" />}
          description="+20.1% so với tháng trước"
        />
        <KpiCard
          title="Đơn hàng Mới"
          value="15 đơn"
          icon={<Car className="h-4 w-4" />}
          description="5 đơn đã chuyển cọc thành công"
        />
        <KpiCard
          title="Khách hàng tiềm năng Mới"
          value="45 Leads"
          icon={<Users className="h-4 w-4" />}
          description="30% được tạo qua Lái thử"
        />
        <KpiCard
          title="Lịch hẹn Lái thử Hôm nay"
          value="3 lịch hẹn"
          icon={<CalendarCheck className="h-4 w-4" />}
          description="1 lịch chưa xác nhận"
        />
      </div>

      {/* Separator Dark Theme */}
      <Separator className="bg-gray-700" />

      {/* Row 2: Charts and Tables (Bán hàng & Hiệu suất) */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Biểu đồ Doanh số (Lớn) - Card Dark Theme */}
        <Card className="lg:col-span-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-200">
              Hiệu suất Bán hàng (3 tháng gần nhất)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* SalesPerformanceChart đã được chỉnh sửa Dark Theme */}
            <SalesPerformanceChart />
          </CardContent>
        </Card>

        {/* Biểu đồ Nguồn Khách hàng (Nhỏ) - Card Dark Theme */}
        <Card className="lg:col-span-3 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-200">
              Phân bổ Lead theo Nguồn
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-60px)]">
            {/* LeadSourceChart đã được chỉnh sửa Dark Theme */}
            <LeadSourceChart />
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Tồn kho */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Bảng Tồn kho - Card Dark Theme */}
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-200">
              Tình trạng Tồn kho & Tốc độ tiêu thụ
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* InventoryStatusTable đã được chỉnh sửa Dark Theme */}
            <InventoryStatusTable />
          </CardContent>
        </Card>

        {/* Thẻ nhắc nhở/Công việc Cần làm - Card Dark Theme */}
        <Card className="lg:col-span-1 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-200">
              Công việc Cần làm
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {/* Nhắc nhở 1: Khiếu nại (Đỏ) */}
            <div className="border-l-4 border-red-500 pl-3 p-2 bg-gray-700/50 rounded-sm">
              <p className="font-semibold text-red-400">2 Khiếu nại cấp Cao</p>
              <p className="text-xs text-gray-400">
                Cần phản hồi trong hôm nay.
              </p>
            </div>

            {/* Nhắc nhở 2: Báo giá sắp hết hạn (Vàng) */}
            <div className="border-l-4 border-amber-500 pl-3 p-2 bg-gray-700/50 rounded-sm">
              <p className="font-semibold text-amber-300">
                1 Báo giá sắp hết hạn
              </p>
              <p className="text-xs text-gray-400">Liên hệ khách hàng KH001.</p>
            </div>

            {/* Thêm một mục ví dụ: Kiểm tra giao xe (Xanh lá) */}
            <div className="border-l-4 border-emerald-500 pl-3 p-2 bg-gray-700/50 rounded-sm">
              <p className="font-semibold text-emerald-300">Kiểm tra Giao xe</p>
              <p className="text-xs text-gray-400">Xe SO001 sẵn sàng giao.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
