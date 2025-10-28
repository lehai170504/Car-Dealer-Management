// src/hooks/useUpdatePayment.ts
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { paymentService } from "@/services/payments/paymentService";
import type {
  Payment,
  PaymentStatus,
  UpdatePaymentRequest,
} from "@/types/payments";

export const useUpdatePayment = (initialPayment: Payment) => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState<{
    status: PaymentStatus;
    transactionRef: string;
    notes?: string;
  }>({
    status: initialPayment.status,
    transactionRef: initialPayment.transactionRef,
    notes: initialPayment.notes || "",
  });

  const [loading, setLoading] = useState(false);

  /** Đồng bộ khi initialPayment thay đổi */
  useEffect(() => {
    setFormData({
      status: initialPayment.status,
      transactionRef: initialPayment.transactionRef,
      notes: initialPayment.notes || "",
    });
  }, [initialPayment]);

  /** Cập nhật giá trị trong formData */
  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /** Chuẩn bị payload update */
  const getUpdatePayload = (): UpdatePaymentRequest => {
    const payload: UpdatePaymentRequest = {
      status: formData.status,
      transactionRef: formData.transactionRef,
      notes: formData.notes?.trim() || undefined,
    };
    return payload;
  };

  /** Gửi request cập nhật payment */
  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    try {
      setLoading(true);
      const payload = getUpdatePayload();
      await paymentService.updatePayment(initialPayment._id, payload);

      Swal.fire("Thành công", "Cập nhật thanh toán thành công!", "success");

      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error("❌ Error updating payment:", err);
      Swal.fire(
        "Lỗi",
        err?.message || "Không thể cập nhật thanh toán",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /** Hủy chỉnh sửa và reset form */
  const cancelEdit = () => {
    setEditMode(false);
    setFormData({
      status: initialPayment.status,
      transactionRef: initialPayment.transactionRef,
      notes: initialPayment.notes || "",
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
