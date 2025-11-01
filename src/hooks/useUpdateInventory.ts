import { useState, useEffect } from "react";
import { toast } from "sonner";
import { inventoryService } from "@/services/inventory/inventoryService";
import { Inventory, InventoryUpdateRequest } from "@/types/inventory";
import { updateInventorySchema } from "@/validations/inventorySchema";

export const useUpdateInventory = (initialInventory: Inventory) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<InventoryUpdateRequest>({
    quantity: initialInventory.quantity,
    reserved: initialInventory.reserved,
    vinList: initialInventory.vinList,
    location: initialInventory.location,
  });
  const [vinListText, setVinListText] = useState(
    initialInventory.vinList?.join(", ") ?? ""
  );

  // chỉ giữ giá trị hiển thị
  const ownerName = initialInventory.owner.name;
  const variantName = initialInventory.variant.trim;
  const colorName = initialInventory.color
    ? `${initialInventory.color.name} (${initialInventory.color.code})`
    : "Chưa có màu";

  // sync khi initialInventory thay đổi
  useEffect(() => {
    setFormData({
      quantity: initialInventory.quantity,
      reserved: initialInventory.reserved,
      vinList: initialInventory.vinList,
      location: initialInventory.location,
    });
    setVinListText(initialInventory.vinList?.join(", ") ?? "");
  }, [initialInventory]);

  const handleChange = (key: keyof InventoryUpdateRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleVinChange = (value: string) => {
    setVinListText(value);
    const vinArray = value
      .split(/[\n,]+/)
      .map((vin) => vin.trim())
      .filter((vin) => vin.length > 0);
    handleChange("vinList", vinArray);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      quantity: initialInventory.quantity,
      reserved: initialInventory.reserved,
      vinList: initialInventory.vinList,
      location: initialInventory.location,
    });
    setVinListText(initialInventory.vinList?.join(", ") ?? "");
  };

  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    try {
      setLoading(true);

      // Validate trước khi update
      await updateInventorySchema.validate(
        {
          quantity: formData.quantity,
          reserved: formData.reserved,
          location: formData.location,
          vinListInput: vinListText,
        },
        { abortEarly: false }
      );

      const payload: InventoryUpdateRequest = {
        quantity: formData.quantity,
        reserved: formData.reserved,
        location: formData.location,
        vinList: formData.vinList,
      };

      await inventoryService.updateInventoryItem(initialInventory._id, payload);

      toast.success("Cập nhật tồn kho thành công!");
      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      if (err.inner && err.inner.length > 0) {
        err.inner.forEach((e: any) => toast.error(e.message));
      } else {
        toast.error(err?.message || "Không thể cập nhật bản ghi tồn kho");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    editMode,
    setEditMode,
    formData,
    vinListText,
    loading,
    handleChange,
    handleVinChange,
    handleUpdate,
    handleCancel,
    ownerName,
    variantName,
    colorName,
  };
};
