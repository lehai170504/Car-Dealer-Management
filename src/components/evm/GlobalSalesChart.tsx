// src/components/evm/GlobalSalesChart.tsx
import { BarChart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu (Số lượng xe bán ra)
const salesTrend = [
  { month: 'Tháng 5', actual: 80, target: 100 },
  { month: 'Tháng 6', actual: 110, target: 110 },
  { month: 'Tháng 7', actual: 130, target: 120 },
  { month: 'Tháng 8', actual: 145, target: 150 },
  { month: 'Tháng 9', actual: 160, target: 160 },
  { month: 'Tháng 10 (QTD)', actual: 50, target: 170 },
];

export function EVM_GlobalSalesChart() {
  const maxSales = Math.max(...salesTrend.map(d => Math.max(d.actual, d.target))) * 1.1;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm font-medium text-gray-700">
        <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
            Doanh số Thực tế (Xe/Tháng)
        </div>
        <Badge variant="default">Tăng trưởng YoY: +15%</Badge>
      </div>

      {/* Vùng mô phỏng Biểu đồ cột */}
      <div className="flex justify-around items-end h-[250px] p-4 border rounded-lg bg-white">
        {salesTrend.map((data) => (
          <div key={data.month} className="flex flex-col items-center h-full justify-end w-1/8 mx-2">
            {/* Cột Actual */}
            <div 
              className="w-8 rounded-t-lg bg-blue-600 transition-all relative"
              style={{ height: `${(data.actual / maxSales) * 100}%` }}
            >
            </div>
            {/* Điểm Target (mô phỏng đường ngang) */}
            <div 
              className="w-10 h-1 bg-red-400 absolute transition-all"
              style={{ bottom: `${(data.target / maxSales) * 250}px` }} 
              title={`Mục tiêu: ${data.target} Xe`}
            />
            
            <span className="mt-2 text-xs font-medium text-gray-600">{data.month}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center text-xs space-x-4 pt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 mr-1.5 rounded" />
            <span>Thực tế</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-1 bg-red-400 mr-1.5" />
            <span>Mục tiêu</span>
          </div>
      </div>
    </div>
  );
}