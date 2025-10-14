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
  
}


export const useDealerManagement = (): UseDealerManagementResult => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");



  // ==========================================================
  // 1. Logic Tải Dữ liệu (Fetching Logic)
  // ==========================================================

  const fetchDealers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dealerService.getAllDealer();
      setDealers(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách Dealer:", err);
      setError(err.message || "Không thể tải danh sách Dealer từ API.");
    } finally {
      setLoading(false);
    }
  }, []); 

  // Tải dữ liệu lần đầu
  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]); 

  // Xử lý Lọc Client-Side
  const filteredDealers = useMemo(() => {
    if (!search) return dealers;
    const lowercasedSearch = search.toLowerCase();
    
    return dealers.filter(
      (d) =>
        d.name.toLowerCase().includes(lowercasedSearch) ||
        d.location.toLowerCase().includes(lowercasedSearch) ||
        d.contactInfo.toLowerCase().includes(lowercasedSearch)
    );
  }, [dealers, search]);


  // ==========================================================
  // 2. Logic Xóa Dealer (Deletion Logic)
  // ==========================================================

  const handleDelete = useCallback(async (id: string) => {
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
      // Sau khi xóa, tải lại danh sách
      await fetchDealers();
    } catch (err) {
      Swal.fire("Lỗi", "Không thể xóa Dealer", "error");
    }
  }, [fetchDealers]);


  return {
    // Data State
    dealers,
    filteredDealers,
    loading,
    error,
    search,
    setSearch,
    
    // Actions
    fetchDealers,
    handleDelete,
  };
};
