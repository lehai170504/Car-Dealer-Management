"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Payment } from "@/types/payments";
import { paymentService } from "@/services/payments/paymentService";
import Swal from "sweetalert2";

interface UsePaymentsResult {
  payments: Payment[];
  filteredPayments: Payment[];
  selectedPayment: Payment | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchPayments: (page?: number) => Promise<void>;
  fetchPaymentById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách và chi tiết Payments */
export const usePayments = (): UsePaymentsResult => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  /** 🔵 Lấy danh sách payments (phân trang) */
  const fetchPayments = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);

        const res = await paymentService.getAllPayments({
          page: pageNumber,
          limit,
        });

        setPayments(res.items ?? []);
        setTotal(res.total ?? 0);

        // Cập nhật từ BE nếu có
        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);

        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách payments:", err);
        setError(err?.message || "Không thể tải danh sách payments.");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** 🟢 Lấy chi tiết payment theo ID */
  const fetchPaymentById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await paymentService.getPaymentById(id);
      setSelectedPayment(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy payment ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin payment.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔴 Xóa payment */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa payment?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#dc2626",
      });

      if (!confirm.isConfirmed) return;

      try {
        setLoading(true);
        await paymentService.deletePayment(id);
        Swal.fire("Đã xóa!", "Payment đã bị xóa thành công.", "success");
        await fetchPayments(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa payment:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa payment", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchPayments, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredPayments = useMemo(() => {
    if (!search) return payments;
    const lower = search.toLowerCase();
    return payments.filter(
      (p) =>
        p.method?.toLowerCase().includes(lower) ||
        p.status?.toLowerCase().includes(lower) ||
        p.type?.toLowerCase().includes(lower) ||
        p.transactionRef?.toLowerCase().includes(lower) ||
        p.order?.toLowerCase().includes(lower)
    );
  }, [payments, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchPayments(page);
  }, [fetchPayments, page]);

  return {
    payments,
    filteredPayments,
    selectedPayment,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchPayments,
    fetchPaymentById,
    handleDelete,
  };
};
