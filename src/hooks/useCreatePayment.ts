// src/hooks/useCreatePayment.ts
import { useState } from "react";
import Swal from "sweetalert2";
import { paymentService } from "@/services/payments/paymentService";
import type {
  CreatePaymentRequest,
  PaymentMethod,
  PaymentType,
  PaymentStatus,
} from "@/types/payments";

/**
 * Hook quản lý form tạo mới Payment
 */
export const useCreatePayment = () => {
  const [order, setOrder] = useState(""); // ID order liên quan
  const [type, setType] = useState<PaymentType>("deposit"); // Kiểu payment
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [transactionRef, setTransactionRef] = useState("");
  const [paidAt, setPaidAt] = useState<string>(new Date().toISOString());
  const [status, setStatus] = useState<PaymentStatus>("confirmed");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  /** Reset form */
  const resetForm = () => {
    setOrder("");
    setType("deposit");
    setAmount(0);
    setMethod("cash");
    setTransactionRef("");
    setPaidAt(new Date().toISOString());
    setStatus("confirmed");
    setNotes("");
  };

  /** Submit form tạo payment */
  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    // ✅ Validation cơ bản
    if (!order || amount <= 0) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ thông tin Order và số tiền hợp lệ!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: CreatePaymentRequest = {
        order,
        type,
        amount,
        method,
        transactionRef,
        paidAt,
        status,
        notes: notes || undefined,
      };

      await paymentService.createPayment(payload);

      Swal.fire("Thành công!", "Đã tạo payment mới.", "success");

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error("❌ Error creating payment:", error);
      Swal.fire(
        "Lỗi",
        error?.message || "Không thể tạo payment. Vui lòng thử lại.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    order,
    setOrder,
    type,
    setType,
    amount,
    setAmount,
    method,
    setMethod,
    transactionRef,
    setTransactionRef,
    paidAt,
    setPaidAt,
    status,
    setStatus,
    notes,
    setNotes,
    loading,
    handleSubmit,
    resetForm,
  };
};
