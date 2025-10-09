// src/components/dealer/CustomerTable.tsx
import { useState } from "react";
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
import { Search, Edit, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateCustomerModal } from "@/components/dealer/CreateCustomerModal";

// Dữ liệu mẫu
interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "Tiềm năng" | "Đã mua" | "Chăm sóc";
  source: string;
}

const customers: Customer[] = [
  {
    id: "KH001",
    name: "Nguyễn Văn A",
    phone: "0901xxxxxx",
    email: "a.nguyen@mail.com",
    status: "Tiềm năng",
    source: "Website",
  },
  {
    id: "KH002",
    name: "Trần Thị B",
    phone: "0988xxxxxx",
    email: "b.tran@mail.com",
    status: "Đã mua",
    source: "Showroom",
  },
  {
    id: "KH003",
    name: "Lê Văn C",
    phone: "0912xxxxxx",
    email: "c.le@mail.com",
    status: "Chăm sóc",
    source: "Facebook Ads",
  },
  {
    id: "KH004",
    name: "Phạm Thanh D",
    phone: "0977xxxxxx",
    email: "d.pham@mail.com",
    status: "Tiềm năng",
    source: "Giới thiệu",
  },
];

export function CustomerTable() {
  // Hàm lấy class cho Badge dựa trên trạng thái (Dark Theme)
  const getStatusBadgeClasses = (status: Customer["status"]) => {
    switch (status) {
      case "Đã mua":
        return "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700";
      case "Tiềm năng":
        return "bg-sky-600/50 text-sky-300 border-sky-600 hover:bg-sky-600/70";
      case "Chăm sóc":
        return "bg-yellow-600/50 text-yellow-300 border-yellow-600 hover:bg-yellow-600/70";
      default:
        return "bg-gray-600/50 text-gray-300 border-gray-700";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {/* Search */}
        <div className="relative w-1/3 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm theo tên, SĐT..."
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-500 focus:border-sky-500"
          />
        </div>
        {/* Nút thêm khách hàng */}
        <Button
          className="bg-sky-600 hover:bg-sky-700"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm Khách hàng mới
        </Button>
      </div>

      {/* Bảng - Dark Theme */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <Table className="bg-gray-800 text-gray-50">
          <TableHeader className="bg-gray-700/80">
            <TableRow className="border-gray-700 hover:bg-gray-700/80">
              <TableHead className="w-[100px] text-gray-200">Mã KH</TableHead>
              <TableHead className="text-gray-200">Tên Khách hàng</TableHead>
              <TableHead className="text-gray-200">Điện thoại</TableHead>
              <TableHead className="text-gray-200">Email</TableHead>
              <TableHead className="text-gray-200">Trạng thái</TableHead>
              <TableHead className="text-gray-200">Nguồn</TableHead>
              <TableHead className="text-right text-gray-200">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                className="border-gray-700 hover:bg-gray-700/50 transition-colors"
              >
                <TableCell className="font-medium text-gray-100">
                  {customer.id}
                </TableCell>
                <TableCell className="text-gray-300">{customer.name}</TableCell>
                <TableCell className="text-gray-300">
                  {customer.phone}
                </TableCell>
                <TableCell className="text-gray-300">
                  {customer.email}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClasses(customer.status)}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-400">
                  {customer.source}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {/* Nút Xem Chi tiết */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
                    onClick={() => console.log("Xem chi tiết", customer.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {/* Nút Chỉnh sửa */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 text-yellow-400 hover:bg-gray-700 hover:border-yellow-500"
                    onClick={() => console.log("Chỉnh sửa", customer.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal thêm khách hàng */}
      <CreateCustomerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
