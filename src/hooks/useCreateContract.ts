import { useState } from "react";
import { toast } from "sonner";
import { contractService } from "@/services/contracts/contractService";
import type { CreateContractRequest, ContractStatus } from "@/types/contracts";
import type { Dealer } from "@/types/dealer";
import { useDealers } from "./useDealers";
import { createContractSchema } from "@/validations/contractSchema";

/**
 * Hook quản lý form tạo mới Contract
 */
export const useCreateContract = () => {
  const { dealers, loading: dealersLoading } = useDealers();

  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [targets, setTargets] = useState("");
  const [discountPolicyRef, setDiscountPolicyRef] = useState("");
  const [status, setStatus] = useState<ContractStatus>("active");

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setDealer(null);
    setStartDate("");
    setEndDate("");
    setTargets("");
    setDiscountPolicyRef("");
    setStatus("active");
  };

  const handleSubmit = async (onSuccess?: () => void, onClose?: () => void) => {
    // Trước khi tạo payload, kiểm tra dealer đã chọn
    if (!dealer) {
      toast.warning("Vui lòng chọn đại lý hợp đồng!");
      return;
    }

    const payload: CreateContractRequest = {
      dealer,
      startDate,
      endDate,
      targets,
      discountPolicyRef,
      status,
    };

    // Validate payload
    try {
      await createContractSchema.validate(payload, { abortEarly: false });
    } catch (err: any) {
      if (err.inner && Array.isArray(err.inner)) {
        err.inner.forEach((e: any) => toast.warning(e.message));
      } else {
        toast.warning(err.message || "Dữ liệu không hợp lệ");
      }
      return;
    }

    try {
      setLoading(true);
      await contractService.createContract(payload);
      toast.success("Đã tạo hợp đồng mới thành công!");
      resetForm();
      onClose?.();
      onSuccess?.();
    } catch (error: any) {
      console.error("❌ Error creating contract:", error);
      toast.error(
        error?.message || "Không thể tạo hợp đồng. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    dealer,
    setDealer,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    targets,
    setTargets,
    discountPolicyRef,
    setDiscountPolicyRef,
    status,
    setStatus,
    loading,
    dealers,
    dealersLoading,
    handleSubmit,
    resetForm,
  };
};
