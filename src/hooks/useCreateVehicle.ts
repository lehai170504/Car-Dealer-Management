// src/hooks/useCreateVehicle.ts
import { useState } from "react";
import Swal from "sweetalert2";
import { vehicleService } from "@/services/vehicles/vehicleService";
import { CreateVehicleRequest } from "@/types/vehicles";

const initialForm: CreateVehicleRequest = {
  model: "",
  trim: "",
  battery: "",
  range: 0,
  motorPower: 0,
  features: [],
  msrp: 0,
  images: [],
  active: true,
};

export const useCreateVehicle = () => {
  const [vehicleForm, setVehicleForm] =
    useState<CreateVehicleRequest>(initialForm);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  // Cập nhật trường form
  const setVehicleField = <K extends keyof CreateVehicleRequest>(
    key: K,
    value: CreateVehicleRequest[K]
  ) => {
    setVehicleForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset form về trạng thái ban đầu
  const resetVehicleForm = () => setVehicleForm(initialForm);

  // Xử lý submit tạo vehicle
  const handleCreateSubmit = async (
    onClose: () => void,
    onSuccess: () => void
  ) => {
    const { model, trim, battery, range, motorPower, features, msrp, images } =
      vehicleForm;

    // Validate các trường bắt buộc
    if (
      !model ||
      !trim ||
      !battery ||
      range <= 0 ||
      motorPower <= 0 ||
      msrp <= 0
    ) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ tất cả các trường bắt buộc!",
        "warning"
      );
      return false;
    }

    try {
      setIsCreateLoading(true);
      await vehicleService.createVehicle(vehicleForm);
      Swal.fire("Thành công!", "Đã thêm Vehicle mới.", "success");
      resetVehicleForm();
      onClose();
      onSuccess();
      return true;
    } catch (error: any) {
      console.error(error);
      Swal.fire("Lỗi", error?.message || "Không thể tạo Vehicle.", "error");
      return false;
    } finally {
      setIsCreateLoading(false);
    }
  };

  return {
    vehicleForm,
    setVehicleField,
    resetVehicleForm,
    isCreateLoading,
    handleCreateSubmit,
  };
};
