// src/components/dealer/FeedbackComplaintTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle } from "lucide-react";

// Dữ liệu mẫu
const feedbacks = [
  { id: 201, type: 'Khiếu nại', customer: 'Nguyễn Văn A', subject: 'Lỗi sạc chậm', date: '2025-10-01', status: 'Đang xử lý', priority: 'Cao' },
  { id: 202, type: 'Phản hồi', customer: 'Trần Thị B', subject: 'Hài lòng dịch vụ', date: '2025-09-28', status: 'Đã đóng', priority: 'Thấp' },
  { id: 203, type: 'Khiếu nại', customer: 'Lê Văn C', subject: 'Thủ tục giấy tờ', date: '2025-10-05', status: 'Mới', priority: 'Trung bình' },
];

export function FeedbackComplaintTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Mới': return <Badge variant="destructive">Mới</Badge>;
      case 'Đang xử lý': return <Badge variant="secondary">Đang xử lý</Badge>;
      case 'Đã đóng': return <Badge variant="default">Đã đóng</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã Yêu cầu</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Ưu tiên</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.customer}</TableCell>
              <TableCell>{item.subject}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell className="text-right">{item.priority}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => console.log('Chi tiết/Phản hồi', item.id)}>
                  <MessageSquare className="mr-2 h-4 w-4" /> Chi tiết
                </Button>
                {item.status !== 'Đã đóng' && (
                  <Button size="sm" onClick={() => console.log('Đóng yêu cầu', item.id)}>
                    <CheckCircle className="mr-2 h-4 w-4" /> Đóng
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