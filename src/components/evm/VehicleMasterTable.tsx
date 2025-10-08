// src/components/evm/VehicleMasterTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

// Dữ liệu mẫu
const masterVehicles = [
  { id: 'M001', model: 'EV Model X', version: 'Long Range', colors: 5, basePrice: '950,000,000', status: 'Active' },
  { id: 'M002', model: 'EV Model Y', version: 'Standard', colors: 7, basePrice: '720,000,000', status: 'Active' },
  { id: 'M003', model: 'EV Model Z', version: 'City', colors: 4, basePrice: '580,000,000', status: 'Pending' },
];

export function EVM_VehicleMasterTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input placeholder="Tìm kiếm theo Model, Phiên bản..." className="w-1/3" />
        <Button onClick={() => console.log('Thêm Model mới')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm Model/Phiên bản
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã Model</TableHead>
              <TableHead>Mẫu xe</TableHead>
              <TableHead>Phiên bản</TableHead>
              <TableHead className="text-center">Số lượng Màu</TableHead>
              <TableHead className="text-right">Giá Cơ bản (VNĐ)</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {masterVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.id}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.version}</TableCell>
                <TableCell className="text-center">{vehicle.colors}</TableCell>
                <TableCell className="text-right font-semibold">{vehicle.basePrice}</TableCell>
                <TableCell>
                  <Badge variant={vehicle.status === 'Active' ? 'default' : 'secondary'}>
                    {vehicle.status === 'Active' ? 'Hoạt động' : 'Chờ duyệt'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon" onClick={() => console.log('Chỉnh sửa', vehicle.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => console.log('Xóa', vehicle.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}