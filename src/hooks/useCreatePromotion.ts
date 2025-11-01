import { useState } from "react";
import { toast } from "sonner";
import { promotionService } from "@/services/promotions/promotionService";
import type {
  CreatePromotionRequest,
  PromotionScope,
  PromotionType,
  PromotionStatus,
} from "@/types/promotions";
import { createPromotionSchema } from "@/validations/promotionSchema";

export const useCreatePromotion = () => {
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
    try {
      // Validate form
      await createPromotionSchema.validate(
        { name, validFrom, validTo, value },
        { abortEarly: false }
      );

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

      toast.success("Đã tạo chương trình khuyến mãi mới thành công.");
      resetForm();
      onClose();
      onSuccess();
    } catch (err: any) {
      if (err.name === "ValidationError") {
        err.errors.forEach((e: string, i: number) => {
          setTimeout(() => toast.error(e), i * 200);
        });
      } else {
        console.error(err);
        toast.error(err?.message || "Không thể tạo chương trình khuyến mãi.");
      }
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
