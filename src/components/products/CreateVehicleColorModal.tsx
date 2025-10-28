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
import { useCreateVehicleColor } from "@/hooks/useCreateVehicleColor";

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
  const createHook = useCreateVehicleColor();

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Tạo Vehicle Color mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* 📝 Name */}
          <Input
            placeholder="Tên màu"
            value={createHook.name}
            onChange={(e) => createHook.setName(e.target.value)}
            className={inputClass}
          />

          {/* 🏷 Code */}
          <Input
            placeholder="Mã Code"
            value={createHook.code}
            onChange={(e) => createHook.setCode(e.target.value)}
            className={inputClass}
          />

          {/* 🎨 Hex */}
          <Input
            type="color"
            value={createHook.hex}
            onChange={(e) => createHook.setHex(e.target.value)}
            className={`${inputClass} h-12 w-20 p-0`}
          />

          {/* 💰 Extra Price */}
          <Input
            type="number"
            placeholder="Extra Price (tùy chọn)"
            value={createHook.extraPrice}
            onChange={(e) =>
              createHook.setExtraPrice(Number(e.target.value) || 0)
            }
            className={inputClass}
          />

          {/* 🟢 Active */}
          <div>
            <label className="text-sm text-gray-300">Trạng thái</label>
            <Select
              value={createHook.active ? "active" : "inactive"}
              onValueChange={(val) => createHook.setActive(val === "active")}
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
              createHook.resetForm();
            }}
            className="hover:bg-gray-700 text-neutral-600"
          >
            Hủy
          </Button>
          <Button
            className="bg-sky-600 hover:bg-sky-700"
            onClick={() =>
              createHook.handleSubmit(onSuccess, () => onOpenChange(false))
            }
            disabled={createHook.loading}
          >
            {createHook.loading ? "Đang tạo..." : "Tạo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
