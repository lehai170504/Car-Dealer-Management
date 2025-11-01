import axiosInstance from "@/utils/axiosInstance";
import {
  Inventory,
  InventoryCreateRequest,
  InventoryTransferRequest,
  InventoryTransferResponse,
  InventoryUpdateRequest,
  SimpleInventoryListResponse,
} from "@/types/inventory";

const endpoint = "/inventory";

export const inventoryService = {
  getAllInventory: async (): Promise<Inventory[]> => {
    try {
      const res = await axiosInstance.get<SimpleInventoryListResponse>(
        endpoint
      );
      return res.data;
    } catch (error: any) {
      console.error("❌ Error fetching inventory list:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch inventory list"
      );
    }
  },

  createInventoryItem: async (
    payload: InventoryCreateRequest
  ): Promise<Inventory> => {
    try {
      const res = await axiosInstance.post<Inventory>(endpoint, payload);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating inventory item:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create inventory item"
      );
    }
  },

  updateInventoryItem: async (
    id: string,
    payload: InventoryUpdateRequest
  ): Promise<Inventory> => {
    try {
      const res = await axiosInstance.put<Inventory>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating inventory item ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update inventory item"
      );
    }
  },

  deleteInventoryItem: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data || { success: true };
    } catch (error: any) {
      console.error(`❌ Error deleting inventory item ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete inventory item"
      );
    }
  },

  transferInventory: async (
    payload: InventoryTransferRequest
  ): Promise<InventoryTransferResponse> => {
    try {
      const res = await axiosInstance.post<InventoryTransferResponse>(
        `${endpoint}/transfer`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(
        `❌ Error transferring inventory from ${payload.fromDealerId} to ${payload.toDealerId}:`,
        error
      );
      throw new Error(
        error.response?.data?.message || "Failed to transfer inventory"
      );
    }
  },
};
