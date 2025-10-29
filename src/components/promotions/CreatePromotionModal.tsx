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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCreatePromotion } from "@/hooks/useCreatePromotion";
import { Loader2 } from "lucide-react";

interface CreatePromotionModalProps {
  open: boolean;
  onClose: () => void; // đổi từ onOpenChange sang onClose
  onSuccess: () => void;
}

export function CreatePromotionModal({
  open,
  onClose,
  onSuccess,
}: CreatePromotionModalProps) {
  const hook = useCreatePromotion();

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  const handleClose = () => {
    hook.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Tạo chương trình khuyến mãi mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Tên chương trình"
            value={hook.name}
            onChange={(e) => hook.setName(e.target.value)}
            className={inputClass}
          />

          <div>
            <label className="text-sm text-gray-300">Phạm vi</label>
            <Select
              value={hook.scope}
              onValueChange={(val) => hook.setScope(val as any)}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn phạm vi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Toàn hệ thống</SelectItem>
                <SelectItem value="byDealer">Theo đại lý</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hook.scope === "byDealer" && (
            <Input
              placeholder="Danh sách đại lý (IDs, cách nhau dấu phẩy)"
              value={(hook.dealers || []).join(",")}
              onChange={(e) =>
                hook.setDealers(e.target.value.split(",").map((d) => d.trim()))
              }
              className={inputClass}
            />
          )}

          <Input
            placeholder="Biến thể áp dụng (IDs, cách nhau dấu phẩy)"
            value={(hook.variants || []).join(",")}
            onChange={(e) =>
              hook.setVariants(e.target.value.split(",").map((v) => v.trim()))
            }
            className={inputClass}
          />

          <div>
            <label className="text-sm text-gray-300">Loại khuyến mãi</label>
            <Select
              value={hook.type}
              onValueChange={(val) => hook.setType(val as any)}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cashback">Hoàn tiền</SelectItem>
                <SelectItem value="discount">Giảm giá</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            type="number"
            placeholder="Giá trị"
            value={hook.value}
            onChange={(e) => hook.setValue(Number(e.target.value))}
            className={inputClass}
          />

          <div className="flex items-center space-x-2">
            <Switch
              checked={hook.stackable}
              onCheckedChange={hook.setStackable}
            />
            <span className="text-gray-200 text-sm">Có thể xếp chồng</span>
          </div>

          <Input
            type="date"
            placeholder="Từ ngày"
            value={hook.validFrom}
            onChange={(e) => hook.setValidFrom(e.target.value)}
            className={inputClass}
          />

          <Input
            type="date"
            placeholder="Đến ngày"
            value={hook.validTo}
            onChange={(e) => hook.setValidTo(e.target.value)}
            className={inputClass}
          />

          <div>
            <label className="text-sm text-gray-300">Trạng thái</label>
            <Select
              value={hook.status}
              onValueChange={(val) => hook.setStatus(val as any)}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2 border-t border-gray-700 pt-3">
          <Button
            className="bg-sky-600 hover:bg-sky-700"
            onClick={() => hook.handleSubmit(onSuccess, handleClose)}
            disabled={hook.loading}
          >
            {hook.loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Tạo"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
            className="hover:bg-gray-700 text-neutral-600"
          >
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
