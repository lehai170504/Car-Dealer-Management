"use client";

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
import { useCreateVehicle } from "@/hooks/useCreateVehicle";

interface CreateVehicleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateVehicleModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateVehicleModalProps) {
  const createHook = useCreateVehicle();

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Tạo Vehicle mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Model */}
          <Input
            placeholder="Model"
            value={createHook.vehicleForm.model}
            onChange={(e) =>
              createHook.setVehicleField("model", e.target.value)
            }
            className={inputClass}
          />

          {/* Trim */}
          <Input
            placeholder="Trim"
            value={createHook.vehicleForm.trim}
            onChange={(e) => createHook.setVehicleField("trim", e.target.value)}
            className={inputClass}
          />

          {/* Battery */}
          <Input
            placeholder="Battery"
            value={createHook.vehicleForm.battery}
            onChange={(e) =>
              createHook.setVehicleField("battery", e.target.value)
            }
            className={inputClass}
          />

          {/* Range */}
          <Input
            type="number"
            placeholder="Range (km)"
            value={createHook.vehicleForm.range}
            onChange={(e) =>
              createHook.setVehicleField("range", Number(e.target.value))
            }
            className={inputClass}
          />

          {/* Motor Power */}
          <Input
            type="number"
            placeholder="Motor Power (hp)"
            value={createHook.vehicleForm.motorPower}
            onChange={(e) =>
              createHook.setVehicleField("motorPower", Number(e.target.value))
            }
            className={inputClass}
          />

          {/* MSRP */}
          <Input
            type="number"
            placeholder="MSRP ($)"
            value={createHook.vehicleForm.msrp}
            onChange={(e) =>
              createHook.setVehicleField("msrp", Number(e.target.value))
            }
            className={inputClass}
          />

          {/* Active */}
          <div>
            <label className="text-sm text-gray-300">Trạng thái</label>
            <Select
              value={createHook.vehicleForm.active ? "active" : "inactive"}
              onValueChange={(val) =>
                createHook.setVehicleField("active", val === "active")
              }
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2 border-t border-gray-700 pt-3">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              createHook.resetVehicleForm();
            }}
            className="hover:bg-gray-700 text-neutral-600"
          >
            Hủy
          </Button>
          <Button
            className="bg-sky-600 hover:bg-sky-700"
            onClick={() =>
              createHook.handleCreateSubmit(
                () => onOpenChange(false),
                onSuccess
              )
            }
            disabled={createHook.isCreateLoading}
          >
            {createHook.isCreateLoading ? "Đang tạo..." : "Tạo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
