import axiosInstance from "@/utils/axiosInstance";
import { Dealer, DealerCredentials } from "@/types/dealer";

const endpoint = "/dealers";

export const dealerService = {
  /** Get all dealers */
  getAllDealers: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<{
    items: Dealer[];
    total: number;
    page: number;
    limit: number;
  }> => {
    try {
      const res = await axiosInstance.get(endpoint, { params });

      const data = res.data || {};

      return {
        items: data.items || [],
        total: data.total ?? 0,
        page: data.page ?? params?.page ?? 1,
        limit: data.limit ?? params?.limit ?? 10,
      };
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
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching dealer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch dealer"
      );
    }
  },

  /** Create new dealer */
  createDealer: async (payload: DealerCredentials): Promise<Dealer> => {
    try {
      const res = await axiosInstance.post(endpoint, payload);
      return res.data;
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
    payload: Partial<DealerCredentials>
  ): Promise<Dealer> => {
    try {
      const res = await axiosInstance.patch(`${endpoint}/${id}`, payload);
      return res.data;
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
