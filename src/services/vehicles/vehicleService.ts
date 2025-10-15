import axiosInstance from "@/utils/axiosInstance";
import { Vehicle } from "@/types/vehicle";

const endpoint = "/vehicles";

export const vehicleService = {
  /** Get all vehicles */
  getAllVehicle: async (): Promise<Vehicle[]> => {
    try {
      const res = await axiosInstance.get(endpoint);
      return res.data?.data || [];
    } catch (error: any) {
      console.error("❌ Error fetching vehicles:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch vehicles"
      );
    }
  },

  /** Get vehicle by ID */
  getVehicleById: async (id: string): Promise<Vehicle> => {
    try {
      const res = await axiosInstance.get(`${endpoint}/${id}`);
      return res.data?.data;
    } catch (error: any) {
      console.error(`❌ Error fetching vehicle ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch vehicle"
      );
    }
  },

  /** Create new vehicle */
  createVehicle: async (
    payload: Omit<Vehicle, "_id" | "createdAt" | "updatedAt">
  ): Promise<Vehicle> => {
    try {
      const res = await axiosInstance.post(endpoint, payload);
      return res.data?.data;
    } catch (error: any) {
      console.error("❌ Error creating vehicle:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create vehicle"
      );
    }
  },

  /** Update vehicle */
  updateVehicle: async (
    id: string,
    payload: Partial<Omit<Vehicle, "_id" | "createdAt" | "updatedAt">>
  ): Promise<Vehicle> => {
    try {
      const res = await axiosInstance.put(`${endpoint}/${id}`, payload);
      return res.data?.data;
    } catch (error: any) {
      console.error(`❌ Error updating vehicle ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update vehicle"
      );
    }
  },

  /** Delete vehicle */
  deleteVehicle: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting vehicle ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete vehicle"
      );
    }
  },
};
