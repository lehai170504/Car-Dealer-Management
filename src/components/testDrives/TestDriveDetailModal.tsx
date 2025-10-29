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
import type { TestDrive, TestDriveStatus } from "@/types/testDrives";
import { useUpdateTestDrive } from "@/hooks/useUpdateTestDrive";
import Swal from "sweetalert2";

interface TestDriveDetailModalProps {
  testDrive: TestDrive;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export function TestDriveDetailModal({
  testDrive,
  open,
  onOpenChange,
  onUpdated,
}: TestDriveDetailModalProps) {
  const updateHook = useUpdateTestDrive(testDrive);

  const handleSave = async () => {
    await updateHook.handleUpdate(
      () => {
        Swal.fire("Thành công", "Cập nhật Test Drive thành công!", "success");
        onUpdated();
      },
      () => onOpenChange(false)
    );
  };

  const labelClass = "block text-gray-300 font-medium mb-1";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-lg w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chi tiết Test Drive
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Khách hàng:</span>
            <span className="font-semibold text-gray-50">
              {testDrive.customer}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Mẫu xe:</span>
            <span className="font-semibold text-sky-400">
              {testDrive.variant}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Thời gian:</span>
            <span className="font-semibold text-gray-50">
              {new Date(testDrive.preferredTime).toLocaleString()}
            </span>
          </div>

          {/* Trạng thái */}
          <div className="space-y-1">
            <label className={labelClass}>Trạng thái</label>
            <Select
              value={updateHook.formData.status}
              onValueChange={(value) =>
                updateHook.handleChange("status", value as TestDriveStatus)
              }
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

          {/* Feedback */}
          <div className="space-y-1">
            <label className={labelClass}>Feedback</label>
            <Input
              value={updateHook.formData.result.feedback}
              onChange={(e) =>
                updateHook.handleResultChange("feedback", e.target.value)
              }
              placeholder="Nhập feedback..."
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-1">
            <label className={labelClass}>Interest Rate (%)</label>
            <Input
              type="number"
              value={updateHook.formData.result.interestRate ?? ""}
              onChange={(e) =>
                updateHook.handleResultChange(
                  "interestRate",
                  Number(e.target.value)
                )
              }
              placeholder="Nhập lãi suất"
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-3 border-t border-gray-700 pt-3">
          <Button
            variant="outline"
            onClick={() => {
              updateHook.cancelEdit();
              onOpenChange(false);
            }}
            className="hover:bg-gray-700 text-neutral-700"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateHook.loading}
            className="bg-sky-600 hover:bg-sky-700"
          >
            {updateHook.loading && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
