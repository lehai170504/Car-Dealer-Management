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
import { Textarea } from "@/components/ui/textarea";
import type { Payment, PaymentStatus } from "@/types/payments";
import { useUpdatePayment } from "@/hooks/useUpdatePayment";

interface PaymentDetailModalProps {
  payment: Payment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export function PaymentDetailModal({
  payment,
  open,
  onOpenChange,
  onUpdated,
}: PaymentDetailModalProps) {
  if (!payment) return null;

  const updateHook = useUpdatePayment(payment);

  const labelClass = "block text-gray-300 font-medium mb-1";

  const handleSave = async () => {
    await updateHook.handleUpdate(onUpdated, () => onOpenChange(false));
  };

  const statusLabelMap: Record<PaymentStatus, string> = {
    pending: "Đang chờ",
    confirmed: "Đã xác nhận",
    failed: "Thất bại",
    cancelled: "Đã hủy",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-lg w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chi tiết Thanh toán
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Info readonly */}
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Mã giao dịch:</span>
            <span className="font-semibold text-gray-50">
              {payment.transactionRef}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Loại thanh toán:</span>
            <span className="font-semibold capitalize text-gray-50">
              {payment.type}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Phương thức:</span>
            <span className="font-semibold capitalize text-gray-50">
              {payment.method}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Số tiền:</span>
            <span className="font-semibold text-emerald-400">
              {payment.amount.toLocaleString()} VND
            </span>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className={labelClass}>Trạng thái</label>
            <Select
              value={updateHook.formData.status}
              onValueChange={(value) =>
                updateHook.handleChange("status", value as PaymentStatus)
              }
            >
              <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm hover:border-gray-500">
                <SelectValue placeholder="Chọn trạng thái">
                  {statusLabelMap[updateHook.formData.status]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="pending">Đang chờ</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="failed">Thất bại</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transaction Ref */}
          <div className="space-y-1">
            <label className={labelClass}>Mã giao dịch</label>
            <Input
              value={updateHook.formData.transactionRef}
              onChange={(e) =>
                updateHook.handleChange("transactionRef", e.target.value)
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className={labelClass}>Ghi chú</label>
            <Textarea
              value={updateHook.formData.notes}
              onChange={(e) => updateHook.handleChange("notes", e.target.value)}
              placeholder="Nhập ghi chú..."
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
