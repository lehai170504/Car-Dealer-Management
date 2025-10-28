// src/hooks/useVehicles.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { Vehicle } from "@/types/vehicles";
import { vehicleService } from "@/services/vehicles/vehicleService";
import Swal from "sweetalert2";

interface UseVehiclesResult {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  fetchVehicles: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export const useVehicles = (): UseVehiclesResult => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // === Lấy tất cả vehicles ===
  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getAllVehicles();
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
      );
      setVehicles(sorted);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách vehicles:", err);
      setError(err?.message || "Không thể tải danh sách vehicles từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Xóa vehicle ===
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa vehicle?",
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
        await vehicleService.deleteVehicle(id);
        Swal.fire("Đã xóa!", "Vehicle đã bị xóa thành công.", "success");
        await fetchVehicles();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa vehicle:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa vehicle", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicles]
  );

  // === Lọc danh sách client-side ===
  const filteredVehicles = useMemo(() => {
    if (!search) return vehicles;
    const lowercasedSearch = search.toLowerCase();

    return vehicles.filter((v) => {
      const modelName = v.model?.name || "";
      const brand = v.model?.brand || "";
      return (
        modelName.toLowerCase().includes(lowercasedSearch) ||
        brand.toLowerCase().includes(lowercasedSearch) ||
        v.trim.toLowerCase().includes(lowercasedSearch) ||
        v.battery.toLowerCase().includes(lowercasedSearch)
      );
    });
  }, [vehicles, search]);

  // === Load lần đầu ===
  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    filteredVehicles,
    loading,
    error,
    search,
    setSearch,
    fetchVehicles,
    handleDelete,
  };
};
