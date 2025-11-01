"use client";

import { useEffect } from "react";
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
import { toast } from "sonner";
import { useInventoryTransferForm } from "@/hooks/UseInventoryTransferFormResult";

interface InventoryTransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function InventoryTransferModal({
  open,
  onOpenChange,
  onSuccess,
}: InventoryTransferModalProps) {
  const {
    vehicleOptions,
    colorOptions,
    dealerOptions,
    variant,
    setVariant,
    color,
    setColor,
    fromDealer,
    setFromDealer,
    toDealer,
    setToDealer,
    quantity,
    setQuantity,
    transfer,
    loading,
    error,
    successMessage,
  } = useInventoryTransferForm();

  // Reset form khi modal đóng
  useEffect(() => {
    if (!open) {
      setVariant("");
      setColor("");
      setFromDealer("");
      setToDealer("");
      setQuantity(0);
    }
  }, [open, setVariant, setColor, setFromDealer, setToDealer, setQuantity]);

  // Hiện toast nếu có lỗi hoặc thành công
  useEffect(() => {
    if (error) toast.error(error);
    if (successMessage) {
      toast.success(successMessage);
      onSuccess();
      onOpenChange(false);
    }
  }, [error, successMessage, onSuccess, onOpenChange]);

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold text-emerald-600">
            Chuyển kho xe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Vehicle */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Xe</label>
            <Select value={variant} onValueChange={setVariant}>
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn xe" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                {vehicleOptions.map((v) => (
                  <SelectItem key={v.value} value={v.value}>
                    {v.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Màu</label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn màu" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                {colorOptions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* From Dealer */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Từ đại lý</label>
            <Select value={fromDealer} onValueChange={setFromDealer}>
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn đại lý gửi" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                {dealerOptions.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To Dealer */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Đến đại lý</label>
            <Select value={toDealer} onValueChange={setToDealer}>
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn đại lý nhận" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                {dealerOptions.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Số lượng</label>
            <Input
              type="number"
              placeholder="Nhập số lượng"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2 border-t border-gray-700 pt-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="hover:bg-gray-700 text-neutral-600"
          >
            Hủy
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={transfer}
            disabled={loading}
          >
            {loading ? "Đang chuyển..." : "Chuyển"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
