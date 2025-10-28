// src/hooks/useUpdateVehicle.ts
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { vehicleService } from "@/services/vehicles/vehicleService";
import { Vehicle, UpdateVehicleRequest } from "@/types/vehicles";

interface UseUpdateVehicleResult {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  formData: UpdateVehicleRequest;
  handleChange: <K extends keyof UpdateVehicleRequest>(
    key: K,
    value: UpdateVehicleRequest[K]
  ) => void;
  handleArrayField: (key: keyof UpdateVehicleRequest, values: string[]) => void;
  isUpdateLoading: boolean;
  handleUpdate: (onUpdated: () => void, onClose: () => void) => Promise<void>;
  cancelEdit: () => void;
}

export const useUpdateVehicle = (
  initialVehicle: Vehicle
): UseUpdateVehicleResult => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UpdateVehicleRequest>({
    trim: initialVehicle.trim,
    battery: initialVehicle.battery,
    range: initialVehicle.range,
    motorPower: initialVehicle.motorPower,
    features: initialVehicle.features || [],
    msrp: initialVehicle.msrp,
    images: initialVehicle.images || [],
    active: initialVehicle.active,
  });
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  // Reset về dữ liệu ban đầu
  const cancelEdit = () => {
    setFormData({
      trim: initialVehicle.trim,
      battery: initialVehicle.battery,
      range: initialVehicle.range,
      motorPower: initialVehicle.motorPower,
      features: initialVehicle.features || [],
      msrp: initialVehicle.msrp,
      images: initialVehicle.images || [],
      active: initialVehicle.active,
    });
    setEditMode(false);
  };

  // Update form khi initialVehicle thay đổi
  useEffect(() => {
    setFormData({
      trim: initialVehicle.trim,
      battery: initialVehicle.battery,
      range: initialVehicle.range,
      motorPower: initialVehicle.motorPower,
      features: initialVehicle.features || [],
      msrp: initialVehicle.msrp,
      images: initialVehicle.images || [],
      active: initialVehicle.active,
    });
  }, [initialVehicle]);

  // Cập nhật field đơn lẻ
  const handleChange = <K extends keyof UpdateVehicleRequest>(
    key: K,
    value: UpdateVehicleRequest[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Cập nhật array field (features hoặc images)
  const handleArrayField = (
    key: keyof UpdateVehicleRequest,
    values: string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  // Submit update vehicle
  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    if (
      !formData.trim ||
      !formData.battery ||
      !formData.range ||
      !formData.motorPower ||
      !formData.msrp
    ) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ các trường bắt buộc: trim, battery, range, motorPower, msrp",
        "warning"
      );
      return;
    }

    try {
      setIsUpdateLoading(true);
      await vehicleService.updateVehicle(initialVehicle._id, formData);

      Swal.fire(
        "Thành công",
        "Cập nhật thông tin Vehicle thành công",
        "success"
      );
      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire("Lỗi", err?.message || "Không thể cập nhật Vehicle", "error");
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return {
    editMode,
    setEditMode,
    formData,
    handleChange,
    handleArrayField,
    isUpdateLoading,
    handleUpdate,
    cancelEdit,
  };
};
