import { useState, useEffect, useCallback, useMemo } from "react";
import { Promotion } from "@/types/promotions";
import { promotionService } from "@/services/promotions/promotionService";
import Swal from "sweetalert2";

interface UsePromotionsResult {
  promotions: Promotion[];
  filteredPromotions: Promotion[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  fetchPromotions: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export const usePromotions = (): UsePromotionsResult => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // === Lấy tất cả promotions ===
  const fetchPromotions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await promotionService.getAllPromotions();
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPromotions(sorted);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách promotions:", err);
      setError(err?.message || "Không thể tải danh sách promotions từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Xóa promotion ===
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa chương trình khuyến mãi?",
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
        await promotionService.deletePromotion(id);
        Swal.fire(
          "Đã xóa!",
          "Chương trình khuyến mãi đã bị xóa thành công.",
          "success"
        );
        await fetchPromotions();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa promotion:", err);
        Swal.fire(
          "Lỗi",
          err?.message || "Không thể xóa chương trình khuyến mãi",
          "error"
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchPromotions]
  );

  // === Lọc danh sách client-side ===
  const filteredPromotions = useMemo(() => {
    if (!search) return promotions;
    const lowercasedSearch = search.toLowerCase();

    return promotions.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercasedSearch) ||
        item.dealers.some((d) =>
          typeof d === "string"
            ? d.includes(lowercasedSearch)
            : d.name.toLowerCase().includes(lowercasedSearch)
        )
    );
  }, [promotions, search]);

  // === Load lần đầu ===
  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  return {
    promotions,
    filteredPromotions,
    loading,
    error,
    search,
    setSearch,
    fetchPromotions,
    handleDelete,
  };
};
