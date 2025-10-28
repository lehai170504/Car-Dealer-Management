"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Quote } from "@/types/quotes";
import { quotesService } from "@/services/quotes/quotesService";
import Swal from "sweetalert2";

interface UseQuotesResult {
  quotes: Quote[];
  filteredQuotes: Quote[];
  selectedQuote: Quote | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchQuotes: (page?: number) => Promise<void>;
  fetchQuoteById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách và chi tiết Quotes */
export const useQuotes = (): UseQuotesResult => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  /** 🔵 Lấy danh sách quotes (phân trang) */
  const fetchQuotes = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);
        const res = await quotesService.getAllQuotes({
          page: pageNumber,
          limit,
        });

        // Sắp xếp giảm dần theo createdAt
        const sorted = (res.items || []).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setQuotes(sorted);
        setTotal(res.total ?? 0);

        // Cập nhật từ BE nếu có
        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);

        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách quotes:", err);
        setError(err?.message || "Không thể tải danh sách quotes.");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** 🟢 Lấy chi tiết quote theo ID */
  const fetchQuoteById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await quotesService.getQuoteById(id);
      setSelectedQuote(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy quote ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin quote.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔴 Xóa quote */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa quote?",
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
        await quotesService.deleteQuote(id);
        Swal.fire("Đã xóa!", "Quote đã bị xóa thành công.", "success");
        await fetchQuotes(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa quote:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa quote", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchQuotes, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredQuotes = useMemo(() => {
    if (!search) return quotes;
    const lower = search.toLowerCase();
    return quotes.filter(
      (q) =>
        q.status?.toLowerCase().includes(lower) ||
        q.customer?.toLowerCase().includes(lower)
    );
  }, [quotes, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchQuotes(page);
  }, [fetchQuotes, page]);

  return {
    quotes,
    filteredQuotes,
    selectedQuote,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchQuotes,
    fetchQuoteById,
    handleDelete,
  };
};
