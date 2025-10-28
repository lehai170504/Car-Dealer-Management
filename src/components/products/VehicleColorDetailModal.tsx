"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VehicleColor } from "@/types/vehicleColors";
import { useUpdateVehicleColor } from "@/hooks/useUpdateVehicleColor";

interface VehicleColorDetailModalProps {
  color: VehicleColor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export function VehicleColorDetailModal({
  color,
  open,
  onOpenChange,
  onUpdated,
}: VehicleColorDetailModalProps) {
  if (!color) return null;

  const updateHook = useUpdateVehicleColor(color);
  const labelClass = "block text-gray-300 font-medium mb-1";

  const handleSave = async () => {
    await updateHook.handleUpdate(onUpdated, () => onOpenChange(false));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-lg w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chi tiết Vehicle Color
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Name */}
          <div className="space-y-1">
            <label className={labelClass}>Tên màu</label>
            <Input
              value={updateHook.formData.name}
              onChange={(e) => updateHook.handleChange("name", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Code */}
          <div className="space-y-1">
            <label className={labelClass}>Mã Code</label>
            <Input
              value={updateHook.formData.code}
              onChange={(e) => updateHook.handleChange("code", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Hex */}
          <div className="space-y-1">
            <label className={labelClass}>Hex</label>
            <Input
              type="color"
              value={updateHook.formData.hex}
              onChange={(e) => updateHook.handleChange("hex", e.target.value)}
              className="w-20 h-12 p-0 bg-gray-800 border border-gray-600 rounded-md shadow-inner"
            />
          </div>

          {/* Extra Price */}
          <div className="space-y-1">
            <label className={labelClass}>Extra Price</label>
            <Input
              type="number"
              value={updateHook.formData.extraPrice}
              onChange={(e) =>
                updateHook.handleChange("extraPrice", Number(e.target.value))
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Active */}
          <div className="space-y-1">
            <label className={labelClass}>Trạng thái</label>
            <Select
              value={updateHook.formData.active ? "active" : "inactive"}
              onValueChange={(val) =>
                updateHook.handleChange("active", val === "active")
              }
            >
              <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm hover:border-gray-500">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-3 border-t border-gray-700 pt-3">
          <Button
            variant="outline"
            onClick={() => {
              updateHook.cancelEdit();
              onOpenChange(false);
            }}
            className="hover:bg-gray-700 text-neutral-700"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateHook.loading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {updateHook.loading && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
