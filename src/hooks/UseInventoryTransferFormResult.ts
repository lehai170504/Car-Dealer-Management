"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useVehicles } from "./useVehicles";
import { useVehicleColors } from "./useVehicleColors";
import { useDealers } from "./useDealers";
import { useInventoryTransfer } from "./useInventoryTransfer";
import { InventoryTransferRequest } from "@/types/inventory";

interface UseInventoryTransferFormResult {
  // Options để render select
  vehicleOptions: { label: string; value: string }[];
  colorOptions: { label: string; value: string }[];
  dealerOptions: { label: string; value: string }[];

  // Form state
  variant: string;
  setVariant: (v: string) => void;
  color: string;
  setColor: (c: string) => void;
  fromDealer: string;
  setFromDealer: (d: string) => void;
  toDealer: string;
  setToDealer: (d: string) => void;
  quantity: number;
  setQuantity: (q: number) => void;

  // Transfer
  transfer: () => Promise<void>;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export const useInventoryTransferForm = (): UseInventoryTransferFormResult => {
  // Hooks lấy dữ liệu
  const { vehicles, fetchVehicles } = useVehicles();
  const { vehicleColors, fetchVehicleColors } = useVehicleColors();
  const { dealers, fetchDealers } = useDealers();
  const { transferInventory, loading, error, success } = useInventoryTransfer();

  // Form state
  const [variant, setVariant] = useState("");
  const [color, setColor] = useState("");
  const [fromDealer, setFromDealer] = useState("");
  const [toDealer, setToDealer] = useState("");
  const [quantity, setQuantity] = useState(0);

  // Options cho select
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

  // Fetch dữ liệu lần đầu
  useEffect(() => {
    fetchVehicles();
    fetchVehicleColors();
    fetchDealers();
  }, [fetchVehicles, fetchVehicleColors, fetchDealers]);

  // Thực hiện transfer
  const transfer = async () => {
    if (!variant || !color || !fromDealer || !toDealer || quantity <= 0) {
      toast.error("Vui lòng điền đầy đủ thông tin transfer.");
      return;
    }

    const payload: InventoryTransferRequest = {
      variant,
      color,
      fromDealerId: fromDealer,
      toDealerId: toDealer,
      quantity,
    };

    await transferInventory(payload);
  };

  return {
    vehicleOptions,
    colorOptions,
    dealerOptions,
    variant,
    setVariant,
    color,
    setColor,
    fromDealer,
    setFromDealer,
    toDealer,
    setToDealer,
    quantity,
    setQuantity,
    transfer,
    loading,
    error,
    successMessage: success?.message || null,
  };
};
