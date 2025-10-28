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
import { InventoryItem } from "@/types/reports"; // dùng type từ API

interface InventoryStatusTableProps {
  data: InventoryItem[];
}

export function InventoryStatusTable({ data }: InventoryStatusTableProps) {
  const getStatusBadge = (
    status: "Cần nhập thêm" | "Thấp" | "Ổn định" | "Tốt"
  ) => {
    switch (status) {
      case "Cần nhập thêm":
        return (
          <Badge className="bg-red-600 text-white border-red-600 hover:bg-red-700">
            {status}
          </Badge>
        );
      case "Thấp":
        return (
          <Badge className="bg-amber-600/50 text-amber-300 border-amber-600 hover:bg-amber-600/70">
            {status}
          </Badge>
        );
      case "Ổn định":
        return (
          <Badge className="bg-sky-600/50 text-sky-300 border-sky-600 hover:bg-sky-600/70">
            {status}
          </Badge>
        );
      case "Tốt":
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
        {data.map((item) => (
          <TableRow
            key={item._id}
            className="border-gray-700 hover:bg-gray-700/50 transition-colors"
          >
            <TableCell className="font-semibold text-gray-100">
              {item.variant.trim}
            </TableCell>
            <TableCell className="text-center font-bold text-emerald-400">
              {item.quantity}
            </TableCell>
            <TableCell className="text-center font-semibold text-sky-400">
              {item.reserved}
            </TableCell>
            <TableCell className="text-right font-mono text-gray-300">
              {Math.ceil(item.quantity / 1)}
            </TableCell>
            <TableCell>
              {getStatusBadge(item.quantity < 5 ? "Cần nhập thêm" : "Ổn định")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
