"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Dealer } from "@/types/dealer";
import { dealerService } from "@/services/dealers/dealerService";
import Swal from "sweetalert2";

interface UseDealersResult {
  dealers: Dealer[];
  filteredDealers: Dealer[];
  selectedDealer: Dealer | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchDealers: (page?: number) => Promise<void>;
  fetchDealerById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách Dealer */
export const useDealers = (): UseDealersResult => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  /** 🔵 Lấy danh sách dealers (phân trang) */
  const fetchDealers = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);
        const res = await dealerService.getAllDealers({
          page: pageNumber,
          limit,
        });

        setDealers(res.items ?? []);
        setTotal(res.total ?? 0);

        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);

        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách dealers:", err);
        setError(err?.message || "Không thể tải danh sách dealers.");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** 🟢 Lấy chi tiết dealer theo ID */
  const fetchDealerById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await dealerService.getDealerById(id);
      setSelectedDealer(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy dealer ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin dealer.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔴 Xóa dealer */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa đại lý?",
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
        await dealerService.deleteDealer(id);
        Swal.fire("Đã xóa!", "Đại lý đã bị xóa thành công.", "success");
        await fetchDealers(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa dealer:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa đại lý", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchDealers, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredDealers = useMemo(() => {
    if (!search) return dealers;
    const lower = search.toLowerCase();
    return dealers.filter(
      (d) =>
        d.name.toLowerCase().includes(lower) ||
        d.region.toLowerCase().includes(lower) ||
        d.address.toLowerCase().includes(lower) ||
        d.contacts.some(
          (c) =>
            c.name.toLowerCase().includes(lower) ||
            c.phone.toLowerCase().includes(lower) ||
            c.email.toLowerCase().includes(lower)
        )
    );
  }, [dealers, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchDealers(page);
  }, [fetchDealers, page]);

  return {
    dealers,
    filteredDealers,
    selectedDealer,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchDealers,
    fetchDealerById,
    handleDelete,
  };
};
