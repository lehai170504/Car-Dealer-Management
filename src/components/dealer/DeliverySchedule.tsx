"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ListEnd, Car, CalendarDays, User } from "lucide-react";

// Định nghĩa Interface
type DeliveryStatus = "Preparation" | "Ready" | "Delivered" | "Cancelled";

type DeliveryItem = {
  orderId: string;
  customerName: string;
  vehicleModel: string;
  expectedDeliveryDate: string;
  deliveryStatus: DeliveryStatus;
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

// Map trạng thái -> style + text
const statusMap: Record<
  DeliveryStatus,
  { className: string; displayText: string }
> = {
  Preparation: {
    className: "bg-amber-600 text-white border-amber-600",
    displayText: "Đang Chuẩn bị",
  },
  Ready: {
    className: "bg-emerald-600 text-white border-emerald-600",
    displayText: "Sẵn sàng Giao",
  },
  Delivered: {
    className: "bg-gray-600 text-gray-200 border-gray-600",
    displayText: "Đã Giao xe",
  },
  Cancelled: {
    className: "bg-red-600 text-white border-red-600",
    displayText: "Đã Hủy",
  },
};

export function DeliverySchedule() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => {
        const { className, displayText } = statusMap[item.deliveryStatus];
        const disabled = item.deliveryStatus === "Delivered";

        return (
          <Card
            key={item.orderId}
            className="bg-gray-800 border-gray-700 hover:border-sky-500 transition-colors shadow-lg"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                {/* Tên khách hàng */}
                <CardTitle className="text-xl text-gray-50">
                  {item.customerName}
                </CardTitle>

                {/* Badge trạng thái */}
                <Badge className={`${className} font-semibold`}>
                  {displayText}
                </Badge>
              </div>

              <CardDescription className="text-gray-400">
                Mã đơn hàng: {item.orderId}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Mẫu xe */}
              <div className="flex items-center text-sm text-gray-300">
                <Car className="mr-2 h-4 w-4 text-sky-400" />
                <span className="font-semibold text-gray-200">
                  Mẫu xe:
                </span>{" "}
                {item.vehicleModel}
              </div>

              {/* Ngày dự kiến giao */}
              <div className="flex items-center text-sm text-gray-300">
                <CalendarDays className="mr-2 h-4 w-4 text-orange-400" />
                <span className="font-semibold text-gray-200">
                  Ngày giao:
                </span>{" "}
                {new Date(item.expectedDeliveryDate).toLocaleDateString(
                  "vi-VN"
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
              {/* Nút Checklist */}
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-indigo-500 hover:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => console.log("Checklist", item.orderId)}
                disabled={disabled}
              >
                <ListEnd className="mr-2 h-4 w-4" />
                Checklist
              </Button>

              {/* Nút Cập nhật TT */}
              <Button
                size="sm"
                className="bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => console.log("Update", item.orderId)}
                disabled={disabled}
              >
                <CalendarCheck className="mr-2 h-4 w-4" />
                Cập nhật TT
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
