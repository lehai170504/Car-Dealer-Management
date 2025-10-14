import axiosInstance from "@/utils/axiosInstance";
import { Dealer } from "@/types/dealer";

const endpoint = "/dealers";

export const dealerService = {
  /** Get all dealers */
  getAllDealer: async (): Promise<Dealer[]> => {
    try {
      const res = await axiosInstance.get(endpoint);
      return res.data?.data || [];
    } catch (error: any) {
      console.error("❌ Error fetching dealers:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch dealers"
      );
    }
  },

  /** Get dealer by ID */
  getDealerById: async (id: string): Promise<Dealer> => {
    try {
      const res = await axiosInstance.get(`${endpoint}/${id}`);
      return res.data?.data;
    } catch (error: any) {
      console.error(`❌ Error fetching dealer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch dealer"
      );
    }
  },

  /** Create new dealer */
  createDealer: async (
    payload: Omit<Dealer, "_id" | "createdAt" | "updatedAt">
  ): Promise<Dealer> => {
    try {
      const res = await axiosInstance.post(endpoint, payload);
      return res.data?.data;
    } catch (error: any) {
      console.error("❌ Error creating dealer:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create dealer"
      );
    }
  },

  /** Update dealer */
  updateDealer: async (
    id: string,
    payload: Partial<Omit<Dealer, "_id" | "createdAt" | "updatedAt">>
  ): Promise<Dealer> => {
    try {
      const res = await axiosInstance.put(`${endpoint}/${id}`, payload);
      return res.data?.data;
    } catch (error: any) {
      console.error(`❌ Error updating dealer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update dealer"
      );
    }
  },

  /** Delete dealer */
  deleteDealer: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting dealer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete dealer"
      );
    }
  },
};
