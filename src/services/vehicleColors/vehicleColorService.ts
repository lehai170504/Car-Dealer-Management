// src/services/vehicleColors/vehicleColorService.ts
import axiosInstance from "@/utils/axiosInstance";
import {
  VehicleColor,
  VehicleColorListResponse,
  VehicleColorResponse,
  CreateVehicleColorRequest,
  UpdateVehicleColorRequest,
} from "@/types/vehicleColors";

const endpoint = "/vehicle-colors";

export const vehicleColorService = {
  /** 🟦 Lấy danh sách Vehicle Colors (hỗ trợ phân trang) */
  getAllVehicleColors: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<VehicleColorListResponse> => {
    try {
      const res = await axiosInstance.get<VehicleColorListResponse>(endpoint, {
        params,
      });
      const data = res.data || {};
      return {
        items: data.items || [],
        total: data.total ?? 0,
        page: data.page ?? params?.page ?? 1,
        limit: data.limit ?? params?.limit ?? 10,
      };
    } catch (error: any) {
      console.error("❌ Error fetching vehicle colors:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch vehicle colors"
      );
    }
  },

  /** 🟩 Lấy chi tiết Vehicle Color theo ID */
  getVehicleColorById: async (id: string): Promise<VehicleColorResponse> => {
    try {
      const res = await axiosInstance.get<VehicleColorResponse>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching vehicle color ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch vehicle color"
      );
    }
  },

  /** 🟢 Tạo Vehicle Color mới */
  createVehicleColor: async (
    payload: CreateVehicleColorRequest
  ): Promise<VehicleColorResponse> => {
    try {
      const res = await axiosInstance.post<VehicleColorResponse>(
        endpoint,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating vehicle color:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create vehicle color"
      );
    }
  },

  /** 🟡 Cập nhật Vehicle Color */
  updateVehicleColor: async (
    id: string,
    payload: UpdateVehicleColorRequest
  ): Promise<VehicleColorResponse> => {
    try {
      const res = await axiosInstance.patch<VehicleColorResponse>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating vehicle color ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update vehicle color"
      );
    }
  },

  /** 🔴 Xóa Vehicle Color */
  deleteVehicleColor: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting vehicle color ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete vehicle color"
      );
    }
  },
};
