import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { inventoryService } from "@/services/inventory/inventoryService";
import { Inventory, InventoryUpdateRequest } from "@/types/inventory";

export const useUpdateInventory = (initialInventory: Inventory) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<InventoryUpdateRequest>({
    quantity: initialInventory.quantity,
    reserved: initialInventory.reserved,
    vinList: initialInventory.vinList,
    location: initialInventory.location,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setFormData({
      quantity: initialInventory.quantity,
      reserved: initialInventory.reserved,
      vinList: initialInventory.vinList,
      location: initialInventory.location,
    });
  }, [initialInventory]);

  /** Cập nhật giá trị trong formData */
  const handleChange = (key: keyof InventoryUpdateRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    if (!formData.quantity || formData.quantity < 0) {
      Swal.fire(
        "Thiếu thông tin",
        "Số lượng phải là một số hợp lệ (>= 0)!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const updatePayload: InventoryUpdateRequest = {
        quantity: formData.quantity,
        reserved: formData.reserved,
        vinList: formData.vinList,
        location: formData.location,
      };

      await inventoryService.updateInventoryItem(
        initialInventory._id,
        updatePayload
      );

      Swal.fire("Thành công", "Cập nhật bản ghi tồn kho thành công", "success");

      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire(
        "Lỗi",
        err?.message || "Không thể cập nhật bản ghi tồn kho",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /** Hủy edit và reset formData */
  const cancelEdit = () => {
    setEditMode(false);
    setFormData({
      quantity: initialInventory.quantity,
      reserved: initialInventory.reserved,
      vinList: initialInventory.vinList,
      location: initialInventory.location,
    });
  };

  return {
    editMode,
    setEditMode,
    formData,
    loading,
    handleChange,
    handleUpdate,
    cancelEdit,
  };
};
