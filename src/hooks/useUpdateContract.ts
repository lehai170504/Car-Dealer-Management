"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { contractService } from "@/services/contracts/contractService";
import type {
  Contract,
  ContractStatus,
  UpdateContractRequest,
} from "@/types/contracts";
import { updateContractSchema } from "@/validations/contractSchema";

/**
 * Hook quản lý cập nhật Contract
 */
export const useUpdateContract = (initialContract: Contract) => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState<{
    targets: string;
    status: ContractStatus;
  }>({
    targets: initialContract.targets || "",
    status: initialContract.status,
  });

  const [loading, setLoading] = useState(false);

  /** Đồng bộ dữ liệu khi initialContract thay đổi */
  useEffect(() => {
    setFormData({
      targets: initialContract.targets || "",
      status: initialContract.status,
    });
  }, [initialContract]);

  /** Cập nhật giá trị trong formData */
  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /** Chuẩn bị payload update */
  const getUpdatePayload = (): UpdateContractRequest => {
    const payload: UpdateContractRequest = {
      targets: formData.targets,
      status: formData.status,
    };
    return payload;
  };

  /** Gửi request cập nhật Contract */
  const handleUpdate = async (onUpdated?: () => void, onClose?: () => void) => {
    try {
      setLoading(true);

      // Validate form trước khi submit
      await updateContractSchema.validate(formData, { abortEarly: false });

      const payload = getUpdatePayload();
      await contractService.updateContract(initialContract._id, payload);

      toast.success("Cập nhật hợp đồng thành công!");
      setEditMode(false);
      onUpdated?.();
      onClose?.();
    } catch (err: any) {
      if (err.inner && Array.isArray(err.inner)) {
        // Nếu là validation error
        err.inner.forEach((e: any) => toast.warning(e.message));
      } else {
        console.error("❌ Error updating contract:", err);
        toast.error(err?.message || "Không thể cập nhật hợp đồng");
      }
    } finally {
      setLoading(false);
    }
  };

  /** Hủy chỉnh sửa và reset form */
  const cancelEdit = () => {
    setEditMode(false);
    setFormData({
      targets: initialContract.targets || "",
      status: initialContract.status,
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
