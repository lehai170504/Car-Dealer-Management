import React from "react";
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
import { UserPlus, Unlock, Lock } from "lucide-react";

// Dữ liệu mẫu
const accounts = [
  {
    id: 101,
    name: "Phạm Tuấn Anh",
    role: "Dealer Manager",
    dealer: "DL001",
    status: "Active",
    lastLogin: "2025-10-05",
  },
  {
    id: 102,
    name: "Nguyễn Thị Hoa",
    role: "Dealer Staff",
    dealer: "DL002",
    status: "Active",
    lastLogin: "2025-10-06",
  },
  {
    id: 103,
    name: "Lê Văn Khải",
    role: "Dealer Staff",
    dealer: "DL001",
    status: "Inactive",
    lastLogin: "2025-08-20",
  },
  {
    id: 104,
    name: "Trần Minh Hùng",
    role: "EVM Staff",
    dealer: "N/A",
    status: "Active",
    lastLogin: "2025-10-07",
  },
  {
    id: 105,
    name: "Vũ Thanh Mai",
    role: "EVM Manager",
    dealer: "N/A",
    status: "Inactive",
    lastLogin: "2025-09-15",
  },
];

export function EVM_UserAccountManagement() {
  const isAdminOrEVM = (role: string) => role.includes("EVM");

  return (
    // Sử dụng màu nền tối và chữ sáng cho toàn bộ khu vực quản lý
    <div className="space-y-4 text-gray-100 p-4">
      {/* Nút Tạo Tài khoản mới với màu accent nổi bật */}
      <Button
        onClick={() => console.log("Tạo tài khoản mới")}
        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 transition-colors"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Tạo Tài khoản mới
      </Button>

      {/* Bảng với border và nền tối */}
      <div className="border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
        <Table>
          {/* Header Bảng - Màu xám đậm */}
          <TableHeader className="bg-gray-800/90 border-b border-gray-700">
            <TableRow className="border-gray-700 hover:bg-gray-800/90">
              <TableHead className="text-gray-300 font-semibold">ID</TableHead>
              <TableHead className="text-gray-300 font-semibold">
                Tên Người dùng
              </TableHead>
              <TableHead className="text-gray-300 font-semibold">
                Vai trò
              </TableHead>
              <TableHead className="text-gray-300 font-semibold">
                Đại lý
              </TableHead>
              <TableHead className="text-gray-300 font-semibold">
                Đăng nhập gần nhất
              </TableHead>
              <TableHead className="text-gray-300 font-semibold">
                Trạng thái
              </TableHead>
              <TableHead className="text-right text-gray-300 font-semibold">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Body Bảng */}
          <TableBody className="bg-gray-800">
            {accounts.map((account) => (
              <TableRow
                key={account.id}
                className={`border-gray-700 transition-colors ${
                  // Đánh dấu nổi bật các tài khoản Dealer (không phải EVM)
                  !isAdminOrEVM(account.role)
                    ? "bg-gray-900/50 hover:bg-gray-700/70"
                    : "hover:bg-gray-700/50"
                }`}
              >
                {/* Cell Nội dung */}
                <TableCell className="text-gray-400">{account.id}</TableCell>
                <TableCell className="font-medium text-gray-200">
                  {account.name}
                </TableCell>

                {/* Cell Vai trò (Role Badge) */}
                <TableCell>
                  <Badge
                    className={
                      isAdminOrEVM(account.role)
                        ? "bg-purple-700/70 hover:bg-purple-800 text-white border-purple-800" // EVM Role
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" // Dealer Role
                    }
                  >
                    {account.role}
                  </Badge>
                </TableCell>

                <TableCell className="text-gray-300">
                  {account.dealer === "N/A" ? "HQ - EVM" : account.dealer}
                </TableCell>
                <TableCell className="text-gray-400">
                  {account.lastLogin}
                </TableCell>

                {/* Cell Trạng thái (Status Badge) */}
                <TableCell>
                  <Badge
                    className={
                      account.status === "Active"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white" // Active Status
                        : "bg-red-600/50 text-red-300 border-red-700 hover:bg-red-600/70" // Inactive/Locked Status
                    }
                  >
                    {account.status === "Active" ? "Hoạt động" : "Khóa"}
                  </Badge>
                </TableCell>

                {/* Cell Hành động (Action Buttons) */}
                <TableCell className="text-right space-x-2">
                  {account.status === "Active" ? (
                    // Nút Khóa (Lock) - Màu đỏ
                    <Button
                      size="sm"
                      onClick={() => console.log("Khóa tài khoản", account.id)}
                      className="bg-red-600/50 hover:bg-red-700/70 text-red-300 border border-red-700 transition-colors"
                    >
                      <Lock className="h-4 w-4" />
                    </Button>
                  ) : (
                    // Nút Mở khóa (Unlock) - Màu xanh lá
                    <Button
                      size="sm"
                      onClick={() =>
                        console.log("Mở khóa tài khoản", account.id)
                      }
                      className="bg-emerald-600/50 hover:bg-emerald-700/70 text-emerald-300 border border-emerald-700 transition-colors"
                    >
                      <Unlock className="h-4 w-4" />
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
