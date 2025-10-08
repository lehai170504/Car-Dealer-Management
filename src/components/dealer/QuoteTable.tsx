// src/components/dealer/QuoteTable.tsx
'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table"; 
import { Badge } from "@/components/ui/badge"; // Đã sửa lỗi import đường dẫn
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";

// Định nghĩa Interface (Typescript)
type Quote = {
  id: string;
  customerName: string;
  vehicleModel: string;
  totalPrice: number;
  status: "Draft" | "Sent" | "Converted";
  createdAt: string;
};

// Dữ liệu mẫu (Đã sửa lỗi cú pháp 'quote.vehicleModel' thành 'vehicleModel')
const data: Quote[] = [
  { id: "Q001", customerName: "Nguyễn Văn A", vehicleModel: "Model X Long Range", totalPrice: 1_250_000_000, status: "Sent", createdAt: "2025-10-01" },
  { id: "Q002", customerName: "Trần Thị B", vehicleModel: "Model Y Standard", totalPrice: 850_000_000, status: "Draft", createdAt: "2025-10-03" },
  { id: "Q003", customerName: "Lê Văn C", vehicleModel: "Model X Long Range", totalPrice: 1_250_000_000, status: "Converted", createdAt: "2025-09-28" },
];

// Định nghĩa Cột (Đã sửa lỗi cú pháp tiếng Việt trong header)
const columns: ColumnDef<Quote>[] = [
  { accessorKey: "id", header: "Mã Báo giá" },
  { accessorKey: "customerName", header: "Khách hàng" },
  { accessorKey: "vehicleModel", header: "Mẫu xe" },
  { 
    accessorKey: "totalPrice", 
    header: "Tổng tiền (VNĐ)",
    cell: ({ row }) => (
        <span className="font-semibold text-green-700">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.original.totalPrice)}
        </span>
    )
  },
  { 
    accessorKey: "status", 
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      let badgeVariant: "default" | "secondary" | "outline" = "outline";
      let className = "";

      if (status === "Draft") {
        badgeVariant = "secondary";
      } else if (status === "Sent") {
        badgeVariant = "default";
        className = "bg-blue-500 hover:bg-blue-600 text-white";
      } else if (status === "Converted") {
        className = "bg-green-500 hover:bg-green-600 text-white";
      }

      return (
        <Badge 
          variant={badgeVariant}
          className={className}
        >
          {status}
        </Badge>
      );
    }
  },
  { accessorKey: "createdAt", header: "Ngày tạo" },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => console.log(`Download ${row.original.id}`)}>
            <Download className="h-4 w-4 mr-1" />
            Tải PDF
        </Button>
        {row.original.status !== "Converted" && (
            <Button variant="default" size="sm" onClick={() => console.log(`Convert ${row.original.id}`)}>
                <ArrowRight className="h-4 w-4 mr-1" />
                Lên Đơn
            </Button>
        )}
      </div>
    ),
  },
];

export function QuoteTable() {
  return (
    <div className="space-y-4">
      <DataTable 
        columns={columns} 
        data={data} 
        searchColumn="customerName" // Cho phép tìm kiếm theo tên khách hàng
        searchPlaceholder="Tìm kiếm theo tên khách hàng..."
      />
    </div>
  );
}
