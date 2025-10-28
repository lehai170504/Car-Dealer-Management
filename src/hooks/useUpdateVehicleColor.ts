// src/hooks/useUpdateVehicleColor.ts
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { vehicleColorService } from "@/services/vehicleColors/vehicleColorService";
import type {
  VehicleColor,
  UpdateVehicleColorRequest,
} from "@/types/vehicleColors";

/**
 * Hook quản lý form chỉnh sửa Vehicle Color
 */
export const useUpdateVehicleColor = (initialColor: VehicleColor) => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    code: string;
    hex: string;
    extraPrice: number;
    active: boolean;
  }>({
    name: initialColor.name,
    code: initialColor.code,
    hex: initialColor.hex,
    extraPrice: initialColor.extraPrice,
    active: initialColor.active,
  });

  const [loading, setLoading] = useState(false);

  /** Đồng bộ khi initialColor thay đổi */
  useEffect(() => {
    setFormData({
      name: initialColor.name,
      code: initialColor.code,
      hex: initialColor.hex,
      extraPrice: initialColor.extraPrice,
      active: initialColor.active,
    });
  }, [initialColor]);

  /** Cập nhật giá trị trong formData */
  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /** Chuẩn bị payload update */
  const getUpdatePayload = (): UpdateVehicleColorRequest => {
    const payload: UpdateVehicleColorRequest = {
      name: formData.name.trim() || undefined,
      code: formData.code.trim() || undefined,
      hex: formData.hex.trim() || undefined,
      extraPrice: formData.extraPrice,
      active: formData.active,
    };
    return payload;
  };

  /** Gửi request cập nhật Vehicle Color */
  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    // ✅ Validation cơ bản
    if (!formData.name || !formData.code || !formData.hex) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ tên, mã code và màu hex!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);
      const payload = getUpdatePayload();
      await vehicleColorService.updateVehicleColor(initialColor._id, payload);

      Swal.fire("Thành công", "Cập nhật Vehicle Color thành công!", "success");

      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error("❌ Error updating vehicle color:", err);
      Swal.fire(
        "Lỗi",
        err?.message || "Không thể cập nhật Vehicle Color",
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
      name: initialColor.name,
      code: initialColor.code,
      hex: initialColor.hex,
      extraPrice: initialColor.extraPrice,
      active: initialColor.active,
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
