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
import { useCreateTestDrive } from "@/hooks/useCreateTestDrive";

interface CreateTestDriveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

export function CreateTestDriveModal({
  open,
  onOpenChange,
  onCreated,
}: CreateTestDriveModalProps) {
  const createHook = useCreateTestDrive();

  const handleSubmit = async () => {
    await createHook.handleSubmit(onCreated, () => onOpenChange(false));
  };

  const labelClass = "block text-gray-300 font-medium mb-1";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-lg w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Tạo mới Test Drive
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Customer */}
          <div className="space-y-1">
            <label className={labelClass}>Khách hàng</label>
            <Input
              value={createHook.customer}
              onChange={(e) => createHook.setCustomer(e.target.value)}
              placeholder="Nhập tên khách hàng hoặc ID"
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Dealer */}
          <div className="space-y-1">
            <label className={labelClass}>Đại lý</label>
            <Input
              value={createHook.dealer}
              onChange={(e) => createHook.setDealer(e.target.value)}
              placeholder="Nhập tên đại lý hoặc ID"
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Variant */}
          <div className="space-y-1">
            <label className={labelClass}>Mẫu xe</label>
            <Input
              value={createHook.variant}
              onChange={(e) => createHook.setVariant(e.target.value)}
              placeholder="Nhập tên variant hoặc ID"
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Preferred Time */}
          <div className="space-y-1">
            <label className={labelClass}>Thời gian mong muốn</label>
            <Input
              type="datetime-local"
              value={createHook.preferredTime}
              onChange={(e) => createHook.setPreferredTime(e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className={labelClass}>Trạng thái</label>
            <Select
              value={createHook.status}
              onValueChange={(value) => createHook.setStatus(value as any)}
            >
              <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm hover:border-gray-500">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="done">Đã hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assigned Staff */}
          <div className="space-y-1">
            <label className={labelClass}>Nhân viên phụ trách</label>
            <Input
              value={createHook.assignedStaff}
              onChange={(e) => createHook.setAssignedStaff(e.target.value)}
              placeholder="Nhập tên nhân viên"
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-3 border-t border-gray-700 pt-3">
          <Button
            variant="outline"
            onClick={() => {
              createHook.resetForm();
              onOpenChange(false);
            }}
            className="hover:bg-gray-700 text-gray-600"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createHook.loading}
            className="bg-sky-600 hover:bg-sky-700"
          >
            {createHook.loading && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
