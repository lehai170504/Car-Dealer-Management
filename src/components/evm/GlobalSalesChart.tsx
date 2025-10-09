// src/components/evm/GlobalSalesChart.tsx
import { BarChart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu (Số lượng xe bán ra)
interface SalesData {
  month: string;
  actual: number;
  target: number;
}

const salesTrend: SalesData[] = [
  { month: "Tháng 5", actual: 80, target: 100 },
  { month: "Tháng 6", actual: 110, target: 110 },
  { month: "Tháng 7", actual: 130, target: 120 },
  { month: "Tháng 8", actual: 145, target: 150 },
  { month: "Tháng 9", actual: 160, target: 160 },
  { month: "Tháng 10 (QTD)", actual: 50, target: 170 },
];

export function EVM_GlobalSalesChart() {
  // Tính toán giá trị max để chuẩn hóa chiều cao cột
  const maxSales =
    Math.max(...salesTrend.map((d) => Math.max(d.actual, d.target))) * 1.1;

  // Tính toán % tăng trưởng YoY (Mô phỏng)
  const yoyGrowth = "+15%";
  const isPositiveGrowth = yoyGrowth.startsWith("+");

  return (
    <div className="space-y-4 p-4 border border-gray-700 rounded-lg bg-gray-800/80">
      {/* Header và Tăng trưởng */}
      <div className="flex justify-between items-center text-sm font-medium text-gray-400">
        <div className="flex items-center">
          <TrendingUp
            className={`h-4 w-4 mr-2 ${
              isPositiveGrowth ? "text-emerald-400" : "text-red-400"
            }`}
          />
          <span className="text-gray-200">Doanh số Thực tế (Xe/Tháng)</span>
        </div>

        {/* Badge Tăng trưởng */}
        <Badge
          className={`font-semibold ${
            isPositiveGrowth
              ? "bg-emerald-600/50 text-emerald-300 border-emerald-700"
              : "bg-red-600/50 text-red-300 border-red-700"
          }`}
        >
          Tăng trưởng YoY: {yoyGrowth}
        </Badge>
      </div>

      {/* Vùng mô phỏng Biểu đồ cột */}
      {/* Biểu đồ có nền tối sáng hơn nền chung để nổi bật */}
      <div className="flex justify-around items-end h-[250px] p-4 border border-gray-600 rounded-lg bg-gray-700/50 relative">
        {/* Vẽ trục Y (mô phỏng) */}
        <div className="absolute top-0 bottom-0 left-0 w-full border-l border-gray-600/50">
          {/* Vạch ngang (mô phỏng lưới) */}
          <div
            className="absolute w-full border-b border-dashed border-gray-600/50"
            style={{ bottom: "20%" }}
          ></div>
          <div
            className="absolute w-full border-b border-dashed border-gray-600/50"
            style={{ bottom: "40%" }}
          ></div>
          <div
            className="absolute w-full border-b border-dashed border-gray-600/50"
            style={{ bottom: "60%" }}
          ></div>
          <div
            className="absolute w-full border-b border-dashed border-gray-600/50"
            style={{ bottom: "80%" }}
          ></div>
        </div>

        {salesTrend.map((data) => {
          // Kiểm tra xem Actual có đạt Target không
          const isTargetMet = data.actual >= data.target;
          const actualColor = isTargetMet ? "bg-sky-500" : "bg-orange-500"; // Màu cột Actual
          const targetLineHeight = (data.target / maxSales) * 100;

          return (
            <div
              key={data.month}
              className="flex flex-col items-center h-full justify-end w-1/8 mx-3 relative z-10"
            >
              {/* Tooltip Giá trị Actual */}
              <span
                className="text-xs font-bold mb-1 text-gray-50"
                style={{ marginBottom: "5px" }}
              >
                {data.actual}
              </span>

              {/* Cột Actual */}
              <div
                className={`w-10 rounded-t-lg transition-all relative ${actualColor}`}
                style={{ height: `${(data.actual / maxSales) * 100}%` }}
                title={`Thực tế: ${data.actual} Xe`}
              ></div>

              {/* Đường Target (mô phỏng) */}
              <div
                className="w-12 h-0.5 bg-red-400 absolute transition-all"
                // bottom: `${(data.target / maxSales) * 250}px`
                // Sử dụng tính toán tương đối dựa trên chiều cao 100% của parent (h-[250px])
                style={{
                  bottom: `${targetLineHeight}%`,
                  transform: "translateY(-1px)", // Điều chỉnh nhỏ để đường nằm ngang
                }}
                title={`Mục tiêu: ${data.target} Xe`}
              />

              {/* Tên Tháng */}
              <span className="mt-2 text-xs font-medium text-gray-400">
                {data.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chú giải (Legend) */}
      <div className="flex justify-center text-xs space-x-6 pt-2 text-gray-400">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-sky-500 mr-1.5 rounded" />
          <span>Thực tế (Đạt mục tiêu)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 mr-1.5 rounded" />
          <span>Thực tế (Chưa đạt)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-1 bg-red-400 mr-1.5" />
          <span>Mục tiêu</span>
        </div>
      </div>
    </div>
  );
}
