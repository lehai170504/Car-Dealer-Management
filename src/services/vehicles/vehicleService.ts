// src/services/vehicles/vehicleService.ts
import axiosInstance from "@/utils/axiosInstance";
import {
  Vehicle,
  VehicleListResponse,
  VehicleResponse,
  CreateVehicleRequest,
  UpdateVehicleRequest,
} from "@/types/vehicles";

const endpoint = "/vehicles";

export const vehicleService = {
  /** Lấy danh sách vehicles */
  getAllVehicles: async (): Promise<Vehicle[]> => {
    try {
      const res = await axiosInstance.get<VehicleListResponse>(endpoint);
      return res.data?.data || [];
    } catch (error: any) {
      console.error("❌ Error fetching vehicles:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch vehicles"
      );
    }
  },

  /** Lấy vehicle theo ID */
  getVehicleById: async (id: string): Promise<Vehicle> => {
    try {
      const res = await axiosInstance.get<VehicleResponse>(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching vehicle ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch vehicle"
      );
    }
  },

  /** Tạo mới vehicle */
  createVehicle: async (payload: CreateVehicleRequest): Promise<Vehicle> => {
    try {
      const res = await axiosInstance.post<VehicleResponse>(endpoint, payload);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating vehicle:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create vehicle"
      );
    }
  },

  /** Cập nhật vehicle */
  updateVehicle: async (
    id: string,
    payload: UpdateVehicleRequest
  ): Promise<Vehicle> => {
    try {
      const res = await axiosInstance.put<VehicleResponse>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating vehicle ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update vehicle"
      );
    }
  },

  /** Xóa vehicle */
  deleteVehicle: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting vehicle ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete vehicle"
      );
    }
  },
  /** So sánh nhiều vehicle theo ID */
  compareVehicles: async (ids: string[]): Promise<Vehicle[]> => {
    try {
      // Chuyển mảng ids thành string phân tách bằng dấu phẩy
      const idsQuery = ids.join(",");
      const res = await axiosInstance.get<VehicleListResponse>(
        `${endpoint}/compare`,
        { params: { ids: idsQuery } }
      );
      return res.data?.data || [];
    } catch (error: any) {
      console.error(`❌ Error comparing vehicles [${ids.join(", ")}]:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to compare vehicles"
      );
    }
  },
};
