// src/components/evm/InventoryOverview.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu (Tốc độ tiêu thụ: Day Supply - Số ngày bán hết tồn kho hiện tại)
const globalInventory = [
  { model: 'EV Model X', totalStock: 50, allocated: 35, daySupply: 45, consumptionRate: 1.1, alert: true },
  { model: 'EV Model Y', totalStock: 120, allocated: 80, daySupply: 70, consumptionRate: 0.9, alert: false },
  { model: 'EV Model Z', totalStock: 80, allocated: 75, daySupply: 30, consumptionRate: 2.5, alert: true }, // Bán quá nhanh
];

export function EVM_InventoryOverview() {
  const totalGlobalStock = globalInventory.reduce((sum, item) => sum + item.totalStock, 0);

  const getDaySupplyStatus = (days: number) => {
    if (days < 40) return { text: 'Rất thấp', variant: 'destructive' };
    if (days >= 40 && days < 60) return { text: 'Trung bình', variant: 'secondary' };
    return { text: 'Tốt', variant: 'default' };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-blue-50 border rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 flex items-center">
            <Clock className="mr-2 h-5 w-5" /> Tồn kho Toàn cầu: <span className="ml-2 text-2xl">{totalGlobalStock}</span> xe
        </h3>
        <p className="text-sm text-gray-700">Tỷ lệ Phân bổ: {Math.round((globalInventory.reduce((s,i) => s + i.allocated, 0) / totalGlobalStock) * 100)}%</p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mẫu xe</TableHead>
              <TableHead className="text-center">Tổng Tồn kho</TableHead>
              <TableHead className="text-center">Đã phân bổ</TableHead>
              <TableHead className="text-center">Tốc độ tiêu thụ (Xe/Tuần)</TableHead>
              <TableHead className="text-center">Day Supply (Ngày)</TableHead>
              <TableHead>Đánh giá</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {globalInventory.map((item, index) => (
              <TableRow key={index} className={item.alert ? 'bg-red-50/50' : ''}>
                <TableCell className="font-medium">{item.model}</TableCell>
                <TableCell className="text-center font-bold text-blue-600">{item.totalStock}</TableCell>
                <TableCell className="text-center">{item.allocated}</TableCell>
                <TableCell className="text-center text-gray-500">{item.consumptionRate}</TableCell>
                <TableCell className="text-center">
                    <Badge variant={getDaySupplyStatus(item.daySupply).variant as any}>
                        {item.daySupply} ngày
                    </Badge>
                </TableCell>
                <TableCell>
                    {item.alert && <AlertTriangle className="h-4 w-4 inline mr-1 text-red-500" />}
                    {getDaySupplyStatus(item.daySupply).text}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}