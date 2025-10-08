// src/components/evm/DealerList.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, FileText, BarChart2 } from "lucide-react";
import { Input } from "@/components/ui/input";

// Dữ liệu mẫu
const dealers = [
  { id: 'DL001', name: 'Đại lý Miền Bắc - HN', region: 'Miền Bắc', contract: '2025-2027', salesTarget: 120, currentSales: 95, status: 'Active' },
  { id: 'DL002', name: 'Đại lý Miền Nam - HCM', region: 'Miền Nam', contract: '2024-2026', salesTarget: 150, currentSales: 130, status: 'Active' },
  { id: 'DL003', name: 'Đại lý Miền Trung - ĐN', region: 'Miền Trung', contract: '2025-2028', salesTarget: 80, currentSales: 60, status: 'Pending' },
];

export function EVM_DealerList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Tìm kiếm theo tên Đại lý, Mã..." className="pl-10" />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã DL</TableHead>
              <TableHead>Tên Đại lý</TableHead>
              <TableHead>Khu vực</TableHead>
              <TableHead>Hợp đồng</TableHead>
              <TableHead className="text-center">Mục tiêu (Xe)</TableHead>
              <TableHead className="text-center">Doanh số QTD (Xe)</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealers.map((dealer) => (
              <TableRow key={dealer.id}>
                <TableCell className="font-medium">{dealer.id}</TableCell>
                <TableCell>{dealer.name}</TableCell>
                <TableCell>{dealer.region}</TableCell>
                <TableCell>{dealer.contract}</TableCell>
                <TableCell className="text-center">{dealer.salesTarget}</TableCell>
                <TableCell className="text-center font-semibold text-blue-600">{dealer.currentSales}</TableCell>
                <TableCell>
                  <Badge variant={dealer.status === 'Active' ? 'default' : 'secondary'}>
                    {dealer.status === 'Active' ? 'Đang hoạt động' : 'Chờ duyệt'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon" onClick={() => console.log('Xem Hợp đồng', dealer.id)}>
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => console.log('Xem Hiệu suất', dealer.id)}>
                    <BarChart2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}