// src/components/evm/SalesByDealer.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, TrendingUp, Filter } from "lucide-react";

// Dữ liệu mẫu (Doanh số là số lượng xe bán ra)
interface SalesData {
  dealer: string;
  region: string;
  target: number;
  actual: number;
  variance: number;
  completion: number;
}

const salesData: SalesData[] = [
  {
    dealer: "DL002 - Miền Nam HCM",
    region: "Miền Nam",
    target: 150,
    actual: 135,
    variance: -15,
    completion: 90,
  },
  {
    dealer: "DL001 - Miền Bắc HN",
    region: "Miền Bắc",
    target: 120,
    actual: 125,
    variance: 5,
    completion: 104,
  },
  {
    dealer: "DL003 - Miền Trung ĐN",
    region: "Miền Trung",
    target: 80,
    actual: 60,
    variance: -20,
    completion: 75,
  },
  {
    dealer: "DL004 - Miền Bắc HP",
    region: "Miền Bắc",
    target: 50,
    actual: 48,
    variance: -2,
    completion: 96,
  },
  {
    dealer: "DL005 - Miền Nam CT",
    region: "Miền Nam",
    target: 90,
    actual: 100,
    variance: 10,
    completion: 111,
  },
];

export function EVM_SalesByDealer() {
  const isTargetMet = (completion: number) => completion >= 100;

  const getCompletionBadgeClasses = (completion: number) => {
    if (completion >= 100) {
      return "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600";
    }
    return "bg-red-600/50 text-red-300 border-red-700 hover:bg-red-600/70";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-50">
          Hiệu suất Bán hàng Quý hiện tại (theo Xe)
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-600 text-sky-400 hover:bg-gray-700/50 hover:border-sky-500"
          onClick={() => console.log("Áp dụng bộ lọc")}
        >
          <Filter className="mr-2 h-4 w-4" /> Lọc theo Khu vực
        </Button>
      </div>

      {/* Bảng với Dark Theme */}
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow className="border-gray-600 hover:bg-gray-700/80">
              <TableHead className="text-gray-200">Đại lý</TableHead>
              <TableHead className="text-gray-200">Khu vực</TableHead>
              <TableHead className="text-center text-gray-200">
                Mục tiêu (Xe)
              </TableHead>
              <TableHead className="text-center text-gray-200">
                Thực đạt (Xe)
              </TableHead>
              <TableHead className="text-center text-gray-200">
                Hoàn thành (%)
              </TableHead>
              <TableHead className="text-right text-gray-200">
                Chênh lệch
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData
              .sort((a, b) => b.completion - a.completion)
              .map((data, index) => {
                const metTarget = isTargetMet(data.completion);
                const rowClass = metTarget
                  ? "border-gray-600 bg-emerald-800/20 hover:bg-emerald-800/30 transition-colors"
                  : "border-gray-600 hover:bg-gray-700/50 transition-colors";

                const varianceClass =
                  data.variance >= 0 ? "text-emerald-400" : "text-red-400";

                return (
                  <TableRow key={index} className={rowClass}>
                    <TableCell className="font-medium text-gray-200">
                      {data.dealer}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {data.region}
                    </TableCell>
                    <TableCell className="text-center text-gray-300">
                      {data.target}
                    </TableCell>

                    {/* Thực đạt */}
                    <TableCell className="text-center font-bold text-sky-400">
                      {data.actual}
                    </TableCell>

                    {/* Hoàn thành */}
                    <TableCell className="text-center">
                      <Badge
                        className={getCompletionBadgeClasses(data.completion)}
                      >
                        {data.completion}%
                      </Badge>
                    </TableCell>

                    {/* Chênh lệch */}
                    <TableCell
                      className={`text-right font-semibold ${varianceClass}`}
                    >
                      {data.variance >= 0 ? `+${data.variance}` : data.variance}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
