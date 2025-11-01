import axiosInstance from "@/utils/axiosInstance";
import { DashboardSummary, TrendDashboard } from "@/types/dashboard";

const endpoint = "/dashboard";

export const dashboardService = {
  /** 📊 Lấy dữ liệu tổng quan dashboard */
  async getSummary(): Promise<DashboardSummary> {
    const { data } = await axiosInstance.get<DashboardSummary>(
      `${endpoint}/summary`
    );
    return data;
  },

  /** 📈 Lấy dữ liệu xu hướng theo ngày / tuần / tháng */
  async getTrend(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<TrendDashboard[]> {
    const { data } = await axiosInstance.get<TrendDashboard[]>(
      `${endpoint}/trend`,
      { params }
    );
    return data;
  },
};
