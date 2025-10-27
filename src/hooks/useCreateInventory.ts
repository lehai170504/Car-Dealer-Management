import { useState } from "react";
import Swal from "sweetalert2";
import { inventoryService } from "@/services/inventory/inventoryService";
import type { InventoryCreateRequest } from "@/types/inventory";

export const useCreateInventory = () => {
  // === State cho các trường của InventoryCreateRequest ===
  const [ownerType, setOwnerType] = useState<"Dealer" | "Warehouse">("Dealer");
  const [ownerId, setOwnerId] = useState(""); // ID của Dealer/Warehouse
  const [variantId, setVariantId] = useState(""); // ID của Variant
  const [colorId, setColorId] = useState(""); // ID của Color
  const [quantity, setQuantity] = useState(0);
  const [reserved, setReserved] = useState(0);
  const [vinListInput, setVinListInput] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setOwnerType("Dealer");
    setOwnerId("");
    setVariantId("");
    setColorId("");
    setQuantity(0);
    setReserved(0);
    setVinListInput("");
    setLocation("");
  };

  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    if (!ownerId || !variantId || !colorId || quantity <= 0) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đủ Owner ID, Variant ID, Color ID và Số lượng > 0!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const vinArray = vinListInput
        .split(/[\n,]+/)
        .map((vin) => vin.trim())
        .filter((vin) => vin.length > 0);

      const payload: InventoryCreateRequest = {
        ownerType,
        owner: ownerId,
        variant: variantId,
        color: colorId,
        quantity,
        reserved,
        vinList: vinArray,
        location,
      };

      await inventoryService.createInventoryItem(payload);

      Swal.fire("Thành công!", "Đã thêm bản ghi tồn kho mới.", "success");

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error(error);
      Swal.fire(
        "Lỗi",
        error?.message || "Không thể tạo bản ghi tồn kho.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    // State values và setters
    ownerType,
    setOwnerType,
    ownerId,
    setOwnerId,
    variantId,
    setVariantId,
    colorId,
    setColorId,
    quantity,
    setQuantity,
    reserved,
    setReserved,
    vinListInput,
    setVinListInput,
    location,
    setLocation,
    loading,
    handleSubmit,
    resetForm,
  };
};
