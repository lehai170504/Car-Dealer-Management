"use client";

import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard/dashboardService";
import { DashboardSummary, TrendDashboard } from "@/types/dashboard";

interface UseDashboardResult {
  summary: DashboardSummary | null;
  trend: TrendDashboard[];
  loading: boolean;
  error: string | null;
  fetchSummary: () => Promise<void>;
  fetchTrend: (params?: {
    startDate?: string;
    endDate?: string;
  }) => Promise<void>;
}

/** 📊 Hook quản lý dashboard data (summary + trend) */
export const useDashboard = (): UseDashboardResult => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [trend, setTrend] = useState<TrendDashboard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Lấy tổng quan dashboard */
  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getSummary();
      setSummary(data);
    } catch (err: any) {
      setError(err.message || "Không thể tải dữ liệu tổng quan");
    } finally {
      setLoading(false);
    }
  };

  /** Lấy dữ liệu xu hướng dashboard */
  const fetchTrend = async (params?: {
    startDate?: string;
    endDate?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getTrend(params);
      setTrend(data);
    } catch (err: any) {
      setError(err.message || "Không thể tải dữ liệu xu hướng");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Tự động load summary khi mount
  useEffect(() => {
    fetchSummary();
  }, []);

  return {
    summary,
    trend,
    loading,
    error,
    fetchSummary,
    fetchTrend,
  };
};
