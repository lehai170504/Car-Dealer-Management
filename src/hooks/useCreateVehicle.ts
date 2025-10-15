import { useState } from "react";
import Swal from "sweetalert2";
import { vehicleService } from "@/services/vehicles/vehicleService";
import { Vehicle } from "@/types/vehicle";

// Khi tạo mới, ta bỏ qua các trường do backend tự sinh ra
export type NewVehiclePayload = Omit<
  Vehicle,
  "_id" | "createdAt" | "updatedAt"
>;

export const useCreateVehicle = () => {
  const initialState: NewVehiclePayload = {
    model: "",
    version: "",
    color: "",
    features: [],
    price: 0,
  };

  const [newVehicleForm, setNewVehicleForm] =
    useState<NewVehiclePayload>(initialState);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  /** Set field */
  const setNewVehicleField = (key: keyof NewVehiclePayload, value: any) => {
    setNewVehicleForm((prev) => ({
      ...prev,
      [key]:
        key === "features"
          ? Array.isArray(value)
            ? value
            : value
                .split(",")
                .map((f: string) => f.trim())
                .filter((f: string) => f.length > 0)
          : value,
    }));
  };

  /** Reset form */
  const resetCreateForm = () => {
    setNewVehicleForm(initialState);
  };

  /** Handle create submit */
  const handleCreateSubmit = async (
    onClose: () => void,
    onSuccess: () => void
  ): Promise<boolean> => {
    const { model, version, color } = newVehicleForm;

    if (!model || !version || !color) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ Model, Version và Màu xe!",
        "warning"
      );
      return false;
    }

    try {
      setIsCreateLoading(true);
      await vehicleService.createVehicle(newVehicleForm);
      Swal.fire("Thành công!", "Xe mới đã được thêm vào hệ thống.", "success");

      resetCreateForm();
      onClose();
      onSuccess();
      return true;
    } catch (error: any) {
      console.error(error);
      Swal.fire("Lỗi", error?.message || "Không thể tạo xe mới.", "error");
      return false;
    } finally {
      setIsCreateLoading(false);
    }
  };

  return {
    newVehicleForm,
    setNewVehicleField,
    isCreateLoading,
    handleCreateSubmit,
    resetCreateForm,
  };
};
