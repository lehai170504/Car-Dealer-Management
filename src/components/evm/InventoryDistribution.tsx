// src/components/evm/InventoryDistribution.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Send, BarChart } from "lucide-react";

// Dữ liệu mẫu (Số lượng xe)
const inventoryData = [
  { model: 'EV Model X LR', totalStock: 50, allocated: 35, available: 15, onOrder: 10 },
  { model: 'EV Model Y Standard', totalStock: 120, allocated: 80, available: 40, onOrder: 50 },
  { model: 'EV Model Z City', totalStock: 80, allocated: 75, available: 5, onOrder: 0 },
];

export function EVM_InventoryDistribution() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mẫu xe/Phiên bản</TableHead>
            <TableHead className="text-center">Tồn kho Tổng</TableHead>
            <TableHead className="text-center">Đã phân bổ</TableHead>
            <TableHead className="text-center">Khả dụng Phân bổ</TableHead>
            <TableHead className="text-center">Đang đặt hàng/SX</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{data.model}</TableCell>
              <TableCell className="text-center font-bold text-blue-600">{data.totalStock}</TableCell>
              <TableCell className="text-center">{data.allocated}</TableCell>
              <TableCell className={`text-center font-semibold ${data.available < 10 ? 'text-red-500' : 'text-green-600'}`}>
                {data.available}
              </TableCell>
              <TableCell className="text-center text-gray-500">{data.onOrder}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline" onClick={() => console.log('Xem chi tiết phân bổ', data.model)}>
                  <BarChart className="h-4 w-4" />
                </Button>
                {data.available > 0 && (
                    <Button size="sm" onClick={() => console.log('Phân bổ mới', data.model)}>
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