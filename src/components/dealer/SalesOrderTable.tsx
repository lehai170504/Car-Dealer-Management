"use client";

import { ColumnDef } from "@tanstack/react-table";
// Giả định component DataTable (chưa được tạo) tự động áp dụng styling Dark Theme
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Eye } from "lucide-react";

// Định nghĩa Interface (Typescript) cho Đơn hàng
type SalesOrder = {
  id: string;
  customerName: string;
  vehicleModel: string;
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Installment"; // Trạng thái Thanh toán
  orderDate: string;
};

// Dữ liệu mẫu
const data: SalesOrder[] = [
  {
    id: "SO001",
    customerName: "Lê Văn C",
    vehicleModel: "Model X Long Range",
    totalAmount: 1_250_000_000,
    paymentStatus: "Paid",
    orderDate: "2025-09-28",
  },
  {
    id: "SO002",
    customerName: "Phạm Văn D",
    vehicleModel: "Model Y Standard",
    totalAmount: 850_000_000,
    paymentStatus: "Installment",
    orderDate: "2025-10-05",
  },
  {
    id: "SO003",
    customerName: "Hoàng Thị E",
    vehicleModel: "Model 3 Performance",
    totalAmount: 1_050_000_000,
    paymentStatus: "Pending",
    orderDate: "2025-10-10",
  },
  {
    id: "SO004",
    customerName: "Nguyễn Văn F",
    vehicleModel: "Model Z City",
    totalAmount: 600_000_000,
    paymentStatus: "Paid",
    orderDate: "2025-10-12",
  },
  {
    id: "SO005",
    customerName: "Vũ Thị G",
    vehicleModel: "Model X Standard",
    totalAmount: 900_000_000,
    paymentStatus: "Pending",
    orderDate: "2025-10-15",
  },
];

// Định nghĩa Cột
const columns: ColumnDef<SalesOrder>[] = [
  { accessorKey: "id", header: "Mã Đơn hàng" },
  { accessorKey: "customerName", header: "Khách hàng" },
  { accessorKey: "vehicleModel", header: "Mẫu xe" },
  {
    accessorKey: "totalAmount",
    header: "Tổng tiền (VNĐ)",
    // Đổi màu tiền tệ cho Dark Theme
    cell: ({ row }) => (
      <span className="font-semibold text-emerald-400">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.original.totalAmount)}
      </span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Thanh toán",
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      let className = "";

      // Áp dụng màu Badge cho Dark Theme
      if (status === "Pending") {
        // Chờ xử lý (Amber/Vàng)
        className = "bg-amber-600/50 text-amber-300 border-amber-600";
      } else if (status === "Paid") {
        // Đã thanh toán (Emerald/Xanh lá)
        className = "bg-emerald-600/50 text-emerald-300 border-emerald-600";
      } else if (status === "Installment") {
        // Trả góp (Sky/Xanh dương)
        className = "bg-sky-600/50 text-sky-300 border-sky-600";
      }

      return (
        <Badge variant="outline" className={className}>
          {status === "Pending"
            ? "Chờ Thanh toán"
            : status === "Paid"
            ? "Đã Thanh toán"
            : "Trả góp"}
        </Badge>
      );
    },
  },
  { accessorKey: "orderDate", header: "Ngày Đặt hàng" },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {/* Nút Chi tiết - Outline Dark Theme */}
        <Button
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-sky-400"
          onClick={() => console.log(`View Details ${row.original.id}`)}
        >
          <Eye className="h-4 w-4 mr-1" />
          Chi tiết
        </Button>
        {/* Nút Quản lý TT - Primary Dark Theme */}
        <Button
          size="sm"
          className="bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => console.log(`Manage Payment ${row.original.id}`)}
          disabled={row.original.paymentStatus === "Paid"}
        >
          <CreditCard className="h-4 w-4 mr-1" />
          Quản lý TT
        </Button>
      </div>
    ),
  },
];

export function SalesOrderTable() {
  return (
    // Đảm bảo DataTable được đặt trong môi trường Dark Theme
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
        searchColumn="customerName"
        searchPlaceholder="Tìm kiếm theo tên khách hàng hoặc mã đơn..."
        // Giả định DataTable component sẽ tự động xử lý màu sắc table, header, và search input
        // dựa trên các props được truyền và theme bao quanh.
      />
    </div>
  );
}
