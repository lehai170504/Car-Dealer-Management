"use client";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [quoteVehicle, setQuoteVehicle] = useState<Vehicle | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((car) => (
        <Card
          key={car.id}
          className="bg-gray-800 border-gray-700 hover:border-sky-500 transition-colors shadow-lg"
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl text-gray-50">
                {car.model} - {car.version}
              </CardTitle>
              {car.isNew && (
                <Badge className="bg-emerald-600 text-white border-emerald-600 font-semibold hover:bg-emerald-700">
                  Mới
                </Badge>
              )}
            </div>
            <CardDescription className="text-gray-400">
              Mã phiên bản: {car.id}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center text-sm text-gray-300">
              <DollarSign className="mr-2 h-4 w-4 text-emerald-400" />
              <span className="font-semibold text-gray-200">
                Giá niêm yết:
              </span>{" "}
              {car.price} VNĐ
            </div>

            <div className="flex items-center text-sm text-gray-300">
              <Zap className="mr-2 h-4 w-4 text-sky-400" />
              <span className="font-semibold text-gray-200">
                Công suất:
              </span>{" "}
              {car.power}
            </div>

            <div className="flex items-center text-sm text-gray-300">
              <Gauge className="mr-2 h-4 w-4 text-orange-400" />
              <span className="font-semibold text-gray-200">
                Quãng đường (WLTP):
              </span>{" "}
              {car.range}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
            <Button
              variant="outline"
              className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
              onClick={() => setSelectedVehicle(car)}
            >
              Cấu hình chi tiết
            </Button>
            <Button
              className="bg-sky-600 hover:bg-sky-700 text-white"
              onClick={() => setQuoteVehicle(car)}
            >
              Tạo Báo giá
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Modal chi tiết xe */}
      <Dialog
        open={!!selectedVehicle}
        onOpenChange={() => setSelectedVehicle(null)}
      >
        <DialogContent className="sm:max-w-lg bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>
              {selectedVehicle?.model} - {selectedVehicle?.version}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Mã xe: {selectedVehicle?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <p>
              <strong>Giá:</strong> {selectedVehicle?.price} VNĐ
            </p>
            <p>
              <strong>Công suất:</strong> {selectedVehicle?.power}
            </p>
            <p>
              <strong>Quãng đường (WLTP):</strong> {selectedVehicle?.range}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedVehicle(null)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal tạo báo giá */}
      <Dialog open={!!quoteVehicle} onOpenChange={() => setQuoteVehicle(null)}>
        <DialogContent className="sm:max-w-md bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Tạo báo giá</DialogTitle>
            <DialogDescription className="text-gray-400">
              Xe: {quoteVehicle?.model} - {quoteVehicle?.version} (
              {quoteVehicle?.price} VNĐ)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Tên khách hàng"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
            />
            <Input
              placeholder="Số điện thoại"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setQuoteVehicle(null)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                console.log("Tạo báo giá cho:", {
                  xe: quoteVehicle,
                  khách: customerName,
                  sđt: customerPhone,
                });
                setQuoteVehicle(null);
                setCustomerName("");
                setCustomerPhone("");
              }}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
