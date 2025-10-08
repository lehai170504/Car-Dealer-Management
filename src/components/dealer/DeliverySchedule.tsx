'use client';

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
  { orderId: "SO001", customerName: "Lê Văn C", vehicleModel: "Model X Long Range", expectedDeliveryDate: "2025-11-15", deliveryStatus: "Ready" },
  { orderId: "SO002", customerName: "Phạm Văn D", vehicleModel: "Model Y Standard", expectedDeliveryDate: "2025-11-20", deliveryStatus: "Preparation" },
  { orderId: "SO003", customerName: "Hoàng Thị E", vehicleModel: "Model 3 Performance", expectedDeliveryDate: "2025-12-01", deliveryStatus: "Preparation" },
  { orderId: "SO000", customerName: "Nguyễn Văn F", vehicleModel: "Model S Plaid", expectedDeliveryDate: "2025-09-10", deliveryStatus: "Delivered" },
];

// Định nghĩa Cột
const columns: ColumnDef<DeliveryItem>[] = [
  { accessorKey: "orderId", header: "Mã Đơn hàng" },
  { accessorKey: "customerName", header: "Khách hàng" },
  { accessorKey: "vehicleModel", header: "Mẫu xe" },
  { 
    accessorKey: "expectedDeliveryDate", 
    header: "Ngày Giao dự kiến",
    cell: ({ row }) => (
      <span className="font-medium text-blue-600">
          {new Date(row.original.expectedDeliveryDate).toLocaleDateString('vi-VN')}
      </span>
    )
  },
  { 
    accessorKey: "deliveryStatus", 
    header: "Trạng thái Giao",
    cell: ({ row }) => {
      const status = row.original.deliveryStatus;
      let className = "";
      let displayText = "";

      if (status === "Preparation") {
        className = "bg-yellow-100 text-yellow-800 border-yellow-300";
        displayText = "Đang Chuẩn bị";
      } else if (status === "Ready") {
        className = "bg-green-100 text-green-800 border-green-300";
        displayText = "Sẵn sàng Giao";
      } else if (status === "Delivered") {
        className = "bg-gray-200 text-gray-700 border-gray-300";
        displayText = "Đã Giao xe";
      } else if (status === "Cancelled") {
        className = "bg-red-100 text-red-800 border-red-300";
        displayText = "Đã Hủy";
      }

      return (
        <Badge variant="outline" className={className}>
          {displayText}
        </Badge>
      );
    }
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => console.log(`View Checklist ${row.original.orderId}`)}
          disabled={row.original.deliveryStatus === 'Delivered'}
        >
            <ListEnd className="h-4 w-4 mr-1" />
            Checklist
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => console.log(`Schedule/Update ${row.original.orderId}`)}
          disabled={row.original.deliveryStatus === 'Delivered'}
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
      <DataTable 
        columns={columns} 
        data={data} 
        searchColumn="customerName"
        searchPlaceholder="Tìm kiếm theo tên khách hàng..."
      />
    </div>
  );
}
