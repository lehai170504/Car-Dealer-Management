// src/components/evm/InventoryDistribution.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Send, BarChart } from "lucide-react";

// Dữ liệu mẫu (Số lượng xe)
interface InventoryData {
  model: string;
  totalStock: number;
  allocated: number;
  available: number;
  onOrder: number;
}

const inventoryData: InventoryData[] = [
  {
    model: "EV Model X LR",
    totalStock: 50,
    allocated: 35,
    available: 15,
    onOrder: 10,
  },
  {
    model: "EV Model Y Standard",
    totalStock: 120,
    allocated: 80,
    available: 40,
    onOrder: 50,
  },
  {
    model: "EV Model Z City",
    totalStock: 80,
    allocated: 75,
    available: 5,
    onOrder: 0,
  },
  {
    model: "EV Model A Compact",
    totalStock: 30,
    allocated: 30,
    available: 0,
    onOrder: 20,
  },
];

export function EVM_InventoryDistribution() {
  return (
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
              Khả dụng Phân bổ (Xe)
            </TableHead>
            <TableHead className="text-center text-gray-200">
              Đang đặt hàng/SX (Xe)
            </TableHead>
            <TableHead className="text-right text-gray-200">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.map((data, index) => (
            <TableRow
              key={index}
              className="border-gray-600 hover:bg-gray-700/50 transition-colors"
            >
              <TableCell className="font-medium text-gray-200">
                {data.model}
              </TableCell>

              {/* Tồn kho Tổng - Màu xanh nổi bật */}
              <TableCell className="text-center font-bold text-sky-400">
                {data.totalStock}
              </TableCell>

              {/* Đã phân bổ */}
              <TableCell className="text-center text-gray-300">
                {data.allocated}
              </TableCell>

              {/* Khả dụng Phân bổ - Màu sắc theo trạng thái */}
              <TableCell
                className={
                  `text-center font-semibold 
                  ${
                    data.available === 0
                      ? "text-red-500" // Hết hàng
                      : data.available < 10
                      ? "text-yellow-400" // Sắp hết
                      : "text-emerald-400"
                  }` // Còn nhiều
                }
              >
                {data.available}
              </TableCell>

              {/* Đang đặt hàng */}
              <TableCell className="text-center text-gray-400">
                {data.onOrder}
              </TableCell>

              {/* Hành động */}
              <TableCell className="text-right space-x-2">
                {/* Button Xem chi tiết/Biểu đồ */}
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-600 text-purple-400 hover:bg-gray-600/50 hover:border-purple-500"
                  onClick={() =>
                    console.log("Xem chi tiết phân bổ", data.model)
                  }
                  title="Xem chi tiết phân bổ"
                >
                  <BarChart className="h-4 w-4" />
                </Button>

                {/* Button Phân bổ - Chỉ hiện khi còn hàng khả dụng */}
                {data.available > 0 && (
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                    onClick={() => console.log("Phân bổ mới", data.model)}
                  >
                    <Send className="mr-2 h-4 w-4" /> Phân bổ
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
