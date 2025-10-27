import { useState } from "react";
import Swal from "sweetalert2";
import { dealerService } from "@/services/dealers/dealerService";
import { DealerCredentials, DealerContact, DealerStatus } from "@/types/dealer";

const initialContact: DealerContact = {
  _id: "", // thường backend sẽ tạo
  name: "",
  phone: "",
  email: "",
};

const initialForm: DealerCredentials = {
  name: "",
  code: "",
  region: "",
  address: "",
  contacts: [initialContact],
  creditLimit: 0,
  status: "active",
};

export const useCreateDealer = () => {
  const [dealerForm, setDealerForm] = useState<DealerCredentials>(initialForm);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const setDealerField = <K extends keyof DealerCredentials>(
    key: K,
    value: DealerCredentials[K]
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
    const { name, code, region, address, contacts } = dealerForm;
    if (
      !name ||
      !code ||
      !region ||
      !address ||
      contacts.some((c) => !c.name || !c.phone || !c.email)
    ) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ tất cả các trường và thông tin liên hệ!",
        "warning"
      );
      return false;
    }

    try {
      setIsCreateLoading(true);
      await dealerService.createDealer(dealerForm);
      Swal.fire("Thành công!", "Đã thêm Dealer mới.", "success");
      resetDealerForm();
      onClose();
      onSuccess();
      return true;
    } catch (error: any) {
      console.error(error);
      Swal.fire("Lỗi", error?.message || "Không thể tạo Dealer.", "error");
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
