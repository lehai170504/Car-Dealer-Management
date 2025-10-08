// src/components/dealer/VehicleCatalog.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Gauge, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dữ liệu mẫu
const vehicles = [
  { 
    id: 'EVX-001', 
    model: 'EV Model X', 
    version: 'Long Range', 
    price: '950,000,000', 
    power: '250 kW', 
    range: '500 km',
    isNew: true
  },
  { 
    id: 'EVY-002', 
    model: 'EV Model Y', 
    version: 'Standard', 
    price: '720,000,000', 
    power: '180 kW', 
    range: '400 km',
    isNew: false
  },
  { 
    id: 'EVY-003', 
    model: 'EV Model Y', 
    version: 'Performance', 
    price: '850,000,000', 
    power: '280 kW', 
    range: '450 km',
    isNew: true
  },
];

export function VehicleCatalog() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((car) => (
        <Card key={car.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle>{car.model} - {car.version}</CardTitle>
                {car.isNew && <Badge>New</Badge>}
            </div>
            <CardDescription>Mã phiên bản: {car.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm text-gray-700">
              <DollarSign className="mr-2 h-4 w-4 text-green-600" />
              <span className="font-semibold">Giá niêm yết:</span> {car.price} VNĐ
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Zap className="mr-2 h-4 w-4 text-blue-600" />
              <span className="font-semibold">Công suất:</span> {car.power}
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Gauge className="mr-2 h-4 w-4 text-red-600" />
              <span className="font-semibold">Quãng đường (WLTP):</span> {car.range}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => console.log('Xem chi tiết cấu hình', car.id)}>
              Cấu hình chi tiết
            </Button>
            <Button onClick={() => console.log('Tạo báo giá nhanh', car.id)}>
              Tạo Báo giá
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}