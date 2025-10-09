// src/components/dealer/SalesPerformanceChart.tsx
import { BarChart, TrendingUp } from "lucide-react";

// Dữ liệu mẫu (Giả lập doanh số thực tế và mục tiêu)
const monthlyData = [
  { month: "Tháng 8", actual: 950, target: 1000 },
  { month: "Tháng 9", actual: 1100, target: 1200 },
  { month: "Tháng 10", actual: 1250, target: 1200 }, // Vượt mục tiêu
];

export function SalesPerformanceChart() {
  // Tính toán giới hạn trục Y
  const maxSales =
    Math.max(...monthlyData.map((d) => Math.max(d.actual, d.target))) * 1.1;

  return (
    <div className="space-y-4">
      {/* Header - Dark Theme */}
      <div className="flex items-center text-base font-medium text-gray-200">
        <TrendingUp className="h-5 w-5 mr-2 text-emerald-400" />
        Doanh số thực tế (Tỷ VNĐ) so với Mục tiêu
      </div>

      {/* Vùng mô phỏng Biểu đồ - Dark Theme */}
      <div className="flex justify-around items-end h-[250px] p-4 border border-gray-700 rounded-lg bg-gray-800 relative">
        {/* Đường tham chiếu trục Y (Thêm vào để tạo cảm giác biểu đồ chuyên nghiệp hơn) */}
        <div className="absolute top-0 left-0 w-full h-full p-4">
          <div
            className="border-t border-dashed border-gray-700 absolute w-[calc(100%-32px)]"
            style={{ top: "10%" }}
          ></div>
          <div
            className="border-t border-dashed border-gray-700 absolute w-[calc(100%-32px)]"
            style={{ top: "50%" }}
          ></div>
          <div
            className="border-t border-dashed border-gray-700 absolute w-[calc(100%-32px)]"
            style={{ top: "90%" }}
          ></div>
        </div>

        {monthlyData.map((data) => {
          const isTargetMet = data.actual >= data.target;
          // Màu cột thực tế: Xanh lá nếu vượt, Xanh dương nếu chưa
          const barColor = isTargetMet
            ? "bg-emerald-500 hover:bg-emerald-600"
            : "bg-sky-500 hover:bg-sky-600";
          const textColor = isTargetMet ? "text-emerald-400" : "text-sky-400";

          const actualHeight = (data.actual / maxSales) * 100;
          const containerHeight = 250;
          // Vị trí của đường Target, tính từ đáy (bottom: 0px là đáy)
          const targetPosition = (data.target / maxSales) * containerHeight;

          return (
            <div
              key={data.month}
              className="flex flex-col items-center h-full justify-end w-1/4 z-10"
            >
              {/* Cột Actual */}
              <div
                className={`w-8 rounded-t-lg transition-all relative ${barColor}`}
                style={{ height: `${actualHeight}%` }}
              >
                {/* Giá trị trên cột */}
                <span
                  className={`absolute -top-6 text-xs font-bold ${textColor}`}
                >
                  {data.actual}
                </span>
              </div>

              {/* Điểm Target (mô phỏng đường ngang) */}
              <div
                className="w-10 h-1 bg-red-400 absolute transition-all"
                style={{ bottom: `${targetPosition}px` }}
                title={`Mục tiêu: ${data.target} Tỷ`}
              />

              {/* Tên Tháng */}
              <span className="mt-2 text-sm font-medium text-gray-400">
                {data.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chú giải - Dark Theme */}
      <div className="flex justify-center text-sm space-x-6 pt-2 text-gray-300">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-sky-500 mr-1.5 rounded" />
          <span>Thực tế (Chưa đạt)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-500 mr-1.5 rounded" />
          <span>Thực tế (Vượt mục tiêu)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-1 bg-red-400 mr-1.5" />
          <span>Mục tiêu</span>
        </div>
      </div>
    </div>
  );
}
