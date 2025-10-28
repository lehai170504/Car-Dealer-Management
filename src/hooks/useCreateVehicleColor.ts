// src/hooks/useCreateVehicleColor.ts
import { useState } from "react";
import Swal from "sweetalert2";
import { vehicleColorService } from "@/services/vehicleColors/vehicleColorService";
import type { CreateVehicleColorRequest } from "@/types/vehicleColors";

/**
 * Hook quản lý form tạo mới Vehicle Color
 */
export const useCreateVehicleColor = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [hex, setHex] = useState("#000000");
  const [extraPrice, setExtraPrice] = useState(0);
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);

  /** Reset form */
  const resetForm = () => {
    setName("");
    setCode("");
    setHex("#000000");
    setExtraPrice(0);
    setActive(true);
  };

  /** Submit form tạo Vehicle Color */
  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    // ✅ Validation cơ bản
    if (!name || !code || !hex) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ tên, mã code và màu hex!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: CreateVehicleColorRequest = {
        name,
        code,
        hex,
        extraPrice,
        active,
      };

      await vehicleColorService.createVehicleColor(payload);

      Swal.fire("Thành công!", "Đã tạo Vehicle Color mới.", "success");

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error("❌ Error creating vehicle color:", error);
      Swal.fire(
        "Lỗi",
        error?.message || "Không thể tạo Vehicle Color. Vui lòng thử lại.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    code,
    setCode,
    hex,
    setHex,
    extraPrice,
    setExtraPrice,
    active,
    setActive,
    loading,
    handleSubmit,
    resetForm,
  };
};
