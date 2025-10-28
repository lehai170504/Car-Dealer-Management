// src/hooks/useUpdateVehicleModel.ts
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { vehicleModelService } from "@/services/vehicleModels/vehicleModelService";
import type {
  VehicleModel,
  UpdateVehicleModelRequest,
} from "@/types/vehicleModels";

/**
 * Hook quản lý form chỉnh sửa Vehicle Model
 */
export const useUpdateVehicleModel = (initialModel: VehicleModel) => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    brand: string;
    segment: string;
    description?: string;
    active: boolean;
  }>({
    name: initialModel.name,
    brand: initialModel.brand,
    segment: initialModel.segment,
    description: initialModel.description || "",
    active: initialModel.active,
  });

  const [loading, setLoading] = useState(false);

  /** Đồng bộ khi initialModel thay đổi */
  useEffect(() => {
    setFormData({
      name: initialModel.name,
      brand: initialModel.brand,
      segment: initialModel.segment,
      description: initialModel.description || "",
      active: initialModel.active,
    });
  }, [initialModel]);

  /** Cập nhật giá trị trong formData */
  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /** Chuẩn bị payload update */
  const getUpdatePayload = (): UpdateVehicleModelRequest => {
    const payload: UpdateVehicleModelRequest = {
      name: formData.name.trim() || undefined,
      brand: formData.brand.trim() || undefined,
      segment: formData.segment.trim() || undefined,
      description: formData.description?.trim() || undefined,
      active: formData.active,
    };
    return payload;
  };

  /** Gửi request cập nhật Vehicle Model */
  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    // ✅ Validation cơ bản
    if (!formData.name || !formData.brand || !formData.segment) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ tên, thương hiệu và phân khúc!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);
      const payload = getUpdatePayload();
      await vehicleModelService.updateVehicleModel(initialModel._id, payload);

      Swal.fire("Thành công", "Cập nhật Vehicle Model thành công!", "success");

      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error("❌ Error updating vehicle model:", err);
      Swal.fire(
        "Lỗi",
        err?.message || "Không thể cập nhật Vehicle Model",
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
      name: initialModel.name,
      brand: initialModel.brand,
      segment: initialModel.segment,
      description: initialModel.description || "",
      active: initialModel.active,
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
