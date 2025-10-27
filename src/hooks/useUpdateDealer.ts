import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { dealerService } from "@/services/dealers/dealerService";
import { Dealer, DealerCredentials, DealerContact } from "@/types/dealer";

interface UseUpdateDealerResult {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  formData: DealerCredentials;
  handleChange: <K extends keyof DealerCredentials>(
    key: K,
    value: DealerCredentials[K]
  ) => void;
  setContactField: (
    index: number,
    field: keyof DealerContact,
    value: string
  ) => void;
  isUpdateLoading: boolean;
  handleUpdate: (onUpdated: () => void, onClose: () => void) => Promise<void>;
  cancelEdit: () => void;
}

export const useUpdateDealer = (
  initialDealer: Dealer
): UseUpdateDealerResult => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<DealerCredentials>({
    name: initialDealer.name,
    code: initialDealer.code,
    region: initialDealer.region,
    address: initialDealer.address,
    contacts: initialDealer.contacts,
    creditLimit: initialDealer.creditLimit,
    status: initialDealer.status,
  });
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const cancelEdit = () => {
    setFormData({
      name: initialDealer.name,
      code: initialDealer.code,
      region: initialDealer.region,
      address: initialDealer.address,
      contacts: initialDealer.contacts,
      creditLimit: initialDealer.creditLimit,
      status: initialDealer.status,
    });
    setEditMode(false);
  };
  useEffect(() => {
    setFormData({
      name: initialDealer.name,
      code: initialDealer.code,
      region: initialDealer.region,
      address: initialDealer.address,
      contacts: initialDealer.contacts,
      creditLimit: initialDealer.creditLimit,
      status: initialDealer.status,
    });
  }, [initialDealer]);

  const handleChange = <K extends keyof DealerCredentials>(
    key: K,
    value: DealerCredentials[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: key === "creditLimit" ? Number(value) : value,
    }));
  };

  const setContactField = (
    index: number,
    field: keyof DealerContact,
    value: string
  ) => {
    const newContacts = [...formData.contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setFormData((prev) => ({ ...prev, contacts: newContacts }));
  };

  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    if (
      !formData.name ||
      !formData.code ||
      !formData.region ||
      !formData.address ||
      formData.contacts.some((c) => !c.name || !c.phone || !c.email)
    ) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ tất cả các trường và thông tin liên hệ!",
        "warning"
      );
      return;
    }

    try {
      setIsUpdateLoading(true);
      await dealerService.updateDealer(initialDealer._id, formData);

      Swal.fire(
        "Thành công",
        "Cập nhật thông tin Dealer thành công",
        "success"
      );
      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire("Lỗi", err?.message || "Không thể cập nhật Dealer", "error");
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return {
    editMode,
    setEditMode,
    formData,
    handleChange,
    setContactField,
    isUpdateLoading,
    handleUpdate,
    cancelEdit,
  };
};
