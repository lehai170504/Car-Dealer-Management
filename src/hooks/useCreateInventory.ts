import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { inventoryService } from "@/services/inventory/inventoryService";
import type { InventoryCreateRequest } from "@/types/inventory";
import { useVehicles } from "@/hooks/useVehicles";
import { useVehicleColors } from "@/hooks/useVehicleColors";
import { useDealers } from "@/hooks/useDealers";
import { createInventorySchema } from "@/validations/inventorySchema";

export const useCreateInventory = () => {
  // === State form ===
  const [ownerType, setOwnerType] = useState<"Dealer" | "Warehouse">("Dealer");
  const [ownerId, setOwnerId] = useState("");
  const [variantId, setVariantId] = useState("");
  const [colorId, setColorId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [reserved, setReserved] = useState(0);
  const [vinListInput, setVinListInput] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  // === Dropdown data ===
  const { vehicles, fetchVehicles } = useVehicles();
  const { vehicleColors, fetchVehicleColors } = useVehicleColors();
  const { dealers, fetchDealers } = useDealers();

  const vehicleOptions = useMemo(
    () =>
      vehicles.map((v) => ({
        label: `${v.model?.name} - ${v.trim}`,
        value: v._id,
      })),
    [vehicles]
  );

  const colorOptions = useMemo(
    () => vehicleColors.map((c) => ({ label: c.name, value: c._id })),
    [vehicleColors]
  );

  const dealerOptions = useMemo(
    () => dealers.map((d) => ({ label: d.name, value: d._id })),
    [dealers]
  );

  useEffect(() => {
    fetchVehicles();
    fetchVehicleColors();
    fetchDealers();
  }, [fetchVehicles, fetchVehicleColors, fetchDealers]);

  // === Reset form ===
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

  // === Submit form ===
  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    try {
      // Validate form
      await createInventorySchema.validate(
        {
          ownerType,
          ownerId,
          variantId,
          colorId,
          quantity,
          reserved,
          vinListInput,
          location,
        },
        { abortEarly: false }
      );

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

      toast.success("Đã thêm bản ghi tồn kho mới!");
      resetForm();
      onClose();
      onSuccess();
    } catch (err: any) {
      if (err.inner && err.inner.length > 0) {
        toast.error(err.inner.map((e: any) => e.message).join("\n"));
      } else {
        toast.error(err.message || "Dữ liệu không hợp lệ");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    // Form state
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

    // Dropdown options
    vehicleOptions,
    colorOptions,
    dealerOptions,
  };
};
