import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { customerService } from "@/services/customers/customerService";
import { Customer } from "@/types/customer";

/**
 * Custom hook for managing the view/edit/update state and logic for an existing customer.
 * * @param initialCustomer The customer object passed to the modal.
 */
export const useUpdateCustomer = (initialCustomer: Customer) => {
  const [editMode, setEditMode] = useState(false);
  // Khởi tạo formData bằng initialCustomer và đồng bộ khi prop thay đổi
  const [formData, setFormData] = useState<Customer>(initialCustomer);
  const [loading, setLoading] = useState(false);

  // Đồng bộ lại formData khi customer prop thay đổi
  useEffect(() => {
    setFormData(initialCustomer);
  }, [initialCustomer]);

  /**
   * Cập nhật giá trị trường trong formData.
   */
  const handleChange = (key: keyof Customer, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Xử lý việc gửi dữ liệu cập nhật lên API.
   * @param onUpdated Callback được gọi khi cập nhật thành công (thường là để reload list).
   * @param onClose Callback được gọi để đóng Modal.
   */
  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    if (!formData.name || !formData.phone || !formData.email) {
       Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đủ họ tên, SĐT, email!",
        "warning"
      );
      return;
    }
    
    try {
      setLoading(true);
      await customerService.updateCustomer(initialCustomer._id!, formData); 
      
      Swal.fire(
        "Thành công",
        "Cập nhật thông tin khách hàng thành công",
        "success"
      );
      
      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err) {
      Swal.fire("Lỗi", "Không thể cập nhật khách hàng", "error");
    } finally {
      setLoading(false);
    }
  };
  
  /** Hủy chế độ chỉnh sửa và reset formData về trạng thái ban đầu */
  const cancelEdit = () => {
    setEditMode(false);
    setFormData(initialCustomer);
  };

  return {
    // State values
    editMode,
    setEditMode,
    formData,
    loading,

    // Actions
    handleChange,
    handleUpdate,
    cancelEdit
  };
};
