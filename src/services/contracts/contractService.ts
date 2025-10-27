// src/services/contracts/contractService.ts
import axiosInstance from "@/utils/axiosInstance";
import {
  Contract,
  ContractListResponse,
  CreateContractRequest,
  UpdateContractRequest,
} from "@/types/contracts";

const endpoint = "/contracts";

export const contractService = {
  /** 🟦 Lấy danh sách contracts */
  getAllContracts: async (): Promise<Contract[]> => {
    try {
      const res = await axiosInstance.get<ContractListResponse>(endpoint);
      return res.data?.items || [];
    } catch (error: any) {
      console.error("❌ Error fetching contracts:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch contracts"
      );
    }
  },

  /** 🟩 Lấy chi tiết contract theo ID */
  getContractById: async (id: string): Promise<Contract> => {
    try {
      const res = await axiosInstance.get<Contract>(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching contract ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch contract"
      );
    }
  },

  /** 🟢 Tạo contract mới */
  createContract: async (payload: CreateContractRequest): Promise<Contract> => {
    try {
      const res = await axiosInstance.post<Contract>(endpoint, payload);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating contract:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create contract"
      );
    }
  },

  /** 🟡 Cập nhật contract */
  updateContract: async (
    id: string,
    payload: UpdateContractRequest
  ): Promise<Contract> => {
    try {
      const res = await axiosInstance.patch<Contract>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating contract ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update contract"
      );
    }
  },

  /** 🔴 Xóa contract */
  deleteContract: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting contract ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete contract"
      );
    }
  },
};
