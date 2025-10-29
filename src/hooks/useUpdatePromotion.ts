import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { promotionService } from "@/services/promotions/promotionService";
import type { Promotion, UpdatePromotionRequest } from "@/types/promotions";

export const useUpdatePromotion = (initialPromotion: Promotion) => {
  const [editMode, setEditMode] = useState(false);

  const normalizePromotion = (promo: Promotion): UpdatePromotionRequest => ({
    name: promo.name ?? "",
    scope: promo.scope ?? "global",
    dealers:
      promo.dealers?.map((d) => (typeof d === "string" ? d : d._id)) ?? [],
    variants: promo.variants ?? [],
    type: promo.type ?? "cashback",
    value: promo.value ?? 0,
    stackable: promo.stackable ?? false,
    validFrom: promo.validFrom ?? "",
    validTo: promo.validTo ?? "",
    status: promo.status ?? "active",
  });

  const [formData, setFormData] = useState<UpdatePromotionRequest>(
    normalizePromotion(initialPromotion)
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(normalizePromotion(initialPromotion));
  }, [initialPromotion]);

  /** Cập nhật giá trị trong formData */
  const handleChange = <K extends keyof UpdatePromotionRequest>(
    key: K,
    value: UpdatePromotionRequest[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    // Fallback khi formData.validFrom hoặc validTo undefined
    if (!formData.name || !formData.validFrom || !formData.validTo) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đủ Name, Valid From và Valid To!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      // Nếu dealers undefined thì gửi mảng rỗng
      const updatePayload: UpdatePromotionRequest = {
        ...formData,
        dealers: formData.dealers ?? [],
        variants: formData.variants ?? [],
      };

      await promotionService.updatePromotion(
        initialPromotion._id,
        updatePayload
      );

      Swal.fire(
        "Thành công",
        "Cập nhật chương trình khuyến mãi thành công",
        "success"
      );

      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire(
        "Lỗi",
        err?.message || "Không thể cập nhật chương trình khuyến mãi",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /** Hủy edit và reset formData */
  const cancelEdit = () => {
    setEditMode(false);
    setFormData(normalizePromotion(initialPromotion));
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
