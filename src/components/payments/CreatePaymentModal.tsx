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
import { useCreatePayment } from "@/hooks/useCreatePayment";

interface CreatePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreatePaymentModal({
  open,
  onOpenChange,
  onSuccess,
}: CreatePaymentModalProps) {
  const createHook = useCreatePayment();

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Tạo thanh toán mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* 🧾 Order liên kết */}
          <Input
            placeholder="Order ID liên kết"
            value={createHook.order}
            onChange={(e) => createHook.setOrder(e.target.value)}
            className={inputClass}
          />

          {/* 💰 Loại thanh toán */}
          <div>
            <label className="text-sm text-gray-300">Loại thanh toán</label>
            <Select
              value={createHook.type}
              onValueChange={(val) => createHook.setType(val as any)}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn loại thanh toán" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deposit">Đặt cọc</SelectItem>
                <SelectItem value="balance">Thanh toán còn lại</SelectItem>
                <SelectItem value="refund">Hoàn tiền</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 💵 Số tiền */}
          <Input
            type="number"
            placeholder="Số tiền thanh toán"
            value={createHook.amount}
            onChange={(e) => createHook.setAmount(Number(e.target.value))}
            className={inputClass}
          />

          {/* 💳 Phương thức thanh toán */}
          <div>
            <label className="text-sm text-gray-300">Phương thức</label>
            <Select
              value={createHook.method}
              onValueChange={(val) => createHook.setMethod(val as any)}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn phương thức" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Tiền mặt</SelectItem>
                <SelectItem value="bank">Chuyển khoản</SelectItem>
                <SelectItem value="finance">Trả góp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 🔗 Mã giao dịch */}
          <Input
            placeholder="Mã giao dịch / Transaction Ref"
            value={createHook.transactionRef}
            onChange={(e) => createHook.setTransactionRef(e.target.value)}
            className={inputClass}
          />

          {/* 📅 Ngày thanh toán */}
          <div>
            <label className="text-sm text-gray-300">Ngày thanh toán</label>
            <Input
              type="datetime-local"
              value={createHook.paidAt.slice(0, 16)} // format ISO -> datetime-local
              onChange={(e) =>
                createHook.setPaidAt(new Date(e.target.value).toISOString())
              }
              className={`${inputClass} mt-1`}
            />
          </div>

          {/* 🟢 Trạng thái */}
          <div>
            <label className="text-sm text-gray-300">Trạng thái</label>
            <Select
              value={createHook.status}
              onValueChange={(val) => createHook.setStatus(val as any)}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="failed">Thất bại</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 📝 Ghi chú */}
          <Input
            placeholder="Ghi chú (nếu có)"
            value={createHook.notes}
            onChange={(e) => createHook.setNotes(e.target.value)}
            className={inputClass}
          />
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2 border-t border-gray-700 pt-3">
          <Button
            className="bg-sky-600 hover:bg-sky-700"
            onClick={() =>
              createHook.handleSubmit(onSuccess, () => onOpenChange(false))
            }
            disabled={createHook.loading}
          >
            {createHook.loading ? "Đang tạo..." : "Tạo"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              createHook.resetForm();
            }}
            className="hover:bg-gray-700 text-neutral-200"
          >
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
