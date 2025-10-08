// src/components/dealer/InventoryStatusTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu (Tốc độ tiêu thụ: Day Supply - Số ngày bán hết tồn kho hiện tại)
const inventoryData = [
  { model: 'EV Model X LR', available: 5, pending: 2, daySupply: 45, status: 'Cần nhập thêm' },
  { model: 'EV Model Y Standard', available: 12, pending: 4, daySupply: 70, status: 'Ổn định' },
  { model: 'EV Model Y Performance', available: 3, pending: 1, daySupply: 30, status: 'Thấp' },
  { model: 'EV Model Z City', available: 20, pending: 8, daySupply: 90, status: 'Tốt' },
];

export function InventoryStatusTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Cần nhập thêm': return <Badge variant="destructive">{status}</Badge>;
      case 'Thấp': return <Badge variant="secondary">{status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mẫu xe</TableHead>
          <TableHead className="text-center">Có sẵn</TableHead>
          <TableHead className="text-center">Đang đặt cọc</TableHead>
          <TableHead className="text-right">Tốc độ tiêu thụ (Ngày)</TableHead>
          <TableHead>Đánh giá</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventoryData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.model}</TableCell>
            <TableCell className="text-center">{item.available}</TableCell>
            <TableCell className="text-center text-blue-600">{item.pending}</TableCell>
            <TableCell className="text-right font-mono">{item.daySupply}</TableCell>
            <TableCell>{getStatusBadge(item.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}