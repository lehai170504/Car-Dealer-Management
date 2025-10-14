import { useState } from "react";
import Swal from "sweetalert2";
import { customerService } from "@/services/customers/customerService";

/**
 * Custom hook for managing the creation state and logic of a new customer.
 */
export const useCreateCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  /** Reset tất cả các trường input về giá trị mặc định */
  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setFeedback("");
  };

  /**
   * Xử lý việc gửi dữ liệu khách hàng mới lên API.
   * @param onSuccess Callback được gọi khi tạo thành công (thường là để reload list).
   * @param onClose Callback được gọi để đóng Modal.
   */
  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    if (!name || !phone || !email) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đủ họ tên, SĐT, email!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload = { name, phone, email, address, feedback };
      await customerService.createCustomer(payload);
      
      Swal.fire("Thành công!", "Đã thêm khách hàng mới.", "success");

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error(error);
      Swal.fire("Lỗi", error?.message || "Không thể tạo khách hàng.", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    // State values and setters
    name, setName,
    phone, setPhone,
    email, setEmail,
    address, setAddress,
    feedback, setFeedback,
    loading,

    // Actions
    handleSubmit,
    resetForm,
  };
};
