// src/services/vehicleModels/vehicleModelService.ts
import axiosInstance from "@/utils/axiosInstance";
import {
  VehicleModel,
  VehicleModelListResponse,
  VehicleModelResponse,
  CreateVehicleModelRequest,
  UpdateVehicleModelRequest,
} from "@/types/vehicleModels";

const endpoint = "/vehicle-models";

export const vehicleModelService = {
  /** 🟦 Lấy danh sách tất cả các Mẫu Xe (Vehicle Models) */
  getAllVehicleModels: async (
    params?: Record<string, any>
  ): Promise<VehicleModelListResponse> => {
    try {
      const res = await axiosInstance.get<VehicleModelListResponse>(endpoint, {
        params,
      });

      // Đảm bảo luôn trả về một mảng VehicleModel[]
      return Array.isArray(res.data) ? res.data : [];
    } catch (error: any) {
      console.error("❌ Lỗi khi lấy danh sách mẫu xe:", error);
      throw new Error(
        error.response?.data?.message || "Không thể lấy danh sách mẫu xe"
      );
    }
  },

  /** 🟩 Lấy chi tiết Mẫu Xe theo ID */
  getDetailVehicleModel: async (id: string): Promise<VehicleModelResponse> => {
    try {
      const res = await axiosInstance.get<VehicleModelResponse>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Lỗi khi lấy chi tiết mẫu xe có ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Không thể lấy chi tiết mẫu xe"
      );
    }
  },

  /** 🟢 Tạo mới Mẫu Xe */
  createVehicleModel: async (
    payload: CreateVehicleModelRequest
  ): Promise<VehicleModelResponse> => {
    try {
      const res = await axiosInstance.post<VehicleModelResponse>(
        endpoint,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error("❌ Lỗi khi tạo mẫu xe mới:", error);
      throw new Error(
        error.response?.data?.message || "Không thể tạo mẫu xe mới"
      );
    }
  },

  /** 🟡 Cập nhật thông tin Mẫu Xe */
  updateVehicleModel: async (
    id: string,
    payload: UpdateVehicleModelRequest
  ): Promise<VehicleModelResponse> => {
    try {
      const res = await axiosInstance.patch<VehicleModelResponse>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Lỗi khi cập nhật mẫu xe có ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Không thể cập nhật mẫu xe"
      );
    }
  },

  /** 🔴 Xóa Mẫu Xe */
  deleteVehicleModel: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Lỗi khi xóa mẫu xe có ID ${id}:`, error);
      throw new Error(error.response?.data?.message || "Không thể xóa mẫu xe");
    }
  },
};
