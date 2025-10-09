"use client";
import { useState, useEffect } from "react";
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

interface VehicleMaster {
  id: string;
  model: string;
  version: string;
  colors: number;
  basePrice: string;
  status: string;
}

interface EditVehicleModalProps {
  open: boolean;
  onClose: () => void;
  vehicle: VehicleMaster | null;
  onSave: (vehicle: VehicleMaster) => void;
}

export function EditVehicleModal({
  open,
  onClose,
  vehicle,
  onSave,
}: EditVehicleModalProps) {
  const [form, setForm] = useState<VehicleMaster | null>(vehicle);

  useEffect(() => {
    setForm(vehicle);
  }, [vehicle]);

  if (!form) return null;

  const handleChange = (key: keyof VehicleMaster, value: string | number) => {
    setForm({ ...form, [key]: value } as VehicleMaster);
  };

  const handleSave = () => {
    onSave(form!);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa Model/Phiên bản</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Mẫu xe</Label>
            <Input
              value={form.model}
              onChange={(e) => handleChange("model", e.target.value)}
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
          <div>
            <Label>Phiên bản</Label>
            <Input
              value={form.version}
              onChange={(e) => handleChange("version", e.target.value)}
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
          <div>
            <Label>Số lượng màu</Label>
            <Input
              type="number"
              value={form.colors}
              onChange={(e) => handleChange("colors", Number(e.target.value))}
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
          <div>
            <Label>Giá cơ bản (VNĐ)</Label>
            <Input
              value={form.basePrice}
              onChange={(e) => handleChange("basePrice", e.target.value)}
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700">
            Lưu thay đổi
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300"
          >
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
