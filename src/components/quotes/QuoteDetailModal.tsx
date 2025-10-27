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
import type { Quote, QuoteStatus } from "@/types/quotes";
import { useUpdateQuote } from "@/hooks/useUpdateQuote";

interface QuoteDetailModalProps {
  quote: Quote | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void; // callback để refresh danh sách sau khi cập nhật
}

export function QuoteDetailModal({
  quote,
  open,
  onOpenChange,
  onUpdated,
}: QuoteDetailModalProps) {
  const updateHook = useUpdateQuote(quote, { onUpdated });

  if (!quote) return null;

  const labelClass = "block text-gray-300 font-medium mb-1";

  const handleSave = async () => {
    await updateHook.handleUpdate(() => onOpenChange(false));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-2xl w-full rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chi tiết Quote
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Khách hàng */}
          <div className="flex justify-between">
            <span className="text-gray-300 font-medium">Khách hàng:</span>
            <span className="font-semibold text-gray-50">
              {updateHook.formData.customer}
            </span>
          </div>

          {/* Trạng thái */}
          <div className="space-y-1">
            <label className={labelClass}>Trạng thái</label>
            <Select
              value={updateHook.formData.status}
              onValueChange={(value) =>
                updateHook.handleChange("status", value as QuoteStatus)
              }
            >
              <SelectTrigger className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm hover:border-gray-500">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="draft">Bản nháp</SelectItem>
                <SelectItem value="sent">Đã gửi</SelectItem>
                <SelectItem value="completed">Đã chuyển đổi</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tổng giá */}
          <div className="space-y-1">
            <label className={labelClass}>Tổng giá</label>
            <Input
              type="number"
              value={updateHook.formData.total || 0}
              onChange={(e) =>
                updateHook.handleChange("total", Number(e.target.value))
              }
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Ghi chú */}
          <div className="space-y-1">
            <label className={labelClass}>Ghi chú</label>
            <Input
              value={updateHook.formData.notes || ""}
              onChange={(e) => updateHook.handleChange("notes", e.target.value)}
              placeholder="Nhập ghi chú..."
              className="bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Ngày hết hạn */}
          <div className="space-y-1">
            <label className={labelClass}>Ngày hết hạn</label>
            <Input
              type="date"
              value={updateHook.formData.validUntil?.slice(0, 10) || ""}
              onChange={(e) =>
                updateHook.handleChange("validUntil", e.target.value)
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
