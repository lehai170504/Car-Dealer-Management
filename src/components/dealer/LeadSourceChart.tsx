// src/components/dealer/LeadSourceChart.tsx
import { PieChart, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu
const leadSources = [
  { source: 'Lái thử (Test Drive)', count: 18, color: 'bg-blue-500' },
  { source: 'Website/Online', count: 12, color: 'bg-green-500' },
  { source: 'Showroom Walk-in', count: 10, color: 'bg-yellow-500' },
  { source: 'Referral/Giới thiệu', count: 5, color: 'bg-red-500' },
];

export function LeadSourceChart() {
  const totalLeads = leadSources.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center text-sm font-medium text-gray-700 mb-4">
        <Zap className="h-4 w-4 mr-2 text-yellow-600" />
        Tổng số Leads mới: {totalLeads}
      </div>

      {/* Vùng mô phỏng Biểu đồ (Giả lập Pie Chart bằng div tròn) */}
      <div className="flex justify-center items-center h-[180px] w-full relative mb-6">
        {/* Đây là một mô phỏng trực quan đơn giản, biểu đồ tròn thực tế cần thư viện */}
        <div className="h-40 w-40 rounded-full bg-gray-200 flex items-center justify-center text-center text-sm text-gray-500 border-4 border-dashed">
            Biểu đồ Tròn
        </div>
      </div>

      {/* Chú giải */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {leadSources.map((item) => (
          <div key={item.source} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
            <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${item.color}`} />
                <span>{item.source}</span>
            </div>
            <span className="font-semibold">{Math.round((item.count / totalLeads) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}