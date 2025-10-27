// src/hooks/useQuotes.ts
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
  fetchQuotes: () => Promise<void>;
  fetchQuoteById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export const useQuotes = (): UseQuotesResult => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // === Lấy tất cả quotes ===
  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await quotesService.getAllQuotes();

      // Sắp xếp theo createdAt giảm dần nếu có
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setQuotes(sorted);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách quotes:", err);
      setError(err?.message || "Không thể tải danh sách quotes từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Lấy chi tiết quote theo ID ===
  const fetchQuoteById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await quotesService.getQuoteById(id);
      setSelectedQuote(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy thông tin quote ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin quote.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Xóa quote ===
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
        await fetchQuotes();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa quote:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa quote", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchQuotes]
  );

  // === Lọc danh sách client-side ===
  // === Lọc danh sách theo status ===
  const filteredQuotes = useMemo(() => {
    if (!search) return quotes;
    const lowercasedSearch = search.toLowerCase();

    return quotes.filter((q) =>
      q.status?.toLowerCase().includes(lowercasedSearch)
    );
  }, [quotes, search]);

  // === Load lần đầu ===
  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return {
    quotes,
    filteredQuotes,
    selectedQuote,
    loading,
    error,
    search,
    setSearch,
    fetchQuotes,
    fetchQuoteById,
    handleDelete,
  };
};
