"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateContract } from "@/hooks/useCreateContract";
import { ContractStatus } from "@/types/contracts";

interface CreateContractModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const CreateContractModal = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateContractModalProps) => {
  const {
    dealer,
    setDealer,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    targets,
    setTargets,
    discountPolicyRef,
    setDiscountPolicyRef,
    status,
    setStatus,
    loading,
    handleSubmit,
    resetForm,
  } = useCreateContract();

  const closeModal = () => {
    onOpenChange(false);
    resetForm();
  };

  const labelClass = "block text-gray-300 font-medium mb-1";

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
            Tạo Contract mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Dealer */}
          <div className="space-y-1">
            <label className={labelClass}>ID đại lý</label>
            <Input
              placeholder="ID đại lý"
              value={dealer}
              onChange={(e) => setDealer(e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-1">
            <label className={labelClass}>Ngày bắt đầu</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* End Date */}
          <div className="space-y-1">
            <label className={labelClass}>Ngày kết thúc</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Targets */}
          <div className="space-y-1">
            <label className={labelClass}>Mục tiêu</label>
            <Textarea
              placeholder="Mục tiêu hợp đồng"
              value={targets}
              onChange={(e) => setTargets(e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Discount Policy */}
          <div className="space-y-1">
            <label className={labelClass}>ID chính sách giảm giá</label>
            <Input
              placeholder="ID chính sách giảm giá"
              value={discountPolicyRef}
              onChange={(e) => setDiscountPolicyRef(e.target.value)}
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className={labelClass}>Trạng thái</label>
            <Select
              value={status}
              onValueChange={(val: ContractStatus) => setStatus(val)}
            >
              <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm hover:border-gray-500">
                <SelectValue placeholder="Chọn trạng thái">
                  {statusLabelMap[status]}
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
            onClick={closeModal}
            className="hover:bg-gray-700 text-neutral-700"
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleSubmit(onSuccess, closeModal)}
            disabled={loading}
            className="bg-sky-600 hover:bg-sky-700"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Tạo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
