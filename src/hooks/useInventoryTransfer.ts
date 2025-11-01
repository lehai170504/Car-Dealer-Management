"use client";

import { useState } from "react";
import { toast } from "sonner"; // import toast
import {
  InventoryTransferRequest,
  InventoryTransferResponse,
} from "@/types/inventory";
import { inventoryService } from "@/services/inventory/inventoryService";

interface UseInventoryTransferReturn {
  transferInventory: (payload: InventoryTransferRequest) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: InventoryTransferResponse | null;
}

export const useInventoryTransfer = (): UseInventoryTransferReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<InventoryTransferResponse | null>(
    null
  );

  const transferInventory = async (payload: InventoryTransferRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await inventoryService.transferInventory(payload);
      setSuccess(res);
      toast.success("Chuyển tồn kho thành công!");
    } catch (err: any) {
      const message = err?.message || "Chuyển tồn kho thất bại";
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  };

  return { transferInventory, loading, error, success };
};
