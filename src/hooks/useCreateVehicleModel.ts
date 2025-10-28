// src/hooks/useCreateVehicleModel.ts
import { useState } from "react";
import Swal from "sweetalert2";
import { vehicleModelService } from "@/services/vehicleModels/vehicleModelService";
import type { CreateVehicleModelRequest } from "@/types/vehicleModels";

/**
 * Hook quản lý form tạo mới Vehicle Model
 */
export const useCreateVehicleModel = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [segment, setSegment] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);

  /** Reset form */
  const resetForm = () => {
    setName("");
    setBrand("");
    setSegment("");
    setDescription("");
    setActive(true);
  };

  /** Submit form tạo Vehicle Model */
  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    // ✅ Validation cơ bản
    if (!name || !brand || !segment) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ tên, thương hiệu và phân khúc!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: CreateVehicleModelRequest = {
        name,
        brand,
        segment,
        description: description || undefined,
        active,
      };

      await vehicleModelService.createVehicleModel(payload);

      Swal.fire("Thành công!", "Đã tạo Vehicle Model mới.", "success");

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error("❌ Error creating vehicle model:", error);
      Swal.fire(
        "Lỗi",
        error?.message || "Không thể tạo Vehicle Model. Vui lòng thử lại.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    brand,
    setBrand,
    segment,
    setSegment,
    description,
    setDescription,
    active,
    setActive,
    loading,
    handleSubmit,
    resetForm,
  };
};
