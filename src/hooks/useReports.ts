"use client";

import { useState, useCallback } from "react";
import {
  salesReportService,
  inventoryReportService,
  debtReportService,
} from "@/services/reports/reportService";
import { SalesReportResponse } from "@/types/saleReports";
import { InventoryReportResponse } from "@/types/inventoryReport";
import { DebtReportResponse } from "@/types/debtReport";
import { useDealers } from "@/hooks/useDealers";

/** Common type cho hook */
interface UseReportResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchReport: (params?: {
    startDate?: string;
    endDate?: string;
    dealerId?: string; // có thể undefined → lấy từ useDealers
  }) => Promise<void>;
}

export const useReports = () => {
  const { dealers } = useDealers(); // lấy danh sách dealers
  const [salesData, setSalesData] = useState<SalesReportResponse | null>(null);
  const [inventoryData, setInventoryData] =
    useState<InventoryReportResponse | null>(null);
  const [debtData, setDebtData] = useState<DebtReportResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** fetch chung cho tất cả báo cáo */
  const fetchReport = useCallback(
    async (params?: {
      startDate?: string;
      endDate?: string;
      dealerId?: string;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const dealerId = params?.dealerId ?? undefined;

        const [salesRes, inventoryRes, debtRes] = await Promise.all([
          salesReportService.getSalesReport({ ...params, dealerId }),
          inventoryReportService.getInventoryReport({ ...params, dealerId }),
          debtReportService.getDebtReport({ ...params, dealerId }),
        ]);

        setSalesData(salesRes);
        setInventoryData(inventoryRes);
        setDebtData(debtRes);
      } catch (err: any) {
        setError(err.message || "Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    },
    [dealers] // có thể rebuild khi dealers thay đổi
  );

  return {
    sales: { data: salesData, loading, error, fetchReport },
    inventory: { data: inventoryData, loading, error, fetchReport },
    debt: { data: debtData, loading, error, fetchReport },
  };
};
