// src/components/evm/VehicleMasterTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle, Search } from "lucide-react"; // Thêm Search
import { Input } from "@/components/ui/input";

// Dữ liệu mẫu
interface VehicleMaster {
  id: string;
  model: string;
  version: string;
  colors: number;
  basePrice: string;
  status: string;
}

const masterVehicles: VehicleMaster[] = [
  {
    id: "M001",
    model: "EV Model X",
    version: "Long Range",
    colors: 5,
    basePrice: "950,000,000",
    status: "Active",
  },
  {
    id: "M002",
    model: "EV Model Y",
    version: "Standard",
    colors: 7,
    basePrice: "720,000,000",
    status: "Active",
  },
  {
    id: "M003",
    model: "EV Model Z",
    version: "City",
    colors: 4,
    basePrice: "580,000,000",
    status: "Pending",
  },
  {
    id: "M004",
    model: "EV Model Y",
    version: "Performance",
    colors: 6,
    basePrice: "850,000,000",
    status: "Active",
  },
];

export function EVM_VehicleMasterTable() {
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600";
      case "Pending":
        return "bg-yellow-600/50 text-yellow-300 border-yellow-700 hover:bg-yellow-600/70";
      default:
        return "bg-gray-700 text-gray-400 border-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar và Nút Thêm Mới */}
      <div className="flex justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo Model, Phiên bản..."
            className="pl-10 bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-emerald-500"
          />
        </div>
        <Button
          onClick={() => console.log("Thêm Model mới")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm Model/Phiên bản
        </Button>
      </div>

      {/* Table Container với Dark Theme */}
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow className="border-gray-600 hover:bg-gray-700/80">
              <TableHead className="w-[100px] text-gray-200">
                Mã Model
              </TableHead>
              <TableHead className="text-gray-200">Mẫu xe</TableHead>
              <TableHead className="text-gray-200">Phiên bản</TableHead>
              <TableHead className="text-center text-gray-200">
                Số lượng Màu
              </TableHead>
              <TableHead className="text-right text-gray-200">
                Giá Cơ bản (VNĐ)
              </TableHead>
              <TableHead className="text-gray-200">Trạng thái</TableHead>
              <TableHead className="text-right text-gray-200">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {masterVehicles.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                className="border-gray-600 hover:bg-gray-700/50 transition-colors"
              >
                <TableCell className="font-medium text-gray-200">
                  {vehicle.id}
                </TableCell>
                <TableCell className="text-gray-300 font-semibold">
                  {vehicle.model}
                </TableCell>
                <TableCell className="text-gray-400">
                  {vehicle.version}
                </TableCell>
                <TableCell className="text-center text-sky-400">
                  {vehicle.colors}
                </TableCell>
                <TableCell className="text-right font-semibold text-emerald-400">
                  {vehicle.basePrice}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusBadgeClasses(
                      vehicle.status
                    )} font-semibold`}
                  >
                    {vehicle.status === "Active" ? "Hoạt động" : "Chờ duyệt"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {/* Button Chỉnh sửa */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 text-sky-400 hover:bg-gray-600/50 hover:border-sky-500"
                    onClick={() => console.log("Chỉnh sửa", vehicle.id)}
                    title="Chỉnh sửa"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {/* Button Xóa */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 text-red-500 hover:bg-gray-600/50 hover:border-red-600"
                    onClick={() => console.log("Xóa", vehicle.id)}
                    title="Xóa"
                  >
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
