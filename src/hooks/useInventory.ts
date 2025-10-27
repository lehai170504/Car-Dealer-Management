import { useState, useEffect, useCallback, useMemo } from "react";
import { Inventory } from "@/types/inventory";
import { inventoryService } from "@/services/inventory/inventoryService";
import Swal from "sweetalert2";

interface UseInventoryResult {
  inventoryItems: Inventory[];
  filteredInventory: Inventory[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  fetchInventory: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export const useInventory = (): UseInventoryResult => {
  const [inventoryItems, setInventoryItems] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // === Lấy tất cả bản ghi tồn kho ===
  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getAllInventory();
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setInventoryItems(sorted);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách tồn kho:", err);
      setError(err?.message || "Không thể tải danh sách tồn kho từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Xóa bản ghi tồn kho ===
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa bản ghi tồn kho?",
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
        await inventoryService.deleteInventoryItem(id);
        Swal.fire(
          "Đã xóa!",
          "Bản ghi tồn kho đã bị xóa thành công.",
          "success"
        );
        await fetchInventory();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa bản ghi tồn kho:", err);
        Swal.fire(
          "Lỗi",
          err?.message || "Không thể xóa bản ghi tồn kho",
          "error"
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchInventory]
  );

  // === Lọc danh sách client-side ===
  const filteredInventory = useMemo(() => {
    if (!search) return inventoryItems;
    const lowercasedSearch = search.toLowerCase();

    return inventoryItems.filter(
      (item) =>
        item.owner.name.toLowerCase().includes(lowercasedSearch) ||
        item.color.code.toLowerCase().includes(lowercasedSearch) ||
        item.variant.trim.toLowerCase().includes(lowercasedSearch) ||
        item.location?.toLowerCase().includes(lowercasedSearch)
    );
  }, [inventoryItems, search]);

  // === Load lần đầu ===
  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return {
    inventoryItems,
    filteredInventory,
    loading,
    error,
    search,
    setSearch,
    fetchInventory,
    handleDelete,
  };
};
