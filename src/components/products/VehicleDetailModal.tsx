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
import { useUpdateVehicle } from "@/hooks/useUpdateVehicle";
import { FormattedNumberInput } from "@/components/commons/FormattedNumberInput";
import type { Vehicle } from "@/types/vehicles";

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export function VehicleDetailModal({
  vehicle,
  open,
  onOpenChange,
  onUpdated,
}: VehicleDetailModalProps) {
  if (!vehicle) return null;

  const updateHook = useUpdateVehicle(vehicle);
  const labelClass = "block text-gray-300 font-medium mb-1";

  const handleSave = async () => {
    await updateHook.handleUpdate(onUpdated, () => onOpenChange(false));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-lg w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chi tiết Vehicle
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Model */}
          <div className="space-y-1">
            <label className={labelClass}>Model</label>
            <Input
              value={vehicle.model?.name || ""}
              disabled
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Trim */}
          <div className="space-y-1">
            <label className={labelClass}>Trim</label>
            <Input
              value={updateHook.formData.trim}
              onChange={(e) => updateHook.handleChange("trim", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Battery */}
          <div className="space-y-1">
            <label className={labelClass}>Battery</label>
            <Input
              value={updateHook.formData.battery}
              onChange={(e) =>
                updateHook.handleChange("battery", e.target.value)
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Range */}
          <div className="space-y-1">
            <label className={labelClass}>Range (km)</label>
            <Input
              type="number"
              value={updateHook.formData.range}
              onChange={(e) =>
                updateHook.handleChange("range", Number(e.target.value))
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Motor Power */}
          <div className="space-y-1">
            <label className={labelClass}>Motor Power (hp)</label>
            <Input
              type="number"
              value={updateHook.formData.motorPower}
              onChange={(e) =>
                updateHook.handleChange("motorPower", Number(e.target.value))
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* MSRP */}
          <div className="space-y-1">
            <FormattedNumberInput
              label="MSRP ($)"
              value={updateHook.formData.msrp}
              onChange={(val) => updateHook.handleChange("msrp", val)}
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
            disabled={updateHook.isUpdateLoading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {updateHook.isUpdateLoading && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
