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
import type { Order, OrderStatus, PaymentMethod } from "@/types/orders";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export function OrderDetailModal({
  order,
  open,
  onOpenChange,
  onUpdated,
}: OrderDetailModalProps) {
  const updateHook = useUpdateOrder(order!);

  if (!order) return null;

  const labelClass = "block text-gray-300 font-medium mb-1";

  const handleSave = async () => {
    await updateHook.handleUpdate(onUpdated, () => onOpenChange(false));
  };

  // mapping trạng thái & payment method
  const statusLabelMap: Record<OrderStatus, string> = {
    new: "Mới",
    confirmed: "Đã xác nhận",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-2xl w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chi tiết Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Thông tin chỉ đọc */}
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Khách hàng:</span>
            <span className="font-semibold text-gray-50">{order.customer}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Đại lý:</span>
            <span className="font-semibold text-gray-50">{order.dealer}</span>
          </div>
          <div className="space-y-2">
            <span className="text-gray-300 font-medium">
              Danh sách Variant:
            </span>
            <ul className="list-disc ml-4 text-gray-50">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.variant} - {item.color} x{item.qty} @{" "}
                  {item.unitPrice.toLocaleString()} VND
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className={labelClass}>Trạng thái</label>
            <Select
              value={updateHook.formData.status}
              onValueChange={(value) =>
                updateHook.handleChange("status", value as OrderStatus)
              }
            >
              <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm hover:border-gray-500">
                <SelectValue placeholder="Chọn trạng thái">
                  {statusLabelMap[updateHook.formData.status]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="new">Mới</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="delivered">Đã giao</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment Method */}
          <div className="space-y-1">
            <label className={labelClass}>Phương thức thanh toán</label>
            <Select
              value={updateHook.formData.paymentMethod}
              onValueChange={(value) =>
                updateHook.handleChange("paymentMethod", value as PaymentMethod)
              }
            >
              <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm hover:border-gray-500">
                <SelectValue placeholder="Chọn phương thức" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="sepay">Sepay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deposit */}
          <div className="space-y-1">
            <label className={labelClass}>Deposit</label>
            <Input
              type="number"
              value={updateHook.formData.deposit}
              onChange={(e) =>
                updateHook.handleChange("deposit", Number(e.target.value))
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Actual Delivery */}
          <div className="space-y-1">
            <label className={labelClass}>Ngày giao thực tế</label>
            <Input
              type="datetime-local"
              value={updateHook.formData.actualDelivery?.slice(0, 16) || ""}
              onChange={(e) =>
                updateHook.handleChange("actualDelivery", e.target.value)
              }
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
            className="bg-emerald-600 hover:bg-emerald-700"
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
