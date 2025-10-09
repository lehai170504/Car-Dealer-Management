"use client";
import { useState } from "react";
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

interface AddVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (vehicle: VehicleMaster) => void;
}

export function AddVehicleModal({
  open,
  onClose,
  onSave,
}: AddVehicleModalProps) {
  const [model, setModel] = useState("");
  const [version, setVersion] = useState("");
  const [colors, setColors] = useState(0);
  const [basePrice, setBasePrice] = useState("");

  const handleSave = () => {
    const newVehicle: VehicleMaster = {
      id: `M${Date.now()}`,
      model,
      version,
      colors,
      basePrice,
      status: "Pending",
    };
    onSave(newVehicle);
    setModel("");
    setVersion("");
    setColors(0);
    setBasePrice("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Thêm Model/Phiên bản</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Mẫu xe</Label>
            <Input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
          <div>
            <Label>Phiên bản</Label>
            <Input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
          <div>
            <Label>Số lượng màu</Label>
            <Input
              type="number"
              value={colors}
              onChange={(e) => setColors(Number(e.target.value))}
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
          <div>
            <Label>Giá cơ bản (VNĐ)</Label>
            <Input
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Lưu
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
