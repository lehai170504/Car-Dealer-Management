import { useState, useEffect, useCallback, useMemo } from "react";
import { Dealer } from "@/types/dealer";
import { dealerService } from "@/services/dealers/dealerService";
import Swal from "sweetalert2";

interface UseDealerManagementResult {
  // Data State
  dealers: Dealer[];
  filteredDealers: Dealer[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  // Fetching & Deletion Actions
  fetchDealers: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  getDealerById: (id: string) => Promise<Dealer | null>;
}

export const useDealerManagement = (): UseDealerManagementResult => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // ==========================================================
  // 1. Fetch Dealers
  // ==========================================================
  const fetchDealers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dealerService.getAllDealers();
      const sortedDealers = [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setDealers(sortedDealers);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách Dealer:", err);
      setError(err.message || "Không thể tải danh sách Dealer từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  // ==========================================================
  // 2. Filter Dealers (client-side)
  // ==========================================================
  const filteredDealers = useMemo(() => {
    if (!search) return dealers;
    const lowercasedSearch = search.toLowerCase();

    return dealers.filter(
      (d) =>
        d.name.toLowerCase().includes(lowercasedSearch) ||
        d.region.toLowerCase().includes(lowercasedSearch) ||
        d.address.toLowerCase().includes(lowercasedSearch) ||
        d.contacts.some(
          (contact) =>
            contact.name.toLowerCase().includes(lowercasedSearch) ||
            contact.phone.toLowerCase().includes(lowercasedSearch) ||
            contact.email.toLowerCase().includes(lowercasedSearch)
        )
    );
  }, [dealers, search]);

  // ==========================================================
  // 3. Delete Dealer
  // ==========================================================
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa Dealer?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#dc2626",
      });

      if (!confirm.isConfirmed) return;

      try {
        await dealerService.deleteDealer(id);
        Swal.fire("Đã xóa!", "Dealer đã bị xóa thành công.", "success");
        await fetchDealers();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa Dealer:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa Dealer", "error");
      }
    },
    [fetchDealers]
  );

  // ==========================================================
  // 4. Get Dealer by ID
  // ==========================================================
  const getDealerById = useCallback(
    async (id: string): Promise<Dealer | null> => {
      try {
        const dealer = await dealerService.getDealerById(id);
        return dealer;
      } catch (err: any) {
        console.error(`❌ Lỗi khi lấy Dealer ID ${id}:`, err);
        Swal.fire(
          "Lỗi",
          err?.message || "Không thể lấy thông tin Dealer",
          "error"
        );
        return null;
      }
    },
    []
  );

  return {
    dealers,
    filteredDealers,
    loading,
    error,
    search,
    setSearch,
    fetchDealers,
    handleDelete,
    getDealerById,
  };
};
