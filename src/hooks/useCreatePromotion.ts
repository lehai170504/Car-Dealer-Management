import { useState } from "react";
import Swal from "sweetalert2";
import { promotionService } from "@/services/promotions/promotionService";
import type {
  CreatePromotionRequest,
  PromotionScope,
  PromotionType,
  PromotionStatus,
} from "@/types/promotions";

export const useCreatePromotion = () => {
  // === State cho các trường của CreatePromotionRequest ===
  const [name, setName] = useState("");
  const [scope, setScope] = useState<PromotionScope>("global");
  const [dealers, setDealers] = useState<string[]>([]);
  const [variants, setVariants] = useState<string[]>([]);
  const [type, setType] = useState<PromotionType>("cashback");
  const [value, setValue] = useState(0);
  const [stackable, setStackable] = useState(false);
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [status, setStatus] = useState<PromotionStatus>("active");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setScope("global");
    setDealers([]);
    setVariants([]);
    setType("cashback");
    setValue(0);
    setStackable(false);
    setValidFrom("");
    setValidTo("");
    setStatus("active");
  };

  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    if (!name || !validFrom || !validTo || value < 0) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đủ Name, Valid From, Valid To và Value >= 0!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: CreatePromotionRequest = {
        name,
        scope,
        dealers: dealers.length > 0 ? dealers : undefined,
        variants: variants.length > 0 ? variants : undefined,
        type,
        value,
        stackable,
        validFrom,
        validTo,
        status,
      };

      await promotionService.createPromotion(payload);

      Swal.fire(
        "Thành công!",
        "Đã tạo chương trình khuyến mãi mới.",
        "success"
      );

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error(error);
      Swal.fire(
        "Lỗi",
        error?.message || "Không thể tạo chương trình khuyến mãi.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    scope,
    setScope,
    dealers,
    setDealers,
    variants,
    setVariants,
    type,
    setType,
    value,
    setValue,
    stackable,
    setStackable,
    validFrom,
    setValidFrom,
    validTo,
    setValidTo,
    status,
    setStatus,
    loading,
    handleSubmit,
    resetForm,
  };
};
