"use client";
import { useState } from "react";
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
import { Edit, Trash2, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddVehicleModal } from "./AddVehicleModal";
import { EditVehicleModal } from "./EditVehicleModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface VehicleMaster {
  id: string;
  model: string;
  version: string;
  colors: number;
  basePrice: string;
  status: string;
}

const initialVehicles: VehicleMaster[] = [
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
];

export function EVM_VehicleMasterTable() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleMaster | null>(
    null
  );

  const handleAdd = (vehicle: VehicleMaster) =>
    setVehicles([...vehicles, vehicle]);
  const handleEdit = (vehicle: VehicleMaster) =>
    setVehicles(vehicles.map((v) => (v.id === vehicle.id ? vehicle : v)));
  const handleDelete = () => {
    if (selectedVehicle)
      setVehicles(vehicles.filter((v) => v.id !== selectedVehicle.id));
    setIsDeleteOpen(false);
  };

  const getStatusBadgeClasses = (status: string) =>
    status === "Active"
      ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
      : "bg-yellow-600/50 text-yellow-300 border-yellow-700 hover:bg-yellow-600/70";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo Model, Phiên bản..."
            className="pl-10 bg-gray-700 border-gray-600 text-gray-200"
          />
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Thêm Model/Phiên bản
        </Button>
      </div>

      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow>
              <TableHead className="text-gray-200">Mã Model</TableHead>
              <TableHead className="text-gray-200">Mẫu xe</TableHead>
              <TableHead className="text-gray-200">Phiên bản</TableHead>
              <TableHead className="text-gray-200 text-center">
                Số màu
              </TableHead>
              <TableHead className="text-gray-200 text-right">Giá</TableHead>
              <TableHead className="text-gray-200">Trạng thái</TableHead>
              <TableHead className="text-gray-200 text-right">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                className="border-gray-600 hover:bg-gray-700/50"
              >
                <TableCell className="text-gray-200">{vehicle.id}</TableCell>
                <TableCell className="text-gray-300 font-semibold">
                  {vehicle.model}
                </TableCell>
                <TableCell className="text-gray-400">
                  {vehicle.version}
                </TableCell>
                <TableCell className="text-center text-sky-400">
                  {vehicle.colors}
                </TableCell>
                <TableCell className="text-right text-emerald-400 font-semibold">
                  {vehicle.basePrice}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClasses(vehicle.status)}>
                    {vehicle.status === "Active" ? "Hoạt động" : "Chờ duyệt"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-sky-400 border-gray-600"
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 border-gray-600"
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <AddVehicleModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAdd}
      />
      <EditVehicleModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        vehicle={selectedVehicle}
        onSave={handleEdit}
      />
      <DeleteConfirmModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
