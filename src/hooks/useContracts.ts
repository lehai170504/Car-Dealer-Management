// src/hooks/useContracts.ts
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
  fetchContracts: () => Promise<void>;
  fetchContractById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** Hook quản lý danh sách và chi tiết Contracts */
export const useContracts = (): UseContractsResult => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // === Lấy danh sách contracts ===
  const fetchContracts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await contractService.getAllContracts();

      // Sắp xếp theo createdAt giảm dần
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setContracts(sorted);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách contracts:", err);
      setError(err?.message || "Không thể tải danh sách contracts từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Lấy chi tiết contract theo ID ===
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

  // === Xóa contract ===
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
        await fetchContracts();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa contract:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa contract", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchContracts]
  );

  // === Lọc danh sách client-side ===
  const filteredContracts = useMemo(() => {
    if (!search) return contracts;
    const lowercased = search.toLowerCase();
    return contracts.filter(
      (c) =>
        c.contractNo.toLowerCase().includes(lowercased) ||
        c.status.toLowerCase().includes(lowercased) ||
        c.order.toLowerCase().includes(lowercased)
    );
  }, [contracts, search]);

  // === Gọi lần đầu ===
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
