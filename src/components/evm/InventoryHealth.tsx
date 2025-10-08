// src/components/evm/InventoryHealth.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingDown } from "lucide-react";

// Dữ liệu mẫu
const inventoryHealth = [
  { model: 'EV Model X LR', stock: 50, allocated: 35, daySupply: 45, consumption: 'Cao' },
  { model: 'EV Model Y Standard', stock: 120, allocated: 80, daySupply: 70, consumption: 'Ổn định' },
  { model: 'EV Model Z City', stock: 80, allocated: 75, daySupply: 30, consumption: 'Rất cao' },
];

export function EVM_InventoryHealth() {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-sm font-medium text-gray-700">
        <Zap className="h-4 w-4 mr-2 text-blue-600" />
        Tình trạng Day Supply (Số ngày bán hết tồn kho hiện tại)
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mẫu xe/Phiên bản</TableHead>
              <TableHead className="text-center">Tồn kho Tổng</TableHead>
              <TableHead className="text-center">Đã phân bổ</TableHead>
              <TableHead className="text-center">Day Supply (Ngày)</TableHead>
              <TableHead>Đánh giá Tiêu thụ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryHealth.map((item, index) => (
              <TableRow key={index} className={item.daySupply < 40 ? 'bg-red-50/50' : ''}>
                <TableCell className="font-medium">{item.model}</TableCell>
                <TableCell className="text-center font-bold text-blue-600">{item.stock}</TableCell>
                <TableCell className="text-center">{item.allocated}</TableCell>
                <TableCell className="text-center">
                    <Badge variant={item.daySupply < 40 ? 'destructive' : 'default'}>
                        {item.daySupply} ngày
                    </Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={item.consumption === 'Rất cao' ? 'warning' as any : 'outline'}>
                        {item.consumption}
                    </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}