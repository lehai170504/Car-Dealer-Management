"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Edit, Save, X } from "lucide-react";
import { Inventory, InventoryUpdateRequest } from "@/types/inventory";
import { useUpdateInventory } from "@/hooks/useUpdateInventory";

interface ViewInventoryModalProps {
  inventory: Inventory;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
  canEdit: boolean;
}

export function ViewInventoryModal({
  inventory,
  isOpen,
  onClose,
  onUpdated,
  canEdit,
}: ViewInventoryModalProps) {
  const {
    editMode,
    setEditMode,
    formData,
    loading,
    handleChange,
    handleUpdate,
    cancelEdit,
  } = useUpdateInventory(inventory);

  const [vinListText, setVinListText] = useState(
    formData.vinList?.join(", ") ?? ""
  );

  const handleVinChange = (value: string) => {
    setVinListText(value);
    const vinArray = value
      .split(/[\n,]+/)
      .map((vin) => vin.trim())
      .filter((vin) => vin.length > 0);
    handleChange("vinList", vinArray);
  };

  const handleClose = () => {
    cancelEdit();
    onClose();
  };

  const handleFormUpdate = () => {
    handleUpdate(onUpdated, handleClose);
  };

  const editableFields = [
    {
      key: "quantity",
      label: "Số lượng",
      type: "number" as const,
      value: formData.quantity?.toString() ?? "",
    },
    {
      key: "reserved",
      label: "Dự trữ",
      type: "number" as const,
      value: formData.reserved?.toString() ?? "",
    },
    {
      key: "location",
      label: "Vị trí",
      type: "text" as const,
      value: formData.location ?? "",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl bg-gray-800 text-gray-50 border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-xl text-sky-500">
            {editMode && canEdit ? "Chỉnh sửa Tồn kho" : "Chi tiết Tồn kho"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
          <div className="grid grid-cols-2 gap-4 border-b border-gray-700 pb-3">
            <p className="text-sm">
              <strong>ID:</strong> {inventory._id}
            </p>
            <p className="text-sm">
              <strong>Chủ sở hữu:</strong> {inventory.ownerType}
            </p>
            <p className="text-sm">
              <strong>Biến thể:</strong> {inventory.variant.trim}
            </p>
            <p className="text-sm">
              <strong>Màu sắc:</strong> {inventory.color.name} (
              {inventory.color.code})
            </p>
          </div>

          {editableFields.map((field) => (
            <div
              key={field.key}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor={field.key} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.key}
                type={field.type}
                value={field.value}
                onChange={(e) => {
                  const key = field.key as keyof InventoryUpdateRequest;
                  let value: any = e.target.value;

                  if (field.type === "number") {
                    value = parseInt(value) || 0;
                  }

                  handleChange(key, value);
                }}
                disabled={!editMode || loading || !canEdit}
                className="col-span-3 bg-gray-700 border-gray-600"
              />
            </div>
          ))}

          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="vinList" className="text-right mt-2">
              Danh sách VIN
            </Label>
            <Textarea
              id="vinList"
              value={vinListText}
              onChange={(e) => handleVinChange(e.target.value)}
              disabled={!editMode || loading || !canEdit}
              className="col-span-3 bg-gray-700 border-gray-600 min-h-[80px]"
              placeholder="VIN1, VIN2, VIN3..."
            />
          </div>
        </div>
        <DialogFooter className="border-t border-gray-700 pt-4 flex justify-end gap-2">
          {!editMode && canEdit ? (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
                className="border-gray-600 text-gray-400 hover:bg-gray-700"
              >
                Đóng
              </Button>
              <Button
                onClick={() => setEditMode(true)}
                className="bg-sky-600 hover:bg-sky-700 flex items-center gap-2"
              >
                <Edit className="h-4 w-4" /> Chỉnh sửa
              </Button>
            </>
          ) : editMode && canEdit ? (
            <>
              <Button
                variant="outline"
                onClick={cancelEdit}
                disabled={loading}
                className="border-red-600 text-red-400 hover:bg-red-700/30"
              >
                <X className="h-4 w-4 mr-1" /> Hủy
              </Button>
              <Button
                onClick={handleFormUpdate}
                disabled={loading}
                className="bg-sky-600 hover:bg-sky-700"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" /> Lưu thay đổi
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-gray-600 text-gray-400 hover:bg-gray-700"
            >
              Đóng
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
