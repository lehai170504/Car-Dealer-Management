// src/components/dealer/QuoteTable.tsx
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
import {
  Download,
  ArrowRight,
  Car,
  DollarSign,
  CalendarDays,
} from "lucide-react";

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

export function QuoteTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((quote) => {
        let badgeClass = "";
        let badgeText = "";

        if (quote.status === "Draft") {
          badgeClass = "bg-gray-600 text-gray-200 border-gray-600";
          badgeText = "Bản nháp";
        } else if (quote.status === "Sent") {
          badgeClass = "bg-sky-600 text-white border-sky-600";
          badgeText = "Đã gửi";
        } else if (quote.status === "Converted") {
          badgeClass = "bg-emerald-600 text-white border-emerald-600";
          badgeText = "Đã chuyển đổi (Đơn hàng)";
        }

        return (
          <Card
            key={quote.id}
            className="bg-gray-800 border-gray-700 hover:border-sky-500 transition-colors shadow-lg"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                {/* Tiêu đề */}
                <CardTitle className="text-xl text-gray-50">
                  {quote.customerName}
                </CardTitle>

                {/* Badge Status */}
                <Badge className={`${badgeClass} font-semibold`}>
                  {badgeText}
                </Badge>
              </div>

              <CardDescription className="text-gray-400">
                Mã báo giá: {quote.id}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Mẫu xe */}
              <div className="flex items-center text-sm text-gray-300">
                <Car className="mr-2 h-4 w-4 text-sky-400" />
                <span className="font-semibold text-gray-200">
                  Mẫu xe:
                </span>{" "}
                {quote.vehicleModel}
              </div>

              {/* Giá trị báo giá */}
              <div className="flex items-center text-sm text-gray-300">
                <DollarSign className="mr-2 h-4 w-4 text-emerald-400" />
                <span className="font-semibold text-gray-200">
                  Giá trị báo giá:
                </span>{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(quote.totalPrice)}
              </div>

              {/* Ngày tạo */}
              <div className="flex items-center text-sm text-gray-300">
                <CalendarDays className="mr-2 h-4 w-4 text-orange-400" />
                <span className="font-semibold text-gray-200">
                  Ngày tạo:
                </span>{" "}
                {quote.createdAt}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
              {/* Nút tải PDF */}
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-indigo-500 hover:text-indigo-400"
                onClick={() => console.log("Tải PDF", quote.id)}
              >
                <Download className="mr-2 h-4 w-4" />
                Tải PDF
              </Button>

              {/* Nút Lên đơn (nếu chưa Converted) */}
              {quote.status !== "Converted" && (
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => console.log("Convert", quote.id)}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Lên đơn
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
