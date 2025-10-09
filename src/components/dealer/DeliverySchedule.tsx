"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ListEnd } from "lucide-react";

// Định nghĩa Interface (Typescript) cho Lịch giao xe
type DeliveryItem = {
  orderId: string;
  customerName: string;
  vehicleModel: string;
  expectedDeliveryDate: string;
  deliveryStatus: "Preparation" | "Ready" | "Delivered" | "Cancelled"; // Trạng thái Giao xe
};

// Dữ liệu mẫu
const data: DeliveryItem[] = [
  {
    orderId: "SO001",
    customerName: "Lê Văn C",
    vehicleModel: "Model X Long Range",
    expectedDeliveryDate: "2025-11-15",
    deliveryStatus: "Ready",
  },
  {
    orderId: "SO002",
    customerName: "Phạm Văn D",
    vehicleModel: "Model Y Standard",
    expectedDeliveryDate: "2025-11-20",
    deliveryStatus: "Preparation",
  },
  {
    orderId: "SO003",
    customerName: "Hoàng Thị E",
    vehicleModel: "Model 3 Performance",
    expectedDeliveryDate: "2025-12-01",
    deliveryStatus: "Preparation",
  },
  {
    orderId: "SO000",
    customerName: "Nguyễn Văn F",
    vehicleModel: "Model S Plaid",
    expectedDeliveryDate: "2025-09-10",
    deliveryStatus: "Delivered",
  },
  {
    orderId: "SO004",
    customerName: "Trần Văn G",
    vehicleModel: "Model 3 Standard",
    expectedDeliveryDate: "2025-12-05",
    deliveryStatus: "Cancelled",
  },
];

// Định nghĩa Cột
const columns: ColumnDef<DeliveryItem>[] = [
  { accessorKey: "orderId", header: "Mã Đơn hàng" },
  { accessorKey: "customerName", header: "Khách hàng" },
  { accessorKey: "vehicleModel", header: "Mẫu xe" },
  {
    accessorKey: "expectedDeliveryDate",
    header: "Ngày Giao dự kiến",
    // Đổi màu ngày cho Dark Theme
    cell: ({ row }) => (
      <span className="font-semibold text-sky-400">
        {new Date(row.original.expectedDeliveryDate).toLocaleDateString(
          "vi-VN"
        )}
      </span>
    ),
  },
  {
    accessorKey: "deliveryStatus",
    header: "Trạng thái Giao",
    cell: ({ row }) => {
      const status = row.original.deliveryStatus;
      let className = "";
      let displayText = "";

      // Áp dụng màu Badge cho Dark Theme
      if (status === "Preparation") {
        // Đang Chuẩn bị (Amber/Vàng)
        className = "bg-amber-600/50 text-amber-300 border-amber-600";
        displayText = "Đang Chuẩn bị";
      } else if (status === "Ready") {
        // Sẵn sàng Giao (Emerald/Xanh lá)
        className = "bg-emerald-600/50 text-emerald-300 border-emerald-600";
        displayText = "Sẵn sàng Giao";
      } else if (status === "Delivered") {
        // Đã Giao xe (Gray/Xám)
        className = "bg-gray-600/50 text-gray-300 border-gray-600";
        displayText = "Đã Giao xe";
      } else if (status === "Cancelled") {
        // Đã Hủy (Red/Đỏ)
        className = "bg-red-600/50 text-red-300 border-red-600";
        displayText = "Đã Hủy";
      }

      return (
        <Badge variant="outline" className={className}>
          {displayText}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {/* Nút Checklist - Outline Dark Theme */}
        <Button
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => console.log(`View Checklist ${row.original.orderId}`)}
          disabled={row.original.deliveryStatus === "Delivered"}
        >
          <ListEnd className="h-4 w-4 mr-1" />
          Checklist
        </Button>
        {/* Nút Cập nhật TT - Primary Dark Theme */}
        <Button
          size="sm"
          className="bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => console.log(`Schedule/Update ${row.original.orderId}`)}
          disabled={row.original.deliveryStatus === "Delivered"}
        >
          <CalendarCheck className="h-4 w-4 mr-1" />
          Cập nhật TT
        </Button>
      </div>
    ),
  },
];

export function DeliverySchedule() {
  return (
    <div className="space-y-4">
      {/* Giả định DataTable component sẽ tự động xử lý Dark Theme */}
      <DataTable
        columns={columns}
        data={data}
        searchColumn="customerName"
        searchPlaceholder="Tìm kiếm theo tên khách hàng..."
      />
    </div>
  );
}
