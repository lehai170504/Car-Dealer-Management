import { useState, useEffect } from "react";
import { toast } from "sonner";
import { promotionService } from "@/services/promotions/promotionService";
import type { Promotion, UpdatePromotionRequest } from "@/types/promotions";
import { updatePromotionSchema } from "@/validations/promotionSchema";

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
    try {
      // Validate form
      await updatePromotionSchema.validate(
        {
          name: formData.name,
          validFrom: formData.validFrom,
          validTo: formData.validTo,
          value: formData.value,
        },
        { abortEarly: false }
      );

      setLoading(true);

      const updatePayload: UpdatePromotionRequest = {
        ...formData,
        dealers: formData.dealers ?? [],
        variants: formData.variants ?? [],
      };

      await promotionService.updatePromotion(
        initialPromotion._id,
        updatePayload
      );

      toast.success("Cập nhật chương trình khuyến mãi thành công.");
      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      if (err.name === "ValidationError") {
        // Gom tất cả lỗi thành 1 thông báo duy nhất
        const message = err.errors.join("\n");
        toast.error(message, { duration: 5000 });
      } else {
        console.error(err);
        toast.error(
          err?.message || "Không thể cập nhật chương trình khuyến mãi."
        );
      }
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
