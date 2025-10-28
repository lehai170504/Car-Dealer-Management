"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Contract } from "@/types/contracts";
import { contractService } from "@/services/contracts/contractService";
import Swal from "sweetalert2";

interface UseContractsResult {
  contracts: Contract[];
  filteredContracts: Contract[];
  selectedContract: Contract | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchContracts: (page?: number) => Promise<void>;
  fetchContractById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách & chi tiết Contracts (phân trang + CRUD) */
export const useContracts = (): UseContractsResult => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  /** 🔵 Lấy danh sách contracts (phân trang) */
  const fetchContracts = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);

        const res = await contractService.getAllContracts({
          page: pageNumber,
          limit,
        });

        setContracts(res.items ?? []);
        setTotal(res.total ?? 0);

        // Cập nhật từ BE nếu có
        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);

        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách contracts:", err);
        setError(err?.message || "Không thể tải danh sách contracts.");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** 🟢 Lấy chi tiết contract theo ID */
  const fetchContractById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await contractService.getContractById(id);
      setSelectedContract(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy contract ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin contract.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔴 Xóa contract */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa contract?",
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
        await contractService.deleteContract(id);
        Swal.fire("Đã xóa!", "Contract đã bị xóa thành công.", "success");
        await fetchContracts(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa contract:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa contract", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchContracts, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredContracts = useMemo(() => {
    if (!search) return contracts;
    const lower = search.toLowerCase();
    return contracts.filter(
      (c) =>
        c.contractNo?.toLowerCase().includes(lower) ||
        c.status?.toLowerCase().includes(lower) ||
        c.order?.toLowerCase().includes(lower)
    );
  }, [contracts, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchContracts(page);
  }, [fetchContracts, page]);

  return {
    contracts,
    filteredContracts,
    selectedContract,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchContracts,
    fetchContractById,
    handleDelete,
  };
};
