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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Edit2 } from "lucide-react";
import { useUpdatePromotion } from "@/hooks/useUpdatePromotion";
import {
  Promotion,
  PromotionScope,
  PromotionType,
  PromotionStatus,
} from "@/types/promotions";

interface ViewPromotionModalProps {
  promotion: Promotion;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export function ViewPromotionModal({
  promotion,
  isOpen,
  onClose,
  onUpdated,
}: ViewPromotionModalProps) {
  const {
    editMode,
    setEditMode,
    formData,
    loading,
    handleChange,
    handleUpdate,
    cancelEdit,
  } = useUpdatePromotion(promotion);

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  const handleClose = () => {
    cancelEdit();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Chi tiết chương trình khuyến mãi
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Name */}
          <Input
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            readOnly={!editMode}
            placeholder="Tên chương trình"
            className={inputClass}
          />

          {/* Scope */}
          <div>
            <label className="text-sm text-gray-300">Phạm vi</label>
            <Select
              value={formData.scope || "global"}
              onValueChange={(val) =>
                handleChange("scope", val as PromotionScope)
              }
              disabled={!editMode}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Toàn hệ thống</SelectItem>
                <SelectItem value="byDealer">Theo đại lý</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dealers */}
          {formData.scope === "byDealer" && (
            <Input
              value={(formData.dealers || []).join(",")}
              onChange={(e) =>
                handleChange(
                  "dealers",
                  e.target.value.split(",").map((d) => d.trim())
                )
              }
              readOnly={!editMode}
              placeholder="Danh sách đại lý (IDs, cách nhau dấu phẩy)"
              className={inputClass}
            />
          )}

          {/* Variants */}
          <Input
            value={(formData.variants || []).join(",")}
            onChange={(e) =>
              handleChange(
                "variants",
                e.target.value.split(",").map((v) => v.trim())
              )
            }
            readOnly={!editMode}
            placeholder="Biến thể áp dụng (IDs, cách nhau dấu phẩy)"
            className={inputClass}
          />

          {/* Type */}
          <div>
            <label className="text-sm text-gray-300">Loại khuyến mãi</label>
            <Select
              value={formData.type || "cashback"}
              onValueChange={(val) =>
                handleChange("type", val as PromotionType)
              }
              disabled={!editMode}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cashback">Hoàn tiền</SelectItem>
                <SelectItem value="discount">Giảm giá</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Value */}
          <Input
            type="number"
            value={formData.value ?? 0}
            onChange={(e) => handleChange("value", Number(e.target.value))}
            readOnly={!editMode}
            placeholder="Giá trị"
            className={inputClass}
          />

          {/* Stackable */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.stackable ?? false}
              onCheckedChange={(val) => handleChange("stackable", val)}
              disabled={!editMode}
            />
            <span className="text-gray-200 text-sm">Có thể xếp chồng</span>
          </div>

          {/* Valid From */}
          <Input
            type="date"
            value={formData.validFrom?.slice(0, 10) ?? ""}
            onChange={(e) => handleChange("validFrom", e.target.value)}
            readOnly={!editMode}
            placeholder="Từ ngày"
            className={inputClass}
          />

          {/* Valid To */}
          <Input
            type="date"
            value={formData.validTo?.slice(0, 10) ?? ""}
            onChange={(e) => handleChange("validTo", e.target.value)}
            readOnly={!editMode}
            placeholder="Đến ngày"
            className={inputClass}
          />

          {/* Status */}
          <div>
            <label className="text-sm text-gray-300">Trạng thái</label>
            <Select
              value={formData.status || "active"}
              onValueChange={(val) =>
                handleChange("status", val as PromotionStatus)
              }
              disabled={!editMode}
            >
              <SelectTrigger className={`${inputClass} mt-1`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2 border-t border-gray-700 pt-3">
          {editMode ? (
            <>
              <Button
                className="text-neutral-600"
                variant="outline"
                onClick={cancelEdit}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                onClick={() => handleUpdate(onUpdated, handleClose)}
                disabled={loading}
                className="bg-sky-600 hover:bg-sky-700"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Lưu
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700"
            >
              <Edit2 className="h-4 w-4" /> Chỉnh sửa
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
