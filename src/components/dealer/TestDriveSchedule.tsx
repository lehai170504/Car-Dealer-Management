// src/components/dealer/TestDriveSchedule.tsx
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
import { CalendarCheck, XCircle } from "lucide-react";

// Dữ liệu mẫu
interface TestDrive {
  id: number;
  customerName: string;
  model: string;
  date: string;
  time: string;
  status: "Đã xác nhận" | "Chờ xử lý" | "Đã hoàn thành";
}

const testDrives: TestDrive[] = [
  {
    id: 101,
    customerName: "Phạm Thanh D",
    model: "EV Model X",
    date: "2025-10-15",
    time: "10:00",
    status: "Đã xác nhận",
  },
  {
    id: 102,
    customerName: "Hoàng Kim E",
    model: "EV Model Y",
    date: "2025-10-16",
    time: "14:30",
    status: "Chờ xử lý",
  },
  {
    id: 103,
    customerName: "Vũ Văn F",
    model: "EV Model X",
    date: "2025-10-14",
    time: "09:00",
    status: "Đã hoàn thành",
  },
  {
    id: 104,
    customerName: "Nguyễn Đình G",
    model: "EV Model Y",
    date: "2025-10-18",
    time: "16:00",
    status: "Chờ xử lý",
  },
];

export function TestDriveSchedule() {
  // Hàm lấy class cho Badge dựa trên trạng thái (Dark Theme)
  const getStatusBadgeClasses = (status: TestDrive["status"]) => {
    switch (status) {
      case "Đã xác nhận": // Xanh lá
        return "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700";
      case "Chờ xử lý": // Cam/Vàng
        return "bg-amber-600/50 text-amber-300 border-amber-600 hover:bg-amber-600/70";
      case "Đã hoàn thành": // Xanh dương
        return "bg-sky-600/50 text-sky-300 border-sky-600 hover:bg-sky-600/70";
      default:
        return "bg-gray-600/50 text-gray-300 border-gray-700";
    }
  };

  return (
    // Bảng - Dark Theme
    <div className="border border-gray-700 rounded-lg overflow-hidden shadow-xl">
      <Table className="bg-gray-800 text-gray-50">
        <TableHeader className="bg-gray-700/80">
          <TableRow className="border-gray-700 hover:bg-gray-700/80">
            <TableHead className="text-gray-200">Mã Hẹn</TableHead>
            <TableHead className="text-gray-200">Khách hàng</TableHead>
            <TableHead className="text-gray-200">Mẫu xe</TableHead>
            <TableHead className="text-gray-200">Ngày hẹn</TableHead>
            <TableHead className="text-gray-200">Thời gian</TableHead>
            <TableHead className="text-gray-200">Trạng thái</TableHead>
            <TableHead className="text-right text-gray-200">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testDrives.map((drive) => (
            <TableRow
              key={drive.id}
              className="border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <TableCell className="font-medium text-gray-100">
                {drive.id}
              </TableCell>
              <TableCell className="text-gray-300">
                {drive.customerName}
              </TableCell>
              <TableCell className="text-sky-400 font-semibold">
                {drive.model}
              </TableCell>
              <TableCell className="text-gray-300">{drive.date}</TableCell>
              <TableCell className="text-gray-300">{drive.time}</TableCell>
              <TableCell>
                <Badge className={getStatusBadgeClasses(drive.status)}>
                  {drive.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                {drive.status === "Chờ xử lý" && (
                  <>
                    {/* Nút Xác nhận - Màu Primary Dark Theme */}
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => console.log("Xác nhận", drive.id)}
                    >
                      <CalendarCheck className="mr-2 h-4 w-4" /> Xác nhận
                    </Button>
                    {/* Nút Hủy - Màu Destructive Dark Theme */}
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => console.log("Hủy", drive.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" /> Hủy
                    </Button>
                  </>
                )}
                {drive.status === "Đã xác nhận" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => console.log("Đánh dấu hoàn thành", drive.id)}
                  >
                    Đánh dấu hoàn thành
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
