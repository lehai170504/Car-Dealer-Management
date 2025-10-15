"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, PlusCircle, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddVehicleModal } from "./AddVehicleModal";
import { ViewOrEditVehicleModal } from "./ViewOrEditVehicleModal";
import { useVehicleManagement } from "@/hooks/useVehicleManagement";
import { Vehicle } from "@/types/vehicle";
import Swal from "sweetalert2";

export function EVM_VehicleMasterTable() {
  const {
    filteredVehicles,
    loading,
    search,
    setSearch,
    handleDelete,
    fetchVehicles,
  } = useVehicleManagement();

  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // ✅ Sort mới nhất → cũ nhất
  const sortedVehicles = useMemo(() => {
    return [...filteredVehicles].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [filteredVehicles]);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleViewDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsViewOpen(true);
  };

  /** ✅ Xác nhận xóa bằng SweetAlert2 */
  const confirmDelete = async (vehicle: Vehicle) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      html: `<p>Bạn có chắc muốn xóa xe <b>${vehicle.model} - ${vehicle.version}</b> không?</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      background: "#1e293b",
      color: "#e2e8f0",
    });

    if (result.isConfirmed) {
      try {
        await handleDelete(vehicle._id);
        Swal.fire({
          title: "Đã xóa!",
          text: `Xe ${vehicle.model} - ${vehicle.version} đã được xóa thành công.`,
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
          background: "#1e293b",
          color: "#e2e8f0",
        });
      } catch (error: any) {
        Swal.fire({
          title: "Lỗi!",
          text: error?.message || "Không thể xóa xe.",
          icon: "error",
          background: "#1e293b",
          color: "#e2e8f0",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Thanh tìm kiếm + nút thêm */}
      <div className="flex justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo Model, Phiên bản..."
            className="pl-10 bg-gray-700 border-gray-600 text-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Thêm Model/Phiên bản
        </Button>
      </div>

      {/* Bảng dữ liệu */}
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow>
              <TableHead className="text-gray-200 text-center w-[60px]">
                #
              </TableHead>
              <TableHead className="text-gray-200">Mẫu xe</TableHead>
              <TableHead className="text-gray-200">Phiên bản</TableHead>
              <TableHead className="text-gray-200 text-center w-[120px]">
                Màu sắc
              </TableHead>
              <TableHead className="text-gray-200">Tính năng</TableHead>
              <TableHead className="text-gray-200 text-right w-[120px]">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-400"
                >
                  <Loader2 className="animate-spin inline mr-2" />
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : sortedVehicles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-400"
                >
                  Không tìm thấy xe nào.
                </TableCell>
              </TableRow>
            ) : (
              sortedVehicles.map((vehicle, index) => (
                <TableRow
                  key={vehicle._id}
                  className="border-gray-600 hover:bg-gray-700/50"
                >
                  {/* ✅ Số thứ tự */}
                  <TableCell className="text-center text-gray-400 font-medium">
                    {index + 1}
                  </TableCell>

                  <TableCell className="text-gray-300 font-semibold">
                    {vehicle.model}
                  </TableCell>

                  <TableCell className="text-gray-400">
                    {vehicle.version}
                  </TableCell>

                  {/* ✅ Hiển thị màu sắc thật */}
                  <TableCell className="text-center">
                    <div
                      className="w-6 h-6 mx-auto rounded-full border border-gray-400"
                      style={{ backgroundColor: vehicle.color }}
                      title={vehicle.color}
                    />
                  </TableCell>

                  <TableCell className="text-gray-400 truncate max-w-[250px]">
                    {vehicle.features.join(", ")}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-sky-400 border-gray-600"
                      onClick={() => handleViewDetail(vehicle)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 border-gray-600"
                      onClick={() => confirmDelete(vehicle)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal thêm xe */}
      <AddVehicleModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={fetchVehicles}
      />

      <ViewOrEditVehicleModal
        open={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        vehicle={selectedVehicle}
        onSuccess={fetchVehicles}
      />
    </div>
  );
}
