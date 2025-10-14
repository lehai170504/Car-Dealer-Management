import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { dealerService } from "@/services/dealers/dealerService"; 
import { Dealer } from "@/types/dealer";

interface UseUpdateDealerResult {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  formData: Dealer;
  handleChange: (key: keyof Dealer, value: any) => void;
  isUpdateLoading: boolean;
  handleUpdate: (onUpdated: () => void, onClose: () => void) => Promise<void>;
}

/**
 * Custom hook quản lý logic chỉnh sửa và cập nhật thông tin Dealer.
 * @param initialDealer Dữ liệu Dealer ban đầu được truyền vào Modal.
 */
export const useUpdateDealer = (initialDealer: Dealer): UseUpdateDealerResult => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Dealer>(initialDealer);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  // Đồng bộ hóa form data khi initialDealer thay đổi (ví dụ: mở modal với dealer khác)
  useEffect(() => {
    setFormData(initialDealer);
  }, [initialDealer]);

  const handleChange = (key: keyof Dealer, value: any) => {
    setFormData((prev) => ({ 
      ...prev, 
      [key]: key === 'salesTarget' || key === 'debt' ? Number(value) : value, 
    }));
  };

  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    if (!formData.name || !formData.contactInfo) {
       Swal.fire("Thiếu thông tin", "Tên và thông tin liên hệ không được để trống.", "warning");
       return;
    }
    
    try {
      setIsUpdateLoading(true);

      const payload = {
        ...formData,
        salesTarget: Number(formData.salesTarget),
        debt: Number(formData.debt),
      };
      
      // Lấy ID từ dữ liệu ban đầu
      const dealerId = initialDealer._id!; 
      
      await dealerService.updateDealer(dealerId, payload);
      
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
    isUpdateLoading,
    handleUpdate,
  };
};
