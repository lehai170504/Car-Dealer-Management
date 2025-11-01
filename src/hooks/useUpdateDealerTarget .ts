"use client";

import { useState } from "react";
import { toast } from "sonner";
import { dealerService } from "@/services/dealers/dealerService";
import { TargetDealerRequest, TargerDealerResponse } from "@/types/dealer";

interface UseUpdateDealerTargetResult {
  updateTarget: (id: string, payload: TargetDealerRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useUpdateDealerTarget = (): UseUpdateDealerTargetResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTarget = async (id: string, payload: TargetDealerRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const res: TargerDealerResponse = await dealerService.updateDealerTarget(
        id,
        payload
      );

      toast.success(res.message || "Cập nhật target thành công!");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Không thể cập nhật target");
      toast.error(err?.message || "Không thể cập nhật target");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTarget, isLoading, error };
};
