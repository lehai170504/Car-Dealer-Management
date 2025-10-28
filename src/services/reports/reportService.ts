// src/services/reports/reportService.ts
import axiosInstance from "@/utils/axiosInstance";
import { InventoryReportResponse, DebtReportResponse } from "@/types/reports";

const baseEndpoint = "/reports";

export const reportService = {
  /** Lấy báo cáo tồn kho */
  getInventoryReport: async (): Promise<InventoryReportResponse> => {
    try {
      const res = await axiosInstance.get<InventoryReportResponse>(
        `${baseEndpoint}/inventory`
      );
      return res.data;
    } catch (error: any) {
      console.error("❌ Error fetching inventory report:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch inventory report"
      );
    }
  },

  /** Lấy báo cáo nợ */
  getDebtReport: async (): Promise<DebtReportResponse> => {
    try {
      const res = await axiosInstance.get<DebtReportResponse>(
        `${baseEndpoint}/debt`
      );
      return res.data;
    } catch (error: any) {
      console.error("❌ Error fetching debt report:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch debt report"
      );
    }
  },
};
