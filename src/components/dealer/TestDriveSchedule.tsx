// src/components/dealer/TestDriveSchedule.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, XCircle } from "lucide-react";

// Dữ liệu mẫu
const testDrives = [
  { id: 101, customerName: 'Phạm Thanh D', model: 'EV Model X', date: '2025-10-15', time: '10:00', status: 'Đã xác nhận' },
  { id: 102, customerName: 'Hoàng Kim E', model: 'EV Model Y', date: '2025-10-16', time: '14:30', status: 'Chờ xử lý' },
  { id: 103, customerName: 'Vũ Văn F', model: 'EV Model X', date: '2025-10-14', time: '09:00', status: 'Đã hoàn thành' },
];

export function TestDriveSchedule() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Đã xác nhận': return 'default';
      case 'Chờ xử lý': return 'secondary';
      case 'Đã hoàn thành': return 'success'; // Giả định có variant success
      default: return 'outline';
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã Hẹn</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Mẫu xe</TableHead>
            <TableHead>Ngày hẹn</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testDrives.map((drive) => (
            <TableRow key={drive.id}>
              <TableCell>{drive.id}</TableCell>
              <TableCell>{drive.customerName}</TableCell>
              <TableCell>{drive.model}</TableCell>
              <TableCell>{drive.date}</TableCell>
              <TableCell>{drive.time}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(drive.status) as any}>
                  {drive.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                {drive.status === 'Chờ xử lý' && (
                  <>
                    <Button size="sm" onClick={() => console.log('Xác nhận', drive.id)}>
                      <CalendarCheck className="mr-2 h-4 w-4" /> Xác nhận
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => console.log('Hủy', drive.id)}>
                      <XCircle className="mr-2 h-4 w-4" /> Hủy
                    </Button>
                  </>
                )}
                {/* Thêm các hành động khác nếu cần */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}