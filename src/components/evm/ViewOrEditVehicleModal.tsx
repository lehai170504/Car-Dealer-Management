"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, CheckCircle2, XCircle } from "lucide-react";
import { Vehicle } from "@/types/vehicle";
import { useUpdateVehicle } from "@/hooks/useUpdateVehicle"; // ✅ import hook

interface ViewOrEditVehicleModalProps {
  open: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onSuccess: () => void;
}

export function ViewOrEditVehicleModal({
  open,
  onClose,
  vehicle,
  onSuccess,
}: ViewOrEditVehicleModalProps) {
  if (!vehicle) return null;

  // ✅ Sử dụng hook
  const {
    editMode,
    setEditMode,
    formData,
    handleChange,
    isUpdateLoading,
    handleUpdate,
  } = useUpdateVehicle(vehicle);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>
              {editMode ? "Chỉnh sửa xe" : "Xem chi tiết xe"}{" "}
              <b>{vehicle.model}</b> - <b>{vehicle.version}</b>
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditMode(!editMode)}
              className="text-gray-300 hover:text-white"
            >
              {editMode ? (
                <XCircle className="h-5 w-5 text-red-400" />
              ) : (
                <Pencil className="h-5 w-5 text-emerald-400" />
              )}
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label>Mẫu xe</Label>
            <Input
              value={formData.model}
              disabled={!editMode}
              onChange={(e) => handleChange("model", e.target.value)}
              className={`bg-gray-800 text-white border-gray-600 ${
                !editMode ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div>
            <Label>Phiên bản</Label>
            <Input
              value={formData.version}
              disabled={!editMode}
              onChange={(e) => handleChange("version", e.target.value)}
              className={`bg-gray-800 text-white border-gray-600 ${
                !editMode ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div>
            <Label>Màu xe</Label>
            <Input
              value={formData.color}
              disabled={!editMode}
              onChange={(e) => handleChange("color", e.target.value)}
              className={`bg-gray-800 text-white border-gray-600 ${
                !editMode ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div>
            <Label>Tính năng (phân cách bằng dấu phẩy)</Label>
            <Input
              value={formData.features.join(", ")}
              disabled={!editMode}
              onChange={(e) => handleChange("features", e.target.value)}
              className={`bg-gray-800 text-white border-gray-600 ${
                !editMode ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="text-gray-400 text-sm pt-2 border-t border-gray-700">
            <p>🕒 Ngày tạo: {new Date(formData.createdAt).toLocaleString()}</p>
            <p>🕓 Cập nhật: {new Date(formData.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        <DialogFooter className="pt-4 flex justify-between">
          {editMode ? (
            <Button
              onClick={() => handleUpdate(onSuccess, onClose)}
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Đang lưu...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Lưu thay đổi
                </>
              )}
            </Button>
          ) : (
            <div />
          )}
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300"
            disabled={isUpdateLoading}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
