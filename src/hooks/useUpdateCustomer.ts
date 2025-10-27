import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { customerService } from "@/services/customers/customerService";
import { Customer } from "@/types/customer";

/**
 * Custom hook quản lý view/edit/update cho khách hàng có sẵn
 * @param initialCustomer Customer được truyền vào từ Modal/Parent component
 */
export const useUpdateCustomer = (initialCustomer: Customer) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<
    Omit<Customer, "_id" | "createdAt" | "updatedAt">
  >({
    fullName: initialCustomer.fullName,
    phone: initialCustomer.phone,
    email: initialCustomer.email,
    address: initialCustomer.address,
    notes: initialCustomer.notes,
    segment: initialCustomer.segment || "default",
  });
  const [loading, setLoading] = useState(false);

  // Đồng bộ formData khi initialCustomer thay đổi
  useEffect(() => {
    setFormData({
      fullName: initialCustomer.fullName,
      phone: initialCustomer.phone,
      email: initialCustomer.email,
      address: initialCustomer.address,
      notes: initialCustomer.notes,
      segment: initialCustomer.segment || "default",
    });
  }, [initialCustomer]);

  /** Cập nhật giá trị trong formData */
  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đủ họ tên, SĐT, email!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      await customerService.updateCustomer(initialCustomer._id, formData);

      Swal.fire(
        "Thành công",
        "Cập nhật thông tin khách hàng thành công",
        "success"
      );

      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire(
        "Lỗi",
        err?.message || "Không thể cập nhật khách hàng",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /** Hủy edit và reset formData */
  const cancelEdit = () => {
    setEditMode(false);
    setFormData({
      fullName: initialCustomer.fullName,
      phone: initialCustomer.phone,
      email: initialCustomer.email,
      address: initialCustomer.address,
      notes: initialCustomer.notes,
      segment: initialCustomer.segment || "default",
    });
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
