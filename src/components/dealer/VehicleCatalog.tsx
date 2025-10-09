// src/components/dealer/VehicleCatalog.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Gauge, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu
interface Vehicle {
  id: string;
  model: string;
  version: string;
  price: string;
  power: string;
  range: string;
  isNew: boolean;
}

const vehicles: Vehicle[] = [
  {
    id: "EVX-001",
    model: "EV Model X",
    version: "Long Range",
    price: "950,000,000",
    power: "250 kW",
    range: "500 km",
    isNew: true,
  },
  {
    id: "EVY-002",
    model: "EV Model Y",
    version: "Standard",
    price: "720,000,000",
    power: "180 kW",
    range: "400 km",
    isNew: false,
  },
  {
    id: "EVY-003",
    model: "EV Model Y",
    version: "Performance",
    price: "850,000,000",
    power: "280 kW",
    range: "450 km",
    isNew: true,
  },
];

export function VehicleCatalog() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((car) => (
        <Card
          key={car.id}
          className="bg-gray-800 border-gray-700 hover:border-sky-500 transition-colors shadow-lg"
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              {/* Tiêu đề */}
              <CardTitle className="text-xl text-gray-50">
                {car.model} - {car.version}
              </CardTitle>

              {/* Badge New - Màu nổi bật */}
              {car.isNew && (
                <Badge className="bg-emerald-600 text-white border-emerald-600 font-semibold hover:bg-emerald-700">
                  Mới
                </Badge>
              )}
            </div>
            {/* Mô tả */}
            <CardDescription className="text-gray-400">
              Mã phiên bản: {car.id}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Giá niêm yết */}
            <div className="flex items-center text-sm text-gray-300">
              <DollarSign className="mr-2 h-4 w-4 text-emerald-400" />
              <span className="font-semibold text-gray-200">
                Giá niêm yết:
              </span>{" "}
              {car.price} VNĐ
            </div>

            {/* Công suất */}
            <div className="flex items-center text-sm text-gray-300">
              <Zap className="mr-2 h-4 w-4 text-sky-400" />
              <span className="font-semibold text-gray-200">
                Công suất:
              </span>{" "}
              {car.power}
            </div>

            {/* Quãng đường */}
            <div className="flex items-center text-sm text-gray-300">
              <Gauge className="mr-2 h-4 w-4 text-orange-400" />
              <span className="font-semibold text-gray-200">
                Quãng đường (WLTP):
              </span>{" "}
              {car.range}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
            {/* Button Outline - Dark Theme */}
            <Button
              variant="outline"
              className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
              onClick={() => console.log("Xem chi tiết cấu hình", car.id)}
            >
              Cấu hình chi tiết
            </Button>

            {/* Button Primary - Dark Theme */}
            <Button
              className="bg-sky-600 hover:bg-sky-700 text-white"
              onClick={() => console.log("Tạo báo giá nhanh", car.id)}
            >
              Tạo Báo giá
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
