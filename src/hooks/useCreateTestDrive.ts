// src/hooks/useCreateTestDrive.ts
import { useState } from "react";
import Swal from "sweetalert2";
import { testDriveService } from "@/services/testDrives/testDriveService";
import type {
  CreateTestDriveRequest,
  TestDriveStatus,
} from "@/types/testDrives";

/**
 * Hook quản lý form tạo mới Test Drive
 */
export const useCreateTestDrive = () => {
  const [customer, setCustomer] = useState(""); // ID khách hàng
  const [dealer, setDealer] = useState(""); // ID đại lý
  const [variant, setVariant] = useState(""); // ID variant xe
  const [preferredTime, setPreferredTime] = useState(""); // ISO string
  const [status, setStatus] = useState<TestDriveStatus>("confirmed");
  const [assignedStaff, setAssignedStaff] = useState<string>("");

  const [loading, setLoading] = useState(false);

  // Reset toàn bộ form
  const resetForm = () => {
    setCustomer("");
    setDealer("");
    setVariant("");
    setPreferredTime("");
    setStatus("confirmed");
    setAssignedStaff("");
  };

  // Submit form tạo test drive
  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    // Validation đơn giản
    if (!customer || !dealer || !variant || !preferredTime) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ thông tin khách hàng, đại lý, variant xe và thời gian mong muốn!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: CreateTestDriveRequest = {
        customer,
        dealer,
        variant,
        preferredTime,
        status,
        assignedStaff: assignedStaff || undefined,
      };

      await testDriveService.createTestDrive(payload);

      Swal.fire("Thành công!", "Đã tạo test drive mới.", "success");

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error("❌ Error creating test drive:", error);
      Swal.fire(
        "Lỗi",
        error?.message || "Không thể tạo test drive. Vui lòng thử lại.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    customer,
    setCustomer,
    dealer,
    setDealer,
    variant,
    setVariant,
    preferredTime,
    setPreferredTime,
    status,
    setStatus,
    assignedStaff,
    setAssignedStaff,
    loading,
    handleSubmit,
    resetForm,
  };
};
