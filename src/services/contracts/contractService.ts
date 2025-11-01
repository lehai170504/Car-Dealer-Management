// src/services/contracts/contractService.ts
import axiosInstance from "@/utils/axiosInstance";
import {
  Contract,
  ContractResponse,
  CreateContractRequest,
  UpdateContractRequest,
} from "@/types/contracts";

const endpoint = "/contracts";

export const contractService = {
  /** 🟦 Lấy tất cả contracts (không phân trang) */
  getAllContracts: async (): Promise<Contract[]> => {
    try {
      const res = await axiosInstance.get<Contract[]>(endpoint);
      return res.data || [];
    } catch (error: any) {
      console.error("❌ Error fetching contracts:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch contracts"
      );
    }
  },

  /** 🟩 Lấy chi tiết contract theo ID */
  getContractById: async (id: string): Promise<ContractResponse> => {
    try {
      const res = await axiosInstance.get<ContractResponse>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching contract ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch contract"
      );
    }
  },

  /** 🟢 Tạo contract mới */
  createContract: async (
    payload: CreateContractRequest
  ): Promise<ContractResponse> => {
    try {
      const res = await axiosInstance.post<ContractResponse>(endpoint, payload);
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
  ): Promise<ContractResponse> => {
    try {
      const res = await axiosInstance.patch<ContractResponse>(
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
