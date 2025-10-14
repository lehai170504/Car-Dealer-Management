import { useState } from "react";
import Swal from "sweetalert2";
import { dealerService } from "@/services/dealers/dealerService"; // Giả định service đã được import
import { Dealer } from "@/types/dealer";

type NewDealerPayload = Omit<Dealer, "_id" | "createdAt" | "updatedAt">;

export const useCreateDealer = () => {
  const initialState: NewDealerPayload = {
    name: "",
    location: "",
    contactInfo: "",
    salesTarget: 0,
    debt: 0,
  };
  
  const [newDealerForm, setNewDealerForm] =
    useState<NewDealerPayload>(initialState);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  
  const setNewDealerField = (key: keyof NewDealerPayload, value: any) => {
    setNewDealerForm((prev) => ({
      ...prev,
      [key]: key === 'salesTarget' || key === 'debt' ? Number(value) : value,
    }));
  };

  /** Reset tất cả các trường input về giá trị mặc định */
  const resetCreateForm = () => {
    setNewDealerForm(initialState);
  };

 const handleCreateSubmit = async (
  onClose: () => void,
  onSuccess: () => void
): Promise<boolean> => {
  const { name, location, contactInfo } = newDealerForm;

  if (!name || !location || !contactInfo) {
    Swal.fire(
      "Thiếu thông tin",
      "Vui lòng nhập đủ tên, địa điểm, và thông tin liên hệ!",
      "warning"
    );
    return false; // ✅ Trả về false khi thiếu dữ liệu
  }

  try {
    setIsCreateLoading(true);

    const payload = {
      ...newDealerForm,
      salesTarget: Number(newDealerForm.salesTarget),
      debt: Number(newDealerForm.debt),
    };

    await dealerService.createDealer(payload);

    Swal.fire("Thành công!", "Đã thêm Dealer mới.", "success");

    resetCreateForm();
    onClose();
    onSuccess();

    return true; // ✅ Trả về true khi thành công
  } catch (error: any) {
    console.error(error);
    Swal.fire("Lỗi", error?.message || "Không thể tạo Dealer.", "error");
    return false; // ✅ Trả về false khi có lỗi
  } finally {
    setIsCreateLoading(false);
  }
};


  return {
    newDealerForm,
    setNewDealerField,
    isCreateLoading,
    handleCreateSubmit,
    resetCreateForm,
  };
};
