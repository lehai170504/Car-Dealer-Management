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
import { Textarea } from "@/components/ui/textarea";
import type { VehicleModel } from "@/types/vehicleModels";
import { useUpdateVehicleModel } from "@/hooks/useUpdateVehicleModel";

interface VehicleModelDetailModalProps {
  model: VehicleModel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export function VehicleModelDetailModal({
  model,
  open,
  onOpenChange,
  onUpdated,
}: VehicleModelDetailModalProps) {
  if (!model) return null;

  const updateHook = useUpdateVehicleModel(model);

  const labelClass = "block text-gray-300 font-medium mb-1";

  const handleSave = async () => {
    await updateHook.handleUpdate(onUpdated, () => onOpenChange(false));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-lg w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chi tiết Vehicle Model
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Name */}
          <div className="space-y-1">
            <label className={labelClass}>Tên Model</label>
            <Input
              value={updateHook.formData.name}
              onChange={(e) => updateHook.handleChange("name", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Brand */}
          <div className="space-y-1">
            <label className={labelClass}>Thương hiệu</label>
            <Input
              value={updateHook.formData.brand}
              onChange={(e) => updateHook.handleChange("brand", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Segment */}
          <div className="space-y-1">
            <label className={labelClass}>Phân khúc</label>
            <Input
              value={updateHook.formData.segment}
              onChange={(e) =>
                updateHook.handleChange("segment", e.target.value)
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className={labelClass}>Mô tả</label>
            <Textarea
              value={updateHook.formData.description}
              onChange={(e) =>
                updateHook.handleChange("description", e.target.value)
              }
              placeholder="Nhập mô tả (tùy chọn)"
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
