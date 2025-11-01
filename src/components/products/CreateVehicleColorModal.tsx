"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useVehicleColors } from "@/hooks/useVehicleColors";
import { vehicleColorSchema } from "@/validations/vehicleColorSchema";

interface CreateVehicleColorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateVehicleColorModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateVehicleColorModalProps) {
  const { handleCreate } = useVehicleColors();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    hex: "#000000",
    extraPrice: 0,
    active: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      hex: "#000000",
      extraPrice: 0,
      active: true,
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    try {
      await vehicleColorSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      await handleCreate(formData);
      onSuccess();
      onOpenChange(false);
      resetForm();
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

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold text-emerald-600">
            Tạo màu xe mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Name */}
          <div className="space-y-1">
            <Input
              placeholder="Tên màu"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputClass}
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Code */}
          <div className="space-y-1">
            <Input
              placeholder="Mã Code"
              value={formData.code}
              onChange={(e) => handleChange("code", e.target.value)}
              className={inputClass}
            />
            {errors.code && (
              <p className="text-red-400 text-xs">{errors.code}</p>
            )}
          </div>

          {/* Hex */}
          <div className="space-y-1">
            <Input
              type="color"
              value={formData.hex}
              onChange={(e) => handleChange("hex", e.target.value)}
              className={`${inputClass} h-12 w-20 p-0`}
            />
            {errors.hex && <p className="text-red-400 text-xs">{errors.hex}</p>}
          </div>

          {/* Extra Price */}
          <div className="space-y-1">
            <Input
              type="number"
              placeholder="Extra Price (tùy chọn)"
              value={formData.extraPrice}
              onChange={(e) =>
                handleChange("extraPrice", Number(e.target.value) || 0)
              }
              className={inputClass}
            />
            {errors.extraPrice && (
              <p className="text-red-400 text-xs">{errors.extraPrice}</p>
            )}
          </div>

          {/* Active */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Trạng thái</label>
            <Select
              value={formData.active ? "active" : "inactive"}
              onValueChange={(val) => handleChange("active", val === "active")}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
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

        <DialogFooter className="mt-6 flex justify-end gap-2 border-t border-gray-700 pt-3">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              resetForm();
            }}
            className="hover:bg-gray-700 text-neutral-600"
          >
            Hủy
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
