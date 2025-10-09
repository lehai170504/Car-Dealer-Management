// src/components/dealer/InventoryStatusTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu (Tốc độ tiêu thụ: Day Supply - Số ngày bán hết tồn kho hiện tại)
interface InventoryItem {
  model: string;
  available: number;
  pending: number;
  daySupply: number;
  status: "Cần nhập thêm" | "Thấp" | "Ổn định" | "Tốt";
}

const inventoryData: InventoryItem[] = [
  {
    model: "EV Model X LR",
    available: 5,
    pending: 2,
    daySupply: 45,
    status: "Cần nhập thêm",
  },
  {
    model: "EV Model Y Standard",
    available: 12,
    pending: 4,
    daySupply: 70,
    status: "Ổn định",
  },
  {
    model: "EV Model Y Performance",
    available: 3,
    pending: 1,
    daySupply: 30,
    status: "Thấp",
  },
  {
    model: "EV Model Z City",
    available: 20,
    pending: 8,
    daySupply: 90,
    status: "Tốt",
  },
];

export function InventoryStatusTable() {
  // Hàm lấy Badge cho Dark Theme
  const getStatusBadge = (status: InventoryItem["status"]) => {
    switch (status) {
      case "Cần nhập thêm": // Nguy hiểm (Đỏ)
        return (
          <Badge className="bg-red-600 text-white border-red-600 hover:bg-red-700">
            {status}
          </Badge>
        );
      case "Thấp": // Cảnh báo (Cam/Vàng)
        return (
          <Badge className="bg-amber-600/50 text-amber-300 border-amber-600 hover:bg-amber-600/70">
            {status}
          </Badge>
        );
      case "Ổn định": // Trung tính (Xanh dương)
        return (
          <Badge className="bg-sky-600/50 text-sky-300 border-sky-600 hover:bg-sky-600/70">
            {status}
          </Badge>
        );
      case "Tốt": // Tích cực (Xanh lá)
        return (
          <Badge className="bg-emerald-600/50 text-emerald-300 border-emerald-600 hover:bg-emerald-600/70">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-700 text-gray-300 border-gray-600"
          >
            {status}
          </Badge>
        );
    }
  };

  return (
    // Bảng - Dark Theme
    <Table className="bg-gray-800 text-gray-50 border border-gray-700 rounded-lg overflow-hidden">
      <TableHeader className="bg-gray-700/80">
        <TableRow className="border-gray-700 hover:bg-gray-700/80">
          <TableHead className="text-gray-200">Mẫu xe</TableHead>
          <TableHead className="text-center text-gray-200">Có sẵn</TableHead>
          <TableHead className="text-center text-gray-200">
            Đang đặt cọc
          </TableHead>
          <TableHead className="text-right text-gray-200">
            Tốc độ tiêu thụ (Ngày)
          </TableHead>
          <TableHead className="text-gray-200">Đánh giá</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventoryData.map((item, index) => (
          <TableRow
            key={index}
            className="border-gray-700 hover:bg-gray-700/50 transition-colors"
          >
            <TableCell className="font-semibold text-gray-100">
              {item.model}
            </TableCell>

            {/* Tồn kho có sẵn */}
            <TableCell className="text-center font-bold text-emerald-400">
              {item.available}
            </TableCell>

            {/* Đang đặt cọc */}
            <TableCell className="text-center font-semibold text-sky-400">
              {item.pending}
            </TableCell>

            {/* Tốc độ tiêu thụ */}
            <TableCell className="text-right font-mono text-gray-300">
              {item.daySupply}
            </TableCell>

            <TableCell>{getStatusBadge(item.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
