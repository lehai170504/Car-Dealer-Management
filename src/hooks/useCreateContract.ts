// src/hooks/useCreateContract.ts
import { useState } from "react";
import Swal from "sweetalert2";
import { contractService } from "@/services/contracts/contractService";
import type { CreateContractRequest, ContractStatus } from "@/types/contracts";

/**
 * Hook quản lý form tạo mới Contract
 */
export const useCreateContract = () => {
  const [dealer, setDealer] = useState(""); // ID đại lý
  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
  const [endDate, setEndDate] = useState(""); // YYYY-MM-DD
  const [targets, setTargets] = useState(""); // Mục tiêu hợp đồng
  const [discountPolicyRef, setDiscountPolicyRef] = useState(""); // ID chính sách giảm giá
  const [status, setStatus] = useState<ContractStatus>("active");

  const [loading, setLoading] = useState(false);

  // Reset form
  const resetForm = () => {
    setDealer("");
    setStartDate("");
    setEndDate("");
    setTargets("");
    setDiscountPolicyRef("");
    setStatus("active");
  };

  // Submit form tạo contract
  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    // Validation cơ bản
    if (!dealer || !startDate || !endDate || !targets || !discountPolicyRef) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ đại lý, ngày bắt đầu/kết thúc, mục tiêu và chính sách giảm giá!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: CreateContractRequest = {
        dealer,
        startDate,
        endDate,
        targets,
        discountPolicyRef,
        status,
      };

      await contractService.createContract(payload);

      Swal.fire("Thành công!", "Đã tạo contract mới.", "success");

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error("❌ Error creating contract:", error);
      Swal.fire(
        "Lỗi",
        error?.message || "Không thể tạo contract. Vui lòng thử lại.",
        "error"
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
    handleSubmit,
    resetForm,
  };
};
