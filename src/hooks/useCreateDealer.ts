import { useState } from "react";
import { toast } from "sonner";
import { dealerService } from "@/services/dealers/dealerService";
import { CreateDealerRequest, DealerContact } from "@/types/dealer";
import { dealerSchema } from "@/validations/dealerSchema";

const initialContact: DealerContact = {
  _id: "",
  name: "",
  phone: "",
  email: "",
};

const initialForm: CreateDealerRequest = {
  name: "",
  code: "",
  region: "",
  address: "",
  contacts: [initialContact],
  creditLimit: 0,
  status: "active",
};

export const useCreateDealer = () => {
  const [dealerForm, setDealerForm] =
    useState<CreateDealerRequest>(initialForm);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const setDealerField = <K extends keyof CreateDealerRequest>(
    key: K,
    value: CreateDealerRequest[K]
  ) => {
    setDealerForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setContactField = (
    index: number,
    field: keyof DealerContact,
    value: string
  ) => {
    const newContacts = [...dealerForm.contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setDealerForm((prev) => ({ ...prev, contacts: newContacts }));
  };

  const resetDealerForm = () => setDealerForm(initialForm);

  const handleCreateSubmit = async (
    onClose: () => void,
    onSuccess: () => void
  ) => {
    try {
      // Validate form
      await dealerSchema.validate(dealerForm, { abortEarly: false });

      setIsCreateLoading(true);
      await dealerService.createDealer(dealerForm);
      toast.success("Đã thêm đại lí mới thành công!");
      resetDealerForm();
      onClose();
      onSuccess();
      return true;
    } catch (error: any) {
      if (error.name === "ValidationError") {
        // Nếu là lỗi Yup validation
        error.errors.forEach((errMsg: string) => toast.error(errMsg));
      } else {
        console.error("❌ Error creating dealer:", error);
        toast.error(error?.message || "Không thể tạo Dealer.");
      }
      return false;
    } finally {
      setIsCreateLoading(false);
    }
  };

  return {
    dealerForm,
    setDealerField,
    setContactField,
    resetDealerForm,
    isCreateLoading,
    handleCreateSubmit,
  };
};
