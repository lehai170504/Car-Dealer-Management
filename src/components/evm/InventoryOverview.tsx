// src/components/evm/InventoryOverview.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu (Tốc độ tiêu thụ: Day Supply - Số ngày bán hết tồn kho hiện tại)
interface InventoryItem {
  model: string;
  totalStock: number;
  allocated: number;
  daySupply: number;
  consumptionRate: number;
  alert: boolean;
}

const globalInventory: InventoryItem[] = [
  {
    model: "EV Model X",
    totalStock: 50,
    allocated: 35,
    daySupply: 45,
    consumptionRate: 1.1,
    alert: true,
  },
  {
    model: "EV Model Y",
    totalStock: 120,
    allocated: 80,
    daySupply: 70,
    consumptionRate: 0.9,
    alert: false,
  },
  {
    model: "EV Model Z",
    totalStock: 80,
    allocated: 75,
    daySupply: 30,
    consumptionRate: 2.5,
    alert: true,
  },
];

export function EVM_InventoryOverview() {
  const totalGlobalStock = globalInventory.reduce(
    (sum, item) => sum + item.totalStock,
    0
  );

  const getDaySupplyStatus = (days: number) => {
    if (days < 40)
      return {
        text: "Rất thấp",
        badgeClass: "bg-red-700 text-white border-red-800",
      };
    if (days >= 40 && days < 60)
      return {
        text: "Trung bình",
        badgeClass: "bg-yellow-600/50 text-yellow-300 border-yellow-700",
      };
    return {
      text: "Tốt",
      badgeClass: "bg-emerald-600/50 text-emerald-300 border-emerald-700",
    };
  };

  return (
    <div className="space-y-4">
      {/* Banner Tổng quan Tồn kho - Dark Theme */}
      <div className="flex items-center justify-between p-4 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-50 flex items-center">
          <Clock className="mr-2 h-5 w-5 text-sky-400" /> Tồn kho Toàn cầu:
          <span className="ml-2 text-2xl font-bold text-sky-400">
            {totalGlobalStock}
          </span>{" "}
          xe
        </h3>
        <p className="text-sm text-gray-400">
          Tỷ lệ Phân bổ:
          <span className="ml-1 font-semibold text-gray-200">
            {Math.round(
              (globalInventory.reduce((s, i) => s + i.allocated, 0) /
                totalGlobalStock) *
                100
            )}
            %
          </span>
        </p>
      </div>

      {/* Bảng với Dark Theme */}
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow className="border-gray-600 hover:bg-gray-700/80">
              <TableHead className="text-gray-200">Mẫu xe</TableHead>
              <TableHead className="text-center text-gray-200">
                Tổng Tồn kho
              </TableHead>
              <TableHead className="text-center text-gray-200">
                Đã phân bổ
              </TableHead>
              <TableHead className="text-center text-gray-200">
                Tốc độ tiêu thụ (Xe/Tuần)
              </TableHead>
              <TableHead className="text-center text-gray-200">
                Day Supply (Ngày)
              </TableHead>
              <TableHead className="text-gray-200">Đánh giá</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {globalInventory.map((item, index) => {
              const status = getDaySupplyStatus(item.daySupply);

              // Highlight dòng nếu có cảnh báo
              const rowClass = item.alert
                ? "border-gray-600 bg-red-800/20 hover:bg-red-800/30 transition-colors"
                : "border-gray-600 hover:bg-gray-700/50 transition-colors";

              return (
                <TableRow key={index} className={rowClass}>
                  <TableCell className="font-medium text-gray-200">
                    {item.model}
                  </TableCell>

                  {/* Tổng Tồn kho */}
                  <TableCell className="text-center font-bold text-sky-400">
                    {item.totalStock}
                  </TableCell>

                  {/* Đã phân bổ */}
                  <TableCell className="text-center text-gray-300">
                    {item.allocated}
                  </TableCell>

                  {/* Tốc độ tiêu thụ */}
                  <TableCell className="text-center text-gray-400">
                    {item.consumptionRate}
                    {item.consumptionRate > 2 && (
                      <TrendingDown className="h-4 w-4 inline ml-1 text-red-500 transform rotate-180" />
                    )}
                  </TableCell>

                  {/* Day Supply */}
                  <TableCell className="text-center">
                    <Badge className={`${status.badgeClass} font-semibold`}>
                      {item.daySupply} ngày
                    </Badge>
                  </TableCell>

                  {/* Đánh giá */}
                  <TableCell className="text-gray-300 font-medium">
                    {item.alert && (
                      <AlertTriangle className="h-4 w-4 inline mr-1 text-red-500" />
                    )}
                    {status.text}
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
