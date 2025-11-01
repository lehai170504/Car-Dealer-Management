import { useState, useEffect } from "react";
import { toast } from "sonner";
import { dealerService } from "@/services/dealers/dealerService";
import { Dealer, UpdateDealerRequest, DealerContact } from "@/types/dealer";
import { dealerSchema } from "@/validations/dealerSchema";

interface UseUpdateDealerResult {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  formData: UpdateDealerRequest;
  handleChange: <K extends keyof UpdateDealerRequest>(
    key: K,
    value: UpdateDealerRequest[K]
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
  const [formData, setFormData] = useState<UpdateDealerRequest>({});
  const [changedFields, setChangedFields] = useState<
    Partial<UpdateDealerRequest>
  >({});
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  // Reset form khi initialDealer thay đổi
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
    setChangedFields({});
    setEditMode(false);
  }, [initialDealer]);

  const handleChange = <K extends keyof UpdateDealerRequest>(
    key: K,
    value: UpdateDealerRequest[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: key === "creditLimit" ? Number(value) : value,
    }));
    // Lưu lại field thay đổi
    setChangedFields((prev) => ({
      ...prev,
      [key]: key === "creditLimit" ? Number(value) : value,
    }));
  };

  const setContactField = (
    index: number,
    field: keyof DealerContact,
    value: string
  ) => {
    const newContacts = [...(formData.contacts || [])];
    newContacts[index] = { ...newContacts[index], [field]: value };
    handleChange("contacts", newContacts);
  };

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
    setChangedFields({});
    setEditMode(false);
  };

  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    try {
      // Validate chỉ những field người dùng thay đổi
      const validateData: UpdateDealerRequest = { ...changedFields };
      await dealerSchema.validate(validateData, { abortEarly: false });

      setIsUpdateLoading(true);
      await dealerService.updateDealer(initialDealer._id, validateData);

      toast.success("Cập nhật Dealer thành công!");
      setEditMode(false);
      setChangedFields({});
      onUpdated();
      onClose();
    } catch (err: any) {
      if (err.name === "ValidationError") {
        err.inner.forEach((e: any) => toast.warning(e.message));
      } else {
        console.error(err);
        toast.error(err?.message || "Không thể cập nhật Dealer");
      }
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
