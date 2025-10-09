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
import { Eye, CreditCard, CalendarDays, Car } from "lucide-react";

// Định nghĩa Interface (Typescript) cho Đơn hàng
type SalesOrder = {
  id: string;
  customerName: string;
  vehicleModel: string;
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Installment";
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
];

export function SalesOrderTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((order) => {
        let badgeClass = "";
        let badgeText = "";

        if (order.paymentStatus === "Pending") {
          badgeClass =
            "bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600";
          badgeText = "Chờ Thanh toán";
        } else if (order.paymentStatus === "Paid") {
          badgeClass =
            "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700";
          badgeText = "Đã Thanh toán";
        } else if (order.paymentStatus === "Installment") {
          badgeClass =
            "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700";
          badgeText = "Trả góp";
        }

        return (
          <Card
            key={order.id}
            className="bg-gray-800 border-gray-700 hover:border-sky-500 transition-colors shadow-lg"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                {/* Tiêu đề */}
                <CardTitle className="text-xl text-gray-50">
                  {order.customerName}
                </CardTitle>

                {/* Badge Status */}
                <Badge className={`${badgeClass} font-semibold`}>
                  {badgeText}
                </Badge>
              </div>

              <CardDescription className="text-gray-400">
                Mã đơn: {order.id}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Mẫu xe */}
              <div className="flex items-center text-sm text-gray-300">
                <Car className="mr-2 h-4 w-4 text-sky-400" />
                <span className="font-semibold text-gray-200">
                  Mẫu xe:
                </span>{" "}
                {order.vehicleModel}
              </div>

              {/* Tổng tiền */}
              <div className="flex items-center text-sm text-gray-300">
                <CreditCard className="mr-2 h-4 w-4 text-emerald-400" />
                <span className="font-semibold text-gray-200">
                  Tổng tiền:
                </span>{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.totalAmount)}
              </div>

              {/* Ngày đặt hàng */}
              <div className="flex items-center text-sm text-gray-300">
                <CalendarDays className="mr-2 h-4 w-4 text-orange-400" />
                <span className="font-semibold text-gray-200">
                  Ngày đặt:
                </span>{" "}
                {order.orderDate}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
              <Button
                variant="outline"
                className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
                onClick={() => console.log("Xem chi tiết", order.id)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Chi tiết
              </Button>

              <Button
                className="bg-sky-600 hover:bg-sky-700 text-white"
                onClick={() => console.log("Quản lý Thanh toán", order.id)}
                disabled={order.paymentStatus === "Paid"}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Quản lý TT
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
