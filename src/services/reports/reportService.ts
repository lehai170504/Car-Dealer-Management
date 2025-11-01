// src/services/salesReport/salesReportService.ts
import axiosInstance from "@/utils/axiosInstance";
import { SalesReportResponse } from "@/types/saleReports";
import { InventoryReportResponse } from "@/types/inventoryReport";
import { DebtReportResponse } from "@/types/debtReport";

const endpoint = "/reports";

export const salesReportService = {
  /** 🟦 Lấy báo cáo doanh số */
  getSalesReport: async (params?: {
    startDate?: string;
    endDate?: string;
    dealerId?: string;
  }): Promise<SalesReportResponse> => {
    try {
      const res = await axiosInstance.get<SalesReportResponse>(
        `${endpoint}/sales`,
        { params }
      );
      return res.data;
    } catch (error: any) {
      console.error("❌ Error fetching sales report:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch sales report"
      );
    }
  },
};

export const inventoryReportService = {
  /** 🟦 Lấy báo cáo tồn kho */
  getInventoryReport: async (params?: {
    startDate?: string;
    endDate?: string;
    dealerId?: string;
  }): Promise<InventoryReportResponse> => {
    try {
      const res = await axiosInstance.get<InventoryReportResponse>(
        `${endpoint}/inventory`,
        { params }
      );
      return res.data;
    } catch (error: any) {
      console.error("❌ Error fetching inventory report:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch inventory report"
      );
    }
  },
};

export const debtReportService = {
  /** 🟦 Lấy báo cáo nợ của các đại lý */
  getDebtReport: async (params?: {
    startDate?: string;
    endDate?: string;
    dealerId?: string;
  }): Promise<DebtReportResponse> => {
    try {
      const res = await axiosInstance.get<DebtReportResponse>(
        `${endpoint}/debt`,
        { params }
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
