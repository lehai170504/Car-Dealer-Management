"use client";

import { Loader2, X } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { FormattedNumberInput } from "@/components/commons/FormattedNumberInput";
import type { Vehicle, UpdateVehicleRequest } from "@/types/vehicles";
import { vehicleSchema } from "@/validations/vehicleSchema";

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
  const { handleUpdate } = useVehicles();
  const [formData, setFormData] = useState<UpdateVehicleRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (vehicle) {
      setFormData({
        trim: vehicle.trim,
        battery: vehicle.battery,
        range: vehicle.range,
        motorPower: vehicle.motorPower,
        msrp: vehicle.msrp,
        active: vehicle.active,
        features: vehicle.features || [],
        images: vehicle.images || [],
      });
      setErrors({});
    }
  }, [vehicle]);

  if (!vehicle || !formData) return null;

  const handleChange = <K extends keyof UpdateVehicleRequest>(
    field: K,
    value: UpdateVehicleRequest[K]
  ) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
    setErrors((prev) => ({ ...prev, [field]: "" })); // xóa lỗi khi người dùng sửa
  };

  // Features
  const handleFeatureAdd = (value: string) => {
    if (!value.trim()) return;
    handleChange("features", [...(formData.features || []), value.trim()]);
  };
  const handleFeatureRemove = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    handleChange("features", newFeatures);
  };

  // Images
  const handleImageAdd = (value: string) => {
    if (!value.trim()) return;
    handleChange("images", [...(formData.images || []), value.trim()]);
  };
  const handleImageRemove = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    handleChange("images", newImages);
  };

  const handleSave = async () => {
    if (!formData) return;
    setIsLoading(true);
    setErrors({});
    try {
      await vehicleSchema.validate(formData, { abortEarly: false });

      await handleUpdate(vehicle._id, formData);
      onUpdated();
      onOpenChange(false);
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const formErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      } else {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-lg w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold text-emerald-600">
            Chi tiết Xe
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="basic"
          className="space-y-4 mt-4 bg-gray-900 text-gray-100"
        >
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 rounded-md border border-gray-700">
            <TabsTrigger value="basic" className="text-gray-500">
              Thông tin cơ bản
            </TabsTrigger>
            <TabsTrigger value="features" className="text-gray-500">
              Features
            </TabsTrigger>
            <TabsTrigger value="images" className="text-gray-500">
              Images
            </TabsTrigger>
            <TabsTrigger value="status" className="text-gray-500">
              Trạng thái
            </TabsTrigger>
          </TabsList>

          {/* Basic Info */}
          <TabsContent value="basic" className="space-y-3 bg-gray-900">
            {/* Model (disabled) */}
            <div className="space-y-1">
              <label className="block text-gray-300 font-medium">Model</label>
              <Input
                className={inputClass}
                value={vehicle.model?.name || ""}
                disabled
              />
              {errors.model && (
                <p className="text-red-500 text-sm">{errors.model}</p>
              )}
            </div>

            {/* Trim */}
            <div className="space-y-1">
              <label className="block text-gray-300 font-medium">Trim</label>
              <Input
                className={inputClass}
                value={formData.trim}
                onChange={(e) => handleChange("trim", e.target.value)}
              />
              {errors.trim && (
                <p className="text-red-500 text-sm">{errors.trim}</p>
              )}
            </div>

            {/* Battery */}
            <div className="space-y-1">
              <label className="block text-gray-300 font-medium">Battery</label>
              <Input
                className={inputClass}
                value={formData.battery}
                onChange={(e) => handleChange("battery", e.target.value)}
              />
              {errors.battery && (
                <p className="text-red-500 text-sm">{errors.battery}</p>
              )}
            </div>

            {/* Range */}
            <div className="space-y-1">
              <label className="block text-gray-300 font-medium">
                Range (km)
              </label>
              <Input
                className={inputClass}
                type="number"
                value={formData.range}
                onChange={(e) => handleChange("range", Number(e.target.value))}
              />
              {errors.range && (
                <p className="text-red-500 text-sm">{errors.range}</p>
              )}
            </div>

            {/* Motor Power */}
            <div className="space-y-1">
              <label className="block text-gray-300 font-medium">
                Motor Power (hp)
              </label>
              <Input
                className={inputClass}
                type="number"
                value={formData.motorPower}
                onChange={(e) =>
                  handleChange("motorPower", Number(e.target.value))
                }
              />
              {errors.motorPower && (
                <p className="text-red-500 text-sm">{errors.motorPower}</p>
              )}
            </div>

            {/* MSRP */}
            <div className="space-y-1">
              <FormattedNumberInput
                label="MSRP ($)"
                value={formData.msrp}
                onChange={(val) => handleChange("msrp", val)}
                className={inputClass}
              />
              {errors.msrp && (
                <p className="text-red-500 text-sm">{errors.msrp}</p>
              )}
            </div>
          </TabsContent>

          {/* Features */}
          <TabsContent value="features" className="bg-gray-900 p-2 rounded-md">
            <div className="flex flex-wrap gap-2 mb-2">
              {(formData.features || []).map((f, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="flex items-center gap-1 bg-gray-800 text-gray-100"
                >
                  {f}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleFeatureRemove(idx)}
                  >
                    <X className="w-3 h-3 text-gray-100" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Nhập feature và Enter..."
              className={inputClass}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFeatureAdd(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            {errors.features && (
              <p className="text-red-500 text-sm">{errors.features}</p>
            )}
          </TabsContent>

          {/* Images */}
          <TabsContent value="images" className="bg-gray-900 p-2 rounded-md">
            <div className="flex flex-col gap-2 mb-2">
              {(formData.images || []).map((img, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    className={inputClass}
                    value={img}
                    onChange={(e) => {
                      const newImages = [...(formData.images || [])];
                      newImages[idx] = e.target.value;
                      handleChange("images", newImages);
                    }}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleImageRemove(idx)}
                  >
                    <X className="w-4 h-4 text-gray-100" />
                  </Button>
                </div>
              ))}
            </div>
            <Input
              placeholder="Nhập URL và Enter..."
              className={inputClass}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleImageAdd(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images}</p>
            )}
          </TabsContent>

          {/* Status */}
          <TabsContent value="status" className="bg-gray-900 p-2 rounded-md">
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
              <p className="text-red-500 text-sm">{errors.active}</p>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6 flex justify-end space-x-3 border-t border-gray-700 pt-3">
          <Button
            variant="outline"
            onClick={() => {
              setFormData({
                trim: vehicle.trim,
                battery: vehicle.battery,
                range: vehicle.range,
                motorPower: vehicle.motorPower,
                msrp: vehicle.msrp,
                active: vehicle.active,
                features: vehicle.features || [],
                images: vehicle.images || [],
              });
              setErrors({});
              onOpenChange(false);
            }}
            className="hover:bg-gray-700 text-neutral-700"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 flex items-center"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
