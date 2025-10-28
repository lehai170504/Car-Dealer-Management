"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { reportService } from "@/services/reports/reportService";
import { InventoryReportResponse, DebtReportResponse } from "@/types/reports";
import Swal from "sweetalert2";

interface UseReportsResult {
  inventoryReport: InventoryReportResponse | null;
  debtReport: DebtReportResponse | null;
  loading: boolean;
  error: string | null;

  fetchInventoryReport: () => Promise<void>;
  fetchDebtReport: () => Promise<void>;
}

/** 🧩 Hook quản lý báo cáo tồn kho & nợ */
export const useReports = (): UseReportsResult => {
  const [inventoryReport, setInventoryReport] =
    useState<InventoryReportResponse | null>(null);
  const [debtReport, setDebtReport] = useState<DebtReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** 🔵 Lấy báo cáo tồn kho */
  const fetchInventoryReport = useCallback(async () => {
    try {
      setLoading(true);
      const data = await reportService.getInventoryReport();
      setInventoryReport(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải báo cáo tồn kho:", err);
      setError(err?.message || "Không thể tải báo cáo tồn kho.");
      Swal.fire(
        "Lỗi",
        err?.message || "Không thể tải báo cáo tồn kho.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🟢 Lấy báo cáo nợ */
  const fetchDebtReport = useCallback(async () => {
    try {
      setLoading(true);
      const data = await reportService.getDebtReport();
      setDebtReport(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải báo cáo nợ:", err);
      setError(err?.message || "Không thể tải báo cáo nợ.");
      Swal.fire("Lỗi", err?.message || "Không thể tải báo cáo nợ.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🪄 Tự động load inventoryReport lần đầu (tuỳ nhu cầu) */
  useEffect(() => {
    fetchInventoryReport();
  }, [fetchInventoryReport]);

  return {
    inventoryReport,
    debtReport,
    loading,
    error,
    fetchInventoryReport,
    fetchDebtReport,
  };
};
