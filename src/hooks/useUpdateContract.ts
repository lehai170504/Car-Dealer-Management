// src/hooks/useUpdateContract.ts
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { contractService } from "@/services/contracts/contractService";
import type {
  Contract,
  ContractStatus,
  UpdateContractRequest,
} from "@/types/contracts";

/**
 * Hook quản lý cập nhật Contract
 */
export const useUpdateContract = (initialContract: Contract) => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState<{
    targets: string;
    status: ContractStatus;
    signedDate?: string;
    terms: string;
    files: string[];
  }>({
    targets: initialContract.terms || "",
    status: initialContract.status,
    signedDate: initialContract.signedDate,
    terms: initialContract.terms,
    files: initialContract.files || [],
  });

  const [loading, setLoading] = useState(false);

  /** Đồng bộ dữ liệu khi initialContract thay đổi */
  useEffect(() => {
    setFormData({
      targets: initialContract.terms || "",
      status: initialContract.status,
      signedDate: initialContract.signedDate,
      terms: initialContract.terms,
      files: initialContract.files || [],
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
      terms: formData.terms,
      files: formData.files,
    };

    if (formData.signedDate) payload.signedDate = formData.signedDate;

    return payload;
  };

  /** Gửi request cập nhật Contract */
  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    try {
      setLoading(true);
      const payload = getUpdatePayload();
      await contractService.updateContract(initialContract._id, payload);

      Swal.fire("Thành công", "Cập nhật contract thành công!", "success");

      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire("Lỗi", err?.message || "Không thể cập nhật contract", "error");
    } finally {
      setLoading(false);
    }
  };

  /** Hủy chỉnh sửa và reset form */
  const cancelEdit = () => {
    setEditMode(false);
    setFormData({
      targets: initialContract.terms || "",
      status: initialContract.status,
      signedDate: initialContract.signedDate,
      terms: initialContract.terms,
      files: initialContract.files || [],
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
