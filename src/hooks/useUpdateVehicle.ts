import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { vehicleService } from "@/services/vehicles/vehicleService";
import { Vehicle } from "@/types/vehicle";

interface UseUpdateVehicleResult {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  formData: Vehicle;
  handleChange: (key: keyof Vehicle, value: any) => void;
  isUpdateLoading: boolean;
  handleUpdate: (onUpdated: () => void, onClose: () => void) => Promise<void>;
}

export const useUpdateVehicle = (
  initialVehicle: Vehicle
): UseUpdateVehicleResult => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Vehicle>(initialVehicle);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  useEffect(() => {
    setFormData(initialVehicle);
  }, [initialVehicle]);

  const handleChange = (key: keyof Vehicle, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]:
        key === "features"
          ? Array.isArray(value)
            ? value
            : value.split(",").map((f: string) => f.trim())
          : value,
    }));
  };

  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    if (!formData.model || !formData.version || !formData.color) {
      Swal.fire(
        "Thiếu thông tin",
        "Model, Version và Màu xe không được để trống.",
        "warning"
      );
      return;
    }

    try {
      setIsUpdateLoading(true);
      const vehicleId = initialVehicle._id!;
      await vehicleService.updateVehicle(vehicleId, formData);

      Swal.fire("Thành công", "Cập nhật thông tin xe thành công", "success");
      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire("Lỗi", err?.message || "Không thể cập nhật xe", "error");
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return {
    editMode,
    setEditMode,
    formData,
    handleChange,
    isUpdateLoading,
    handleUpdate,
  };
};
