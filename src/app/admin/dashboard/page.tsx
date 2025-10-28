"use client";

import { DollarSign, Users, Car, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useReports } from "@/hooks/useReports";
import { SalesPerformanceChart } from "@/components/dealer/SalesPerformanceChart";
import { LeadSourceChart } from "@/components/dealer/LeadSourceChart";
import { InventoryStatusTable } from "@/components/reports/InventoryStatusTable";

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  description,
}) => (
  <Card className="bg-gray-800 border-gray-700 shadow-xl transition-shadow hover:shadow-sky-900">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">
        {title}
      </CardTitle>
      <span className="text-sky-400">{icon}</span>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-gray-50">{value}</div>
      <p className="text-xs text-emerald-400 mt-1">{description}</p>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const { inventoryReport, debtReport, loading, error } = useReports();

  // KPI từ API
  const totalSales = debtReport?.summary.totalDebt ?? 0;
  const totalOrders = inventoryReport?.summary.totalItems ?? 0;
  const lowStock = inventoryReport?.summary.lowStockItems ?? 0;
  const outOfStock = inventoryReport?.summary.outOfStockItems ?? 0;

  return (
    <div className="space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold text-gray-50">Dashboard Đại lý</h1>
      <p className="text-gray-400">
        Tổng quan về hiệu suất bán hàng, khách hàng và tồn kho.
      </p>

      {loading && <p className="text-gray-400">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Row 1: KPI */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Tổng nợ Dealers"
          value={`${totalSales.toLocaleString()} VNĐ`}
          icon={<DollarSign className="h-4 w-4" />}
          description="Cập nhật từ báo cáo nợ"
        />
        <KpiCard
          title="Tổng số xe tồn kho"
          value={`${totalOrders} xe`}
          icon={<Car className="h-4 w-4" />}
          description="Cập nhật từ báo cáo tồn kho"
        />
        <KpiCard
          title="Xe sắp hết kho"
          value={`${lowStock} xe`}
          icon={<Users className="h-4 w-4" />}
          description="Số xe có lượng thấp"
        />
        <KpiCard
          title="Xe hết kho"
          value={`${outOfStock} xe`}
          icon={<CalendarCheck className="h-4 w-4" />}
          description="Cần bổ sung ngay"
        />
      </div>

      <Separator className="bg-gray-700" />

      {/* Row 2: Charts */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-200">
              Hiệu suất Bán hàng (3 tháng gần nhất)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SalesPerformanceChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-200">
              Phân bổ Lead theo Nguồn
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-60px)]">
            <LeadSourceChart />
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Inventory Table */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-200">
              Tình trạng Tồn kho & Tốc độ tiêu thụ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InventoryStatusTable data={inventoryReport?.allInventory ?? []} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-200">
              Công việc Cần làm
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {/* Nhắc nhở tĩnh, có thể bổ sung động từ API sau */}
            <div className="border-l-4 border-red-500 pl-3 p-2 bg-gray-700/50 rounded-sm">
              <p className="font-semibold text-red-400">2 Khiếu nại cấp Cao</p>
              <p className="text-xs text-gray-400">
                Cần phản hồi trong hôm nay.
              </p>
            </div>
            <div className="border-l-4 border-amber-500 pl-3 p-2 bg-gray-700/50 rounded-sm">
              <p className="font-semibold text-amber-300">
                1 Báo giá sắp hết hạn
              </p>
              <p className="text-xs text-gray-400">Liên hệ khách hàng KH001.</p>
            </div>
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
