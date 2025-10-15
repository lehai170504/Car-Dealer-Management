"use client";
import { useCreateVehicle } from "@/hooks/useCreateVehicle";
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
import { Loader2 } from "lucide-react";

interface AddVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddVehicleModal({
  open,
  onClose,
  onSuccess,
}: AddVehicleModalProps) {
  const {
    newVehicleForm,
    setNewVehicleField,
    isCreateLoading,
    handleCreateSubmit,
  } = useCreateVehicle();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm xe mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label htmlFor="model">Mẫu xe</Label>
            <Input
              id="model"
              value={newVehicleForm.model}
              onChange={(e) => setNewVehicleField("model", e.target.value)}
              placeholder="VD: Toyota Camry"
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="version">Phiên bản</Label>
            <Input
              id="version"
              value={newVehicleForm.version}
              onChange={(e) => setNewVehicleField("version", e.target.value)}
              placeholder="VD: 2.5Q Luxury"
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="color">Màu xe</Label>
            <Input
              id="color"
              value={newVehicleForm.color}
              onChange={(e) => setNewVehicleField("color", e.target.value)}
              placeholder="VD: Đen, Trắng, Đỏ..."
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="features">Tính năng (phân cách bằng dấu phẩy)</Label>
            <Input
              id="features"
              value={newVehicleForm.features.join(", ")}
              onChange={(e) => setNewVehicleField("features", e.target.value)}
              placeholder="VD: ABS, GPS, Leather seats, Bluetooth"
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="price">Giá tiền</Label>
            <Input
              id="price"
              value={newVehicleForm.price}
              onChange={(e) => setNewVehicleField("price", e.target.value)}
              placeholder="VD: 100.000d..."
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button
            onClick={() => handleCreateSubmit(onClose, onSuccess)}
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={isCreateLoading}
          >
            {isCreateLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Đang lưu...
              </>
            ) : (
              "Lưu"
            )}
          </Button>

          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300"
            disabled={isCreateLoading}
          >
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
