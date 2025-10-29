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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Contract, ContractStatus } from "@/types/contracts";
import { useUpdateContract } from "@/hooks/useUpdateContract";

interface ContractDetailModalProps {
  contract: Contract | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export const ContractDetailModal = ({
  contract,
  open,
  onOpenChange,
  onUpdated,
}: ContractDetailModalProps) => {
  const updateHook = useUpdateContract(contract!);

  if (!contract) return null;

  const labelClass = "block text-gray-300 font-medium mb-1";

  const handleSave = async () => {
    await updateHook.handleUpdate(onUpdated, () => onOpenChange(false));
  };

  const statusLabelMap: Record<ContractStatus, string> = {
    draft: "Nháp",
    active: "Hoạt động",
    signed: "Đã ký",
    cancelled: "Đã hủy",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-2xl w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chi tiết Contract
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Thông tin chỉ đọc */}
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Mã Contract:</span>
            <span className="font-semibold text-gray-50">
              {contract.contractNo}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Order liên quan:</span>
            <span className="font-semibold text-gray-50">{contract.order}</span>
          </div>

          {/* Targets */}
          <div className="space-y-1">
            <label className={labelClass}>Mục tiêu</label>
            <Textarea
              value={updateHook.formData.targets}
              onChange={(e) =>
                updateHook.handleChange("targets", e.target.value)
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Terms */}
          <div className="space-y-1">
            <label className={labelClass}>Điều khoản</label>
            <Textarea
              value={updateHook.formData.terms}
              onChange={(e) => updateHook.handleChange("terms", e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Files */}
          <div className="space-y-1">
            <label className={labelClass}>Files đính kèm</label>
            <Textarea
              value={updateHook.formData.files.join("\n")}
              onChange={(e) =>
                updateHook.handleChange("files", e.target.value.split("\n"))
              }
              placeholder="Nhập URL file, mỗi dòng 1 file"
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Signed Date */}
          <div className="space-y-1">
            <label className={labelClass}>Ngày ký</label>
            <Input
              type="date"
              value={updateHook.formData.signedDate || ""}
              onChange={(e) =>
                updateHook.handleChange("signedDate", e.target.value)
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className={labelClass}>Trạng thái</label>
            <Select
              value={updateHook.formData.status}
              onValueChange={(val: ContractStatus) =>
                updateHook.handleChange("status", val)
              }
            >
              <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm hover:border-gray-500">
                <SelectValue placeholder="Chọn trạng thái">
                  {statusLabelMap[updateHook.formData.status]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="draft">Nháp</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="signed">Đã ký</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
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
};
