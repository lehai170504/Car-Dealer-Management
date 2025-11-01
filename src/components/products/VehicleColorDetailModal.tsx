"use client";

import { useState, useEffect } from "react";
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
import { useVehicleColors } from "@/hooks/useVehicleColors";
import { FormattedNumberInput } from "../commons/FormattedNumberInput";
import { vehicleColorSchema } from "@/validations/vehicleColorSchema";

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
  const { handleUpdate } = useVehicleColors();

  if (!color) return null;

  const [formData, setFormData] = useState<VehicleColor>({ ...color });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData({ ...color });
    setErrors({});
  }, [color]);

  const handleChange = (field: keyof VehicleColor, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSave = async () => {
    try {
      // Validate form
      await vehicleColorSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      await handleUpdate(color._id, formData);
      onUpdated();
      onOpenChange(false);
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const formErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "block text-gray-300 font-medium mb-1";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-lg w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold text-emerald-600">
            Chi tiết màu xe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Name */}
          <div className="space-y-1">
            <label className={labelClass}>Tên màu</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Code */}
          <div className="space-y-1">
            <label className={labelClass}>Mã Code</label>
            <Input
              value={formData.code}
              onChange={(e) => handleChange("code", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
            {errors.code && (
              <p className="text-red-400 text-xs">{errors.code}</p>
            )}
          </div>

          {/* Hex */}
          <div className="space-y-1">
            <label className={labelClass}>Hex</label>
            <Input
              type="color"
              value={formData.hex}
              onChange={(e) => handleChange("hex", e.target.value)}
              className="w-20 h-12 p-0 bg-gray-800 border border-gray-600 rounded-md shadow-inner"
            />
            {errors.hex && <p className="text-red-400 text-xs">{errors.hex}</p>}
          </div>

          {/* Extra Price */}
          <div className="space-y-1">
            <label className={labelClass}>Extra Price</label>
            <FormattedNumberInput
              label="Extra Price"
              value={formData.extraPrice}
              onChange={(val) => handleChange("extraPrice", val)}
            />
            {errors.extraPrice && (
              <p className="text-red-400 text-xs">{errors.extraPrice}</p>
            )}
          </div>

          {/* Active */}
          <div className="space-y-1">
            <label className={labelClass}>Trạng thái</label>
            <Select
              value={formData.active ? "active" : "inactive"}
              onValueChange={(val) => handleChange("active", val === "active")}
            >
              <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm hover:border-gray-500">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
            {errors.active && (
              <p className="text-red-400 text-xs">{errors.active}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-3 border-t border-gray-700 pt-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="hover:bg-gray-700 text-neutral-700"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
