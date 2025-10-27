// src/hooks/useCreateQuote.ts
import { useState } from "react";
import Swal from "sweetalert2";
import { quotesService } from "@/services/quotes/quotesService";
import type {
  QuoteCredentials,
  QuoteItem,
  QuoteFees,
  QuoteStatus,
} from "@/types/quotes";

export const useCreateQuote = () => {
  const [customer, setCustomer] = useState(""); // ID customer
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promotionTotal, setPromotionTotal] = useState<number | undefined>(
    undefined
  );
  const [total, setTotal] = useState(0);
  const [validUntil, setValidUntil] = useState(""); // ISO date string
  const [notes, setNotes] = useState("");
  const [fees, setFees] = useState<QuoteFees | undefined>(undefined);
  const [status, setStatus] = useState<QuoteStatus>("draft");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setCustomer("");
    setItems([]);
    setSubtotal(0);
    setDiscount(0);
    setPromotionTotal(undefined);
    setTotal(0);
    setValidUntil("");
    setNotes("");
    setFees(undefined);
    setStatus("draft");
  };

  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    if (!customer || items.length === 0 || !validUntil) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ khách hàng, danh sách xe, và ngày hết hạn!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: QuoteCredentials = {
        customer,
        items,
        subtotal,
        discount,
        promotionTotal,
        total,
        validUntil,
        notes,
        fees,
        status,
      };

      await quotesService.createQuote(payload);

      Swal.fire("Thành công!", "Đã tạo quote mới.", "success");

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error(error);
      Swal.fire("Lỗi", error?.message || "Không thể tạo quote.", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    customer,
    setCustomer,
    items,
    setItems,
    subtotal,
    setSubtotal,
    discount,
    setDiscount,
    promotionTotal,
    setPromotionTotal,
    total,
    setTotal,
    validUntil,
    setValidUntil,
    notes,
    setNotes,
    fees,
    setFees,
    status,
    setStatus,
    loading,
    handleSubmit,
    resetForm,
  };
};
