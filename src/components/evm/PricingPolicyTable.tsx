// src/components/evm/PricingPolicyTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Tag } from "lucide-react";

// Dữ liệu mẫu
const policies = [
  { id: 'P001', name: 'Giá niêm yết Q4/2025', type: 'Giá', applyTo: 'Toàn quốc', startDate: '2025-10-01', endDate: '2025-12-31', status: 'Active' },
  { id: 'KM002', name: 'Ưu đãi Khách hàng thân thiết', type: 'Khuyến mãi', applyTo: 'Miền Bắc', startDate: '2025-10-10', endDate: '2025-11-30', status: 'Active' },
  { id: 'KM003', name: 'Chiết khấu Đặc biệt DL003', type: 'Chiết khấu', applyTo: 'Đại lý DL003', startDate: '2025-11-01', endDate: '2025-11-30', status: 'Draft' },
];

export function EVM_PricingPolicyTable() {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Draft': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã CS</TableHead>
            <TableHead>Tên Chính sách</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead>Áp dụng cho</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.map((policy) => (
            <TableRow key={policy.id}>
              <TableCell className="font-medium">{policy.id}</TableCell>
              <TableCell>{policy.name}</TableCell>
              <TableCell>
                <Badge variant={policy.type === 'Giá' ? 'outline' : 'warning' as any}>{policy.type}</Badge>
              </TableCell>
              <TableCell>{policy.applyTo}</TableCell>
              <TableCell className="text-sm text-gray-600">
                {policy.startDate} - {policy.endDate}
              </TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(policy.status) as any}>{policy.status}</Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline" onClick={() => console.log('Xem chi tiết', policy.id)}>
                  <Tag className="mr-2 h-4 w-4" /> Chi tiết
                </Button>
                {policy.status === 'Draft' && (
                    <Button size="sm" onClick={() => console.log('Xuất bản', policy.id)}>
                      Xuất bản
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