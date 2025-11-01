import axiosInstance from "@/utils/axiosInstance";
import {
  Dealer,
  DealerResponse,
  CreateDealerRequest,
  UpdateDealerRequest,
  DealerInventory,
  DealerListInventory,
  TargetDealerRequest,
  TargerDealerResponse,
} from "@/types/dealer";

const endpoint = "/dealers";

export const dealerService = {
  /** Get all dealers (no pagination, return raw data) */
  getAllDealers: async (): Promise<Dealer[]> => {
    try {
      const res = await axiosInstance.get<{ success: boolean; data: Dealer[] }>(
        endpoint
      );
      return res.data.data || [];
    } catch (error: any) {
      console.error("❌ Error fetching dealers:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch dealers"
      );
    }
  },

  /** Get dealer by ID */
  getDealerById: async (id: string): Promise<DealerResponse> => {
    try {
      const res = await axiosInstance.get<DealerResponse>(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching dealer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch dealer"
      );
    }
  },

  /** Create new dealer */
  createDealer: async (
    payload: CreateDealerRequest
  ): Promise<DealerResponse> => {
    try {
      const res = await axiosInstance.post<DealerResponse>(endpoint, payload);
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
    payload: UpdateDealerRequest
  ): Promise<DealerResponse> => {
    try {
      const res = await axiosInstance.patch<DealerResponse>(
        `${endpoint}/${id}`,
        payload
      );
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
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting dealer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete dealer"
      );
    }
  },

  /** Get dealer inventory */
  getDealerInventory: async (id: string): Promise<DealerInventory[]> => {
    try {
      const res = await axiosInstance.get<DealerListInventory>(
        `${endpoint}/${id}/inventory`
      );
      return res.data.data || [];
    } catch (error: any) {
      console.error(`❌ Error fetching inventory for dealer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch dealer inventory"
      );
    }
  },

  /** Update dealer sales target */
  updateDealerTarget: async (
    id: string,
    payload: TargetDealerRequest
  ): Promise<TargerDealerResponse> => {
    try {
      const res = await axiosInstance.put<TargerDealerResponse>(
        `${endpoint}/${id}/target`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating target for dealer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update dealer target"
      );
    }
  },
};
