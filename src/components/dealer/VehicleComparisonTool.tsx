// src/components/dealer/VehicleComparisonTool.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Badge } from "../ui/badge";

// Dữ liệu mẫu (thông số kỹ thuật chung)
const specs = [
  { feature: 'Giá (VNĐ)', 'EV Model X LR': '950,000,000', 'EV Model Y Standard': '720,000,000', 'EV Model Y P': '850,000,000' },
  { feature: 'Công suất tối đa', 'EV Model X LR': '250 kW', 'EV Model Y Standard': '180 kW', 'EV Model Y P': '280 kW' },
  { feature: 'Quãng đường (WLTP)', 'EV Model X LR': '500 km', 'EV Model Y Standard': '400 km', 'EV Model Y P': '450 km' },
  { feature: 'Tăng tốc 0-100 km/h', 'EV Model X LR': '6.2 giây', 'EV Model Y Standard': '8.5 giây', 'EV Model Y P': '5.1 giây' },
  { feature: 'Kích thước DxRxC (mm)', 'EV Model X LR': '4800x1900x1650', 'EV Model Y Standard': '4500x1850x1600', 'EV Model Y P': '4500x1850x1600' },
];

export function VehicleComparisonTool() {
  const comparedModels = ['EV Model X LR', 'EV Model Y Standard', 'EV Model Y P']; // Giả định 3 mẫu đang được so sánh

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={() => console.log('Thêm xe so sánh')}>
          <Plus className="mr-2 h-4 w-4" /> Thêm xe so sánh
        </Button>
        {comparedModels.map(model => (
            <Badge key={model} variant="secondary" className="text-base py-1">
                {model} 
                <X className="ml-2 h-3 w-3 cursor-pointer opacity-50 hover:opacity-100" onClick={() => console.log('Xóa khỏi so sánh', model)} />
            </Badge>
        ))}
      </div>
      
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[200px] sticky left-0 bg-gray-50 z-10 font-bold">Tính năng</TableHead>
              {comparedModels.map(model => (
                <TableHead key={model} className="text-center font-bold">{model}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {specs.map((spec, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium sticky left-0 bg-white z-10">{spec.feature}</TableCell>
                <TableCell className="text-center">{(spec as any)[comparedModels[0]]}</TableCell>
                <TableCell className="text-center">{(spec as any)[comparedModels[1]]}</TableCell>
                <TableCell className="text-center">{(spec as any)[comparedModels[2]]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}