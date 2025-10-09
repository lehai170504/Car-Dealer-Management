// src/components/evm/PricingPolicyTable.tsx
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
import { Input } from "@/components/ui/input";
import { Calendar, Tag, Search, FileText } from "lucide-react";

interface Policy {
  id: string;
  name: string;
  type: string;
  applyTo: string;
  startDate: string;
  endDate: string;
  status: string;
}

const policies: Policy[] = [
  {
    id: "P001",
    name: "Giá niêm yết Q4/2025",
    type: "Giá",
    applyTo: "Toàn quốc",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
    status: "Active",
  },
  {
    id: "KM002",
    name: "Ưu đãi Khách hàng thân thiết",
    type: "Khuyến mãi",
    applyTo: "Miền Bắc",
    startDate: "2025-10-10",
    endDate: "2025-11-30",
    status: "Active",
  },
  {
    id: "KM003",
    name: "Chiết khấu Đặc biệt DL003",
    type: "Chiết khấu",
    applyTo: "Đại lý DL003",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    status: "Draft",
  },
  {
    id: "P002",
    name: "Giá bán lẻ đề xuất T11",
    type: "Giá",
    applyTo: "Miền Nam",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    status: "Active",
  },
  {
    id: "KM004",
    name: "Chương trình Trade-in",
    type: "Khuyến mãi",
    applyTo: "Toàn quốc",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    status: "Expired",
  },
];

export function EVM_PricingPolicyTable() {
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600";
      case "Draft":
        return "bg-yellow-600/50 text-yellow-300 border-yellow-700 hover:bg-yellow-600/70";
      case "Expired":
        return "bg-gray-600/50 text-gray-400 border-gray-600 hover:bg-gray-600/70";
      default:
        return "bg-gray-700 text-gray-400 border-gray-600";
    }
  };

  const getTypeBadgeClasses = (type: string) => {
    switch (type) {
      case "Giá":
        return "bg-sky-600/50 text-sky-300 border-sky-700 hover:bg-sky-600/70";
      case "Khuyến mãi":
        return "bg-indigo-600/50 text-indigo-300 border-indigo-700 hover:bg-indigo-600/70";
      case "Chiết khấu":
        return "bg-purple-600/50 text-purple-300 border-purple-700 hover:bg-purple-600/70";
      default:
        return "bg-gray-700 text-gray-400 border-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo Mã, Tên Chính sách..."
            className="pl-10 bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-emerald-500"
          />
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md">
          <Tag className="mr-2 h-4 w-4" /> Tạo Chính sách Mới
        </Button>
      </div>

      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow className="border-gray-600 hover:bg-gray-700/80">
              <TableHead className="w-[100px] text-gray-200">Mã CS</TableHead>
              <TableHead className="text-gray-200">Tên Chính sách</TableHead>
              <TableHead className="text-gray-200">Loại</TableHead>
              <TableHead className="text-gray-200">Áp dụng cho</TableHead>
              <TableHead className="text-gray-200">Thời gian</TableHead>
              <TableHead className="text-gray-200">Trạng thái</TableHead>
              <TableHead className="text-right text-gray-200">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy) => (
              <TableRow
                key={policy.id}
                className="border-gray-600 hover:bg-gray-700/50 transition-colors"
              >
                <TableCell className="font-medium text-gray-200">
                  {policy.id}
                </TableCell>
                <TableCell className="text-gray-300">{policy.name}</TableCell>
                <TableCell>
                  <Badge
                    className={`${getTypeBadgeClasses(
                      policy.type
                    )} font-medium`}
                  >
                    {policy.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-400">
                  {policy.applyTo}
                </TableCell>
                <TableCell className="text-sm text-gray-400 flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  {policy.startDate}{" "}
                  <span className="mx-1 text-gray-500">→</span> {policy.endDate}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusBadgeClasses(
                      policy.status
                    )} font-semibold`}
                  >
                    {policy.status === "Active"
                      ? "Đang hoạt động"
                      : policy.status === "Draft"
                      ? "Bản nháp"
                      : "Đã hết hạn"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 text-sky-400 hover:bg-gray-600/50 hover:border-sky-500"
                    onClick={() => console.log("Xem chi tiết", policy.id)}
                    title="Xem chi tiết"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  {policy.status === "Draft" && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                      onClick={() => console.log("Xuất bản", policy.id)}
                    >
                      Xuất bản
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
