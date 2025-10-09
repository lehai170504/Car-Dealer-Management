// src/components/dealer/LeadSourceChart.tsx
import { PieChart, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu (Cập nhật màu sắc cho Dark Theme nếu cần, giữ nguyên cấu trúc)
const leadSources = [
  // Sử dụng màu sắc sáng hơn để tương phản tốt trên nền tối
  { source: "Lái thử (Test Drive)", count: 18, color: "bg-sky-500" },
  { source: "Website/Online", count: 12, color: "bg-emerald-500" },
  { source: "Showroom Walk-in", count: 10, color: "bg-amber-500" },
  { source: "Referral/Giới thiệu", count: 5, color: "bg-indigo-500" },
];

export function LeadSourceChart() {
  const totalLeads = leadSources.reduce((sum, item) => sum + item.count, 0);

  return (
    // Nền tối cho Card/Container
    <div className="flex flex-col h-full justify-between bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-xl">
      {/* Header và Tổng Leads - Dark Theme */}
      <div className="flex items-center text-base font-medium text-gray-200 mb-4 border-b border-gray-700 pb-2">
        <Zap className="h-5 w-5 mr-2 text-yellow-400" />
        Tổng số Leads mới:{" "}
        <span className="ml-2 font-bold text-sky-400">{totalLeads}</span>
      </div>

      {/* Vùng mô phỏng Biểu đồ (Giả lập Pie Chart bằng div tròn) */}
      <div className="flex justify-center items-center h-[180px] w-full relative mb-6">
        {/* Mô phỏng trực quan - Chỉnh màu nền tối */}
        <div className="h-40 w-40 rounded-full bg-gray-900 flex items-center justify-center text-center text-sm text-gray-500 border-4 border-dashed border-gray-600">
          <PieChart className="h-8 w-8 text-gray-500" />
        </div>
      </div>

      {/* Chú giải - Dark Theme */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {leadSources.map((item) => (
          <div
            key={item.source}
            className="flex items-center justify-between p-2 rounded-md bg-gray-700/60 border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center text-gray-300">
              {/* Dấu chấm màu sắc */}
              <div className={`w-3 h-3 rounded-full mr-2 ${item.color}`} />
              <span>{item.source}</span>
            </div>
            {/* Phần trăm */}
            <span className="font-semibold text-gray-100">
              {Math.round((item.count / totalLeads) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
