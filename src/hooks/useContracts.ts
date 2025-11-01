"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Contract } from "@/types/contracts";
import { contractService } from "@/services/contracts/contractService";
import { toast } from "sonner";

interface UseContractsResult {
  contracts: Contract[];
  filteredContracts: Contract[];
  selectedContract: Contract | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  fetchContracts: () => Promise<void>;
  fetchContractById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách & chi tiết Contracts (không phân trang) */
export const useContracts = (): UseContractsResult => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  /** 🔵 Lấy tất cả contracts */
  const fetchContracts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await contractService.getAllContracts();
      setContracts(data || []);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách contracts:", err);
      setError(err?.message || "Không thể tải danh sách contracts.");
      toast.error(err?.message || "Không thể tải danh sách contracts.");
    } finally {
      setLoading(false);
    }
  }, []);

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
      toast.error(err?.message || "Không thể tải thông tin contract.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔴 Xóa contract */
  const handleDelete = useCallback(
    async (id: string) => {
      // Confirm bằng window.confirm đơn giản với sonner
      const confirmed = window.confirm(
        "Xóa contract? Hành động này không thể hoàn tác!"
      );
      if (!confirmed) return;

      try {
        setLoading(true);
        await contractService.deleteContract(id);
        toast.success("Contract đã bị xóa thành công.");
        await fetchContracts();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa contract:", err);
        toast.error(err?.message || "Không thể xóa contract");
      } finally {
        setLoading(false);
      }
    },
    [fetchContracts]
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
    fetchContracts();
  }, [fetchContracts]);

  return {
    contracts,
    filteredContracts,
    selectedContract,
    loading,
    error,
    search,
    setSearch,
    fetchContracts,
    fetchContractById,
    handleDelete,
  };
};
