// src/components/evm/InventoryHealth.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingDown } from "lucide-react";

// Dữ liệu mẫu
interface InventoryHealthData {
  model: string;
  stock: number;
  allocated: number;
  daySupply: number;
  consumption: string;
}

const inventoryHealth: InventoryHealthData[] = [
  {
    model: "EV Model X LR",
    stock: 50,
    allocated: 35,
    daySupply: 45,
    consumption: "Cao",
  },
  {
    model: "EV Model Y Standard",
    stock: 120,
    allocated: 80,
    daySupply: 70,
    consumption: "Ổn định",
  },
  {
    model: "EV Model Z City",
    stock: 80,
    allocated: 75,
    daySupply: 30,
    consumption: "Rất cao",
  },
  {
    model: "EV Model A Compact",
    stock: 200,
    allocated: 50,
    daySupply: 150,
    consumption: "Thấp",
  },
];

export function EVM_InventoryHealth() {
  const getDaySupplyBadgeClasses = (daySupply: number) => {
    // Nguy hiểm (Day Supply thấp)
    if (daySupply < 40) {
      return "bg-red-600/50 text-red-300 border-red-700 font-semibold";
    }
    // Tối ưu (Day Supply trung bình, ví dụ 40 - 90 ngày)
    if (daySupply <= 90) {
      return "bg-emerald-600/50 text-emerald-300 border-emerald-700 font-semibold";
    }
    // Cao (Day Supply quá cao, có thể bị tồn kho)
    return "bg-yellow-600/50 text-yellow-300 border-yellow-700 font-semibold";
  };

  const getConsumptionBadgeClasses = (consumption: string) => {
    switch (consumption) {
      case "Rất cao":
        return "bg-red-700 text-white border-red-800 font-semibold";
      case "Cao":
        return "bg-orange-600/50 text-orange-300 border-orange-700";
      case "Ổn định":
        return "bg-sky-600/50 text-sky-300 border-sky-700";
      case "Thấp":
        return "bg-gray-600/50 text-gray-400 border-gray-700";
      default:
        return "bg-gray-700 text-gray-400 border-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      {/* Tiêu đề Day Supply */}
      <div className="flex items-center text-base font-medium text-gray-400">
        <Zap className="h-4 w-4 mr-2 text-sky-400" />
        <span className="text-gray-200">
          Tình trạng Day Supply (Số ngày bán hết tồn kho hiện tại)
        </span>
      </div>

      {/* Bảng với Dark Theme */}
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow className="border-gray-600 hover:bg-gray-700/80">
              <TableHead className="text-gray-200">Mẫu xe/Phiên bản</TableHead>
              <TableHead className="text-center text-gray-200">
                Tồn kho Tổng (Xe)
              </TableHead>
              <TableHead className="text-center text-gray-200">
                Đã phân bổ (Xe)
              </TableHead>
              <TableHead className="text-center text-gray-200">
                Day Supply (Ngày)
              </TableHead>
              <TableHead className="text-gray-200">Đánh giá Tiêu thụ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryHealth.map((item, index) => {
              // Highlight dòng nếu Day Supply thấp (Day Supply < 40)
              const rowClass =
                item.daySupply < 40
                  ? "border-gray-600 bg-red-800/20 hover:bg-red-800/30 transition-colors"
                  : "border-gray-600 hover:bg-gray-700/50 transition-colors";

              return (
                <TableRow key={index} className={rowClass}>
                  <TableCell className="font-medium text-gray-200">
                    {item.model}
                  </TableCell>

                  {/* Tồn kho Tổng - Màu xanh nổi bật */}
                  <TableCell className="text-center font-bold text-sky-400">
                    {item.stock}
                  </TableCell>

                  {/* Đã phân bổ */}
                  <TableCell className="text-center text-gray-300">
                    {item.allocated}
                  </TableCell>

                  {/* Day Supply */}
                  <TableCell className="text-center">
                    <Badge className={getDaySupplyBadgeClasses(item.daySupply)}>
                      {item.daySupply} ngày
                    </Badge>
                  </TableCell>

                  {/* Đánh giá Tiêu thụ */}
                  <TableCell>
                    <Badge
                      className={getConsumptionBadgeClasses(item.consumption)}
                    >
                      {item.consumption}
                    </Badge>
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
