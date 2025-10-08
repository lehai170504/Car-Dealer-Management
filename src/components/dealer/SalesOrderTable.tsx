'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table"; 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Truck, Eye } from "lucide-react";

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
  { id: "SO001", customerName: "Lê Văn C", vehicleModel: "Model X Long Range", totalAmount: 1_250_000_000, paymentStatus: "Paid", orderDate: "2025-09-28" },
  { id: "SO002", customerName: "Phạm Văn D", vehicleModel: "Model Y Standard", totalAmount: 850_000_000, paymentStatus: "Installment", orderDate: "2025-10-05" },
  { id: "SO003", customerName: "Hoàng Thị E", vehicleModel: "Model 3 Performance", totalAmount: 1_050_000_000, paymentStatus: "Pending", orderDate: "2025-10-10" },
];

// Định nghĩa Cột
const columns: ColumnDef<SalesOrder>[] = [
  { accessorKey: "id", header: "Mã Đơn hàng" },
  { accessorKey: "customerName", header: "Khách hàng" },
  { accessorKey: "vehicleModel", header: "Mẫu xe" },
  { 
    accessorKey: "totalAmount", 
    header: "Tổng tiền (VNĐ)",
    cell: ({ row }) => (
        <span className="font-semibold text-green-700">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.original.totalAmount)}
        </span>
    )
  },
  { 
    accessorKey: "paymentStatus", 
    header: "Thanh toán",
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      let className = "";

      if (status === "Pending") {
        className = "bg-yellow-100 text-yellow-800 border-yellow-300";
      } else if (status === "Paid") {
        className = "bg-green-100 text-green-800 border-green-300";
      } else if (status === "Installment") {
        className = "bg-indigo-100 text-indigo-800 border-indigo-300";
      }

      return (
        <Badge variant="outline" className={className}>
          {status === "Pending" ? "Chờ Thanh toán" : 
           status === "Paid" ? "Đã Thanh toán" : 
           "Trả góp"}
        </Badge>
      );
    }
  },
  { accessorKey: "orderDate", header: "Ngày Đặt hàng" },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => console.log(`View Details ${row.original.id}`)}>
            <Eye className="h-4 w-4 mr-1" />
            Chi tiết
        </Button>
        <Button variant="default" size="sm" onClick={() => console.log(`Manage Payment ${row.original.id}`)} disabled={row.original.paymentStatus === 'Paid'}>
            <CreditCard className="h-4 w-4 mr-1" />
            Quản lý TT
        </Button>
      </div>
    ),
  },
];

export function SalesOrderTable() {
  return (
    <div className="space-y-4">
      <DataTable 
        columns={columns} 
        data={data} 
        searchColumn="customerName"
        searchPlaceholder="Tìm kiếm theo tên khách hàng hoặc mã đơn..."
      />
    </div>
  );
}
