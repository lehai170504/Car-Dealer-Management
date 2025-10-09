// src/components/dealer/FeedbackComplaintTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle } from "lucide-react";

// Dữ liệu mẫu
interface Feedback {
  id: number;
  type: "Khiếu nại" | "Phản hồi";
  customer: string;
  subject: string;
  date: string;
  status: "Mới" | "Đang xử lý" | "Đã đóng";
  priority: "Cao" | "Trung bình" | "Thấp";
}

const feedbacks: Feedback[] = [
  {
    id: 201,
    type: "Khiếu nại",
    customer: "Nguyễn Văn A",
    subject: "Lỗi sạc chậm",
    date: "2025-10-01",
    status: "Đang xử lý",
    priority: "Cao",
  },
  {
    id: 202,
    type: "Phản hồi",
    customer: "Trần Thị B",
    subject: "Hài lòng dịch vụ",
    date: "2025-09-28",
    status: "Đã đóng",
    priority: "Thấp",
  },
  {
    id: 203,
    type: "Khiếu nại",
    customer: "Lê Văn C",
    subject: "Thủ tục giấy tờ",
    date: "2025-10-05",
    status: "Mới",
    priority: "Trung bình",
  },
  {
    id: 204,
    type: "Phản hồi",
    customer: "Phạm Thị D",
    subject: "Đề xuất cải tiến",
    date: "2025-10-06",
    status: "Mới",
    priority: "Trung bình",
  },
];

export function FeedbackComplaintTable() {
  // Mapping Badge cho Trạng thái (Dark Theme)
  const getStatusBadge = (status: Feedback["status"]) => {
    switch (status) {
      case "Mới":
        return (
          <Badge className="bg-red-600 text-white border-red-600 hover:bg-red-700">
            Mới
          </Badge>
        );
      case "Đang xử lý":
        return (
          <Badge className="bg-amber-600/50 text-amber-300 border-amber-600 hover:bg-amber-600/70">
            Đang xử lý
          </Badge>
        );
      case "Đã đóng":
        return (
          <Badge className="bg-emerald-600/50 text-emerald-300 border-emerald-600 hover:bg-emerald-600/70">
            Đã đóng
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-700 text-gray-300 border-gray-600"
          >
            {status}
          </Badge>
        );
    }
  };

  // Mapping cho Ưu tiên (Dark Theme)
  const getPriorityClasses = (priority: Feedback["priority"]) => {
    switch (priority) {
      case "Cao":
        return "font-bold text-red-400";
      case "Trung bình":
        return "font-semibold text-yellow-400";
      case "Thấp":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    // Bảng - Dark Theme
    <div className="border border-gray-700 rounded-lg overflow-hidden shadow-xl">
      <Table className="bg-gray-800 text-gray-50">
        <TableHeader className="bg-gray-700/80">
          <TableRow className="border-gray-700 hover:bg-gray-700/80">
            <TableHead className="text-gray-200">Mã Yêu cầu</TableHead>
            <TableHead className="text-gray-200">Loại</TableHead>
            <TableHead className="text-gray-200">Khách hàng</TableHead>
            <TableHead className="text-gray-200">Tiêu đề</TableHead>
            <TableHead className="text-gray-200">Ngày tạo</TableHead>
            <TableHead className="text-gray-200">Trạng thái</TableHead>
            <TableHead className="text-right text-gray-200">Ưu tiên</TableHead>
            <TableHead className="text-right text-gray-200">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((item) => (
            <TableRow
              key={item.id}
              className="border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <TableCell className="font-medium text-gray-100">
                {item.id}
              </TableCell>
              <TableCell
                className={
                  item.type === "Khiếu nại"
                    ? "font-semibold text-red-300"
                    : "text-sky-300"
                }
              >
                {item.type}
              </TableCell>
              <TableCell className="text-gray-300">{item.customer}</TableCell>
              <TableCell className="text-gray-300">{item.subject}</TableCell>
              <TableCell className="text-gray-400">{item.date}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell
                className={`text-right ${getPriorityClasses(item.priority)}`}
              >
                {item.priority}
              </TableCell>
              <TableCell className="text-right space-x-2">
                {/* Nút Chi tiết/Phản hồi - Outline Dark Theme */}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
                  onClick={() => console.log("Chi tiết/Phản hồi", item.id)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Chi tiết
                </Button>

                {/* Nút Đóng - Primary/Success Dark Theme */}
                {item.status !== "Đã đóng" && (
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => console.log("Đóng yêu cầu", item.id)}
                  >
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
