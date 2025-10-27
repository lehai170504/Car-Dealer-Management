// src/hooks/useUpdateTestDrive.ts
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { testDriveService } from "@/services/testDrives/testDriveService";
import type {
  TestDrive,
  TestDriveStatus,
  TestDriveResult,
  UpdateTestDriveRequest,
} from "@/types/testDrives";

export const useUpdateTestDrive = (initialTestDrive: TestDrive) => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState<{
    status: TestDriveStatus;
    result: TestDriveResult;
  }>({
    status: initialTestDrive.status,
    result: initialTestDrive.result || {
      feedback: "",
      interestRate: undefined,
    },
  });

  const [loading, setLoading] = useState(false);

  /** Đồng bộ dữ liệu khi initialTestDrive thay đổi */
  useEffect(() => {
    setFormData({
      status: initialTestDrive.status,
      result: initialTestDrive.result || {
        feedback: "",
        interestRate: undefined,
      },
    });
  }, [initialTestDrive]);

  /** Cập nhật giá trị trong formData */
  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /** Cập nhật giá trị bên trong result */
  const handleResultChange = <K extends keyof TestDriveResult>(
    key: K,
    value: TestDriveResult[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      result: { ...prev.result, [key]: value },
    }));
  };

  /** Chuẩn bị payload update */
  const getUpdatePayload = (): UpdateTestDriveRequest => {
    const payload: UpdateTestDriveRequest = {
      status: formData.status,
    };

    if (
      formData.result?.feedback ||
      formData.result?.interestRate !== undefined
    ) {
      payload.result = {
        feedback: formData.result.feedback,
        interestRate: formData.result.interestRate,
      };
    }

    return payload;
  };

  /** Gửi request cập nhật Test Drive */
  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    try {
      setLoading(true);
      const payload = getUpdatePayload();
      await testDriveService.updateTestDrive(initialTestDrive._id, payload);

      Swal.fire("Thành công", "Cập nhật Test Drive thành công!", "success");

      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire(
        "Lỗi",
        err?.message || "Không thể cập nhật Test Drive",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /** Hủy chỉnh sửa và reset form */
  const cancelEdit = () => {
    setEditMode(false);
    setFormData({
      status: initialTestDrive.status,
      result: initialTestDrive.result || {
        feedback: "",
        interestRate: undefined,
      },
    });
  };

  return {
    editMode,
    setEditMode,
    formData,
    loading,
    handleChange,
    handleResultChange,
    handleUpdate,
    cancelEdit,
  };
};
