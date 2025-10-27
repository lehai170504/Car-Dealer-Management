import { useState } from "react";
import Swal from "sweetalert2";
import { customerService } from "@/services/customers/customerService";
import type { CustomerCredentials } from "@/types/customer";

export const useCreateCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [segment, setSegment] = useState<"retail" | "wholesale">("retail");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setNotes("");
    setSegment("retail");
  };

  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    if (!fullName || !phone || !email) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đủ họ tên, SĐT, email!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: CustomerCredentials & { segment: "retail" | "wholesale" } =
        {
          fullName,
          phone,
          email,
          address,
          notes,
          segment,
        };

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
    // State values và setters
    fullName,
    setFullName,
    phone,
    setPhone,
    email,
    setEmail,
    address,
    setAddress,
    notes,
    setNotes,
    segment,
    setSegment,
    loading,
    handleSubmit,
    resetForm,
  };
};
