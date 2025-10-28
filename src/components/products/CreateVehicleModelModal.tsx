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
import { useCreateVehicleModel } from "@/hooks/useCreateVehicleModel";

interface CreateVehicleModelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateVehicleModelModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateVehicleModelModalProps) {
  const createHook = useCreateVehicleModel();

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Tạo Vehicle Model mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* 📝 Name */}
          <Input
            placeholder="Tên Model"
            value={createHook.name}
            onChange={(e) => createHook.setName(e.target.value)}
            className={inputClass}
          />

          {/* 🏷 Brand */}
          <Input
            placeholder="Thương hiệu"
            value={createHook.brand}
            onChange={(e) => createHook.setBrand(e.target.value)}
            className={inputClass}
          />

          {/* 📊 Segment */}
          <Input
            placeholder="Phân khúc"
            value={createHook.segment}
            onChange={(e) => createHook.setSegment(e.target.value)}
            className={inputClass}
          />

          {/* 📝 Description */}
          <Input
            placeholder="Mô tả (tùy chọn)"
            value={createHook.description}
            onChange={(e) => createHook.setDescription(e.target.value)}
            className={inputClass}
          />

          {/* 🟢 Active */}
          <div>
            <label className="text-sm text-gray-300">Trạng thái</label>
            <Select
              value={createHook.active ? "active" : "inactive"}
              onValueChange={(val) =>
                createHook.setActive(val === "active" ? true : false)
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
