// src/components/dealer/CustomerTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Edit, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

// Dữ liệu mẫu
const customers = [
  { id: 'KH001', name: 'Nguyễn Văn A', phone: '0901xxxxxx', email: 'a.nguyen@mail.com', status: 'Tiềm năng', source: 'Website' },
  { id: 'KH002', name: 'Trần Thị B', phone: '0988xxxxxx', email: 'b.tran@mail.com', status: 'Đã mua', source: 'Showroom' },
  { id: 'KH003', name: 'Lê Văn C', phone: '0912xxxxxx', email: 'c.le@mail.com', status: 'Chăm sóc', source: 'Facebook Ads' },
];

export function CustomerTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Tìm kiếm theo tên, SĐT..." className="pl-10" />
        </div>
        {/* Nút export/filter có thể thêm vào đây */}
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã KH</TableHead>
              <TableHead>Tên Khách hàng</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Nguồn</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant={customer.status === 'Đã mua' ? 'default' : customer.status === 'Tiềm năng' ? 'outline' : 'secondary'}
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>{customer.source}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon" onClick={() => console.log('Xem chi tiết', customer.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => console.log('Chỉnh sửa', customer.id)}>
                    <Edit className="h-4 w-4" />
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