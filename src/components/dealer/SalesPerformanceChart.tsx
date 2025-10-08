// src/components/dealer/SalesPerformanceChart.tsx
import { BarChart, TrendingUp } from "lucide-react";

// Dữ liệu mẫu (Giả lập doanh số thực tế và mục tiêu)
const monthlyData = [
  { month: 'Tháng 8', actual: 950, target: 1000 },
  { month: 'Tháng 9', actual: 1100, target: 1200 },
  { month: 'Tháng 10', actual: 1250, target: 1200 }, // Vượt mục tiêu
];

export function SalesPerformanceChart() {
  const maxSales = Math.max(...monthlyData.map(d => Math.max(d.actual, d.target))) * 1.1;

  return (
    <div className="space-y-4">
      <div className="flex items-center text-sm font-medium text-gray-700">
        <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
        Doanh số thực tế (Tỷ VNĐ) so với Mục tiêu
      </div>

      {/* Vùng mô phỏng Biểu đồ */}
      <div className="flex justify-around items-end h-[250px] p-4 border rounded-lg bg-white">
        {monthlyData.map((data) => (
          <div key={data.month} className="flex flex-col items-center h-full justify-end w-1/4">
            {/* Cột Actual */}
            <div 
              className="w-8 rounded-t-lg bg-blue-500 hover:bg-blue-600 transition-all relative"
              style={{ height: `${(data.actual / maxSales) * 100}%` }}
            >
              <span className="absolute -top-6 text-xs font-semibold text-blue-700">
                {data.actual}
              </span>
            </div>
            {/* Điểm Target (mô phỏng đường ngang) */}
            <div 
              className="w-10 h-1 bg-red-400 absolute transition-all"
              style={{ bottom: `${(data.target / maxSales) * 250}px` }} 
              title={`Mục tiêu: ${data.target} Tỷ`}
            />
            
            <span className="mt-2 text-sm font-medium text-gray-600">{data.month}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center text-xs space-x-4 pt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 mr-1.5 rounded" />
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