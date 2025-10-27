import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { quotesService } from "@/services/quotes/quotesService";
import type {
  Quote,
  QuoteCredentials,
  QuoteUpdateRequest,
} from "@/types/quotes";

interface UseUpdateQuoteOptions {
  onUpdated?: () => void; // callback để refresh danh sách
}

export const useUpdateQuote = (
  initialQuote: Quote | null,
  options?: UseUpdateQuoteOptions
) => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState<QuoteCredentials>(
    initialQuote
      ? {
          customer: initialQuote.customer,
          items: initialQuote.items || [],
          subtotal: initialQuote.subtotal,
          discount: initialQuote.discount,
          promotionTotal: initialQuote.promotionTotal,
          total: initialQuote.total,
          validUntil: initialQuote.validUntil,
          notes: initialQuote.notes,
          fees: initialQuote.fees,
          status: initialQuote.status || "draft",
        }
      : ({} as QuoteCredentials)
  );

  const [loading, setLoading] = useState(false);

  // Đồng bộ formData khi initialQuote thay đổi
  useEffect(() => {
    if (!initialQuote) return;

    setFormData((prev) => {
      if (
        prev.customer === initialQuote.customer &&
        prev.subtotal === initialQuote.subtotal &&
        prev.discount === initialQuote.discount &&
        prev.total === initialQuote.total &&
        prev.validUntil === initialQuote.validUntil &&
        JSON.stringify(prev.items) === JSON.stringify(initialQuote.items) &&
        JSON.stringify(prev.fees) === JSON.stringify(initialQuote.fees) &&
        prev.notes === initialQuote.notes
      ) {
        return prev;
      }

      return {
        customer: initialQuote.customer,
        items: initialQuote.items || [],
        subtotal: initialQuote.subtotal,
        discount: initialQuote.discount,
        promotionTotal: initialQuote.promotionTotal,
        total: initialQuote.total,
        validUntil: initialQuote.validUntil,
        notes: initialQuote.notes,
        fees: initialQuote.fees,
        status: initialQuote.status || "draft",
      };
    });
  }, [initialQuote]);

  const handleChange = <K extends keyof QuoteCredentials>(
    key: K,
    value: QuoteCredentials[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const getUpdatePayload = (): QuoteUpdateRequest => ({
    status: formData.status || "draft",
    subtotal: formData.subtotal,
    discount: formData.discount,
    total: formData.total,
    validUntil: formData.validUntil,
    notes: formData.notes || "",
  });

  const handleUpdate = async (onClose?: () => void) => {
    if (!formData.customer || !formData.items.length || !formData.validUntil) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ khách hàng, danh sách xe, và ngày hết hạn!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);
      await quotesService.updateQuote(initialQuote!._id, getUpdatePayload());

      Swal.fire("Thành công", "Cập nhật quote thành công", "success");
      setEditMode(false);

      // gọi callback parent để refresh danh sách
      options?.onUpdated?.();

      if (onClose) onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire("Lỗi", err?.message || "Không thể cập nhật quote", "error");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    if (!initialQuote) return;

    setFormData({
      customer: initialQuote.customer,
      items: initialQuote.items,
      subtotal: initialQuote.subtotal,
      discount: initialQuote.discount,
      promotionTotal: initialQuote.promotionTotal,
      total: initialQuote.total,
      validUntil: initialQuote.validUntil,
      notes: initialQuote.notes,
      fees: initialQuote.fees,
      status: initialQuote.status || "draft",
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
