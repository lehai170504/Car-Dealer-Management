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
  /** 🟦 Lấy danh sách Vehicle Models (hỗ trợ phân trang) */
  getAllVehicleModels: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<VehicleModelListResponse> => {
    try {
      const res = await axiosInstance.get<VehicleModelListResponse>(endpoint, {
        params,
      });

      // Đảm bảo dữ liệu có đủ structure
      const data = res.data || {};
      return {
        items: data.items || [],
        total: data.total ?? 0,
        page: data.page ?? params?.page ?? 1,
        limit: data.limit ?? params?.limit ?? 10,
      };
    } catch (error: any) {
      console.error("❌ Error fetching vehicle models:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch vehicle models"
      );
    }
  },

  /** 🟩 Lấy chi tiết Vehicle Model theo ID */
  getVehicleModelById: async (id: string): Promise<VehicleModelResponse> => {
    try {
      const res = await axiosInstance.get<VehicleModelResponse>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching vehicle model ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch vehicle model"
      );
    }
  },

  /** 🟢 Tạo Vehicle Model mới */
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
      console.error("❌ Error creating vehicle model:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create vehicle model"
      );
    }
  },

  /** 🟡 Cập nhật Vehicle Model */
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
      console.error(`❌ Error updating vehicle model ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update vehicle model"
      );
    }
  },

  /** 🔴 Xóa Vehicle Model */
  deleteVehicleModel: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting vehicle model ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete vehicle model"
      );
    }
  },
};
