// src/components/dealer/QuoteTable.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
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

// Dữ liệu mẫu
const data: Quote[] = [
  {
    id: "Q001",
    customerName: "Nguyễn Văn A",
    vehicleModel: "Model X Long Range",
    totalPrice: 1_250_000_000,
    status: "Sent",
    createdAt: "2025-10-01",
  },
  {
    id: "Q002",
    customerName: "Trần Thị B",
    vehicleModel: "Model Y Standard",
    totalPrice: 850_000_000,
    status: "Draft",
    createdAt: "2025-10-03",
  },
  {
    id: "Q003",
    customerName: "Lê Văn C",
    vehicleModel: "Model X Long Range",
    totalPrice: 1_250_000_000,
    status: "Converted",
    createdAt: "2025-09-28",
  },
  {
    id: "Q004",
    customerName: "Phạm Văn D",
    vehicleModel: "Model 3 Performance",
    totalPrice: 1_050_000_000,
    status: "Sent",
    createdAt: "2025-10-05",
  },
  {
    id: "Q005",
    customerName: "Hoàng Thị E",
    vehicleModel: "Model Y Standard",
    totalPrice: 850_000_000,
    status: "Draft",
    createdAt: "2025-10-10",
  },
];

// Định nghĩa Cột
const columns: ColumnDef<Quote>[] = [
  { accessorKey: "id", header: "Mã Báo giá" },
  { accessorKey: "customerName", header: "Khách hàng" },
  { accessorKey: "vehicleModel", header: "Mẫu xe" },
  {
    accessorKey: "totalPrice",
    header: "Tổng tiền (VNĐ)",
    cell: ({ row }) => (
      // Đổi màu tiền tệ cho Dark Theme
      <span className="font-semibold text-emerald-400">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.original.totalPrice)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      let className = "";

      // Áp dụng màu Badge cho Dark Theme
      if (status === "Draft") {
        // Bản nháp (Gray/Xám)
        className = "bg-gray-600/50 text-gray-300 border-gray-600";
      } else if (status === "Sent") {
        // Đã gửi (Sky/Xanh dương)
        className = "bg-sky-600/50 text-sky-300 border-sky-600";
      } else if (status === "Converted") {
        // Đã chuyển đổi (Emerald/Xanh lá)
        className = "bg-emerald-600/50 text-emerald-300 border-emerald-600";
      }

      return (
        <Badge variant="outline" className={className}>
          {status === "Draft"
            ? "Bản nháp"
            : status === "Sent"
            ? "Đã gửi"
            : "Đã chuyển đổi (Thành Đơn hàng)"}
        </Badge>
      );
    },
  },
  { accessorKey: "createdAt", header: "Ngày tạo" },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {/* Nút Tải PDF - Outline Dark Theme */}
        <Button
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
          onClick={() => console.log(`Download ${row.original.id}`)}
        >
          <Download className="h-4 w-4 mr-1" />
          Tải PDF
        </Button>

        {/* Nút Lên Đơn - Primary/Success Dark Theme */}
        {row.original.status !== "Converted" && (
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => console.log(`Convert ${row.original.id}`)}
          >
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
