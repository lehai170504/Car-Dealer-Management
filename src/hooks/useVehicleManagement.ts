import { useState, useEffect, useCallback, useMemo } from "react";
import { Vehicle } from "@/types/vehicle";
import { vehicleService } from "@/services/vehicles/vehicleService";
import Swal from "sweetalert2";

interface UseVehicleManagementResult {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  fetchVehicles: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export const useVehicleManagement = (): UseVehicleManagementResult => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getAllVehicle();
      setVehicles(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách xe:", err);
      setError(err.message || "Không thể tải danh sách xe từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const filteredVehicles = useMemo(() => {
    if (!search) return vehicles;
    const lower = search.toLowerCase();

    return vehicles.filter(
      (v) =>
        v.model.toLowerCase().includes(lower) ||
        v.version.toLowerCase().includes(lower) ||
        v.color.toLowerCase().includes(lower) ||
        v.features.some((f) => f.toLowerCase().includes(lower))
    );
  }, [vehicles, search]);

  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa xe này?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#dc2626",
      });

      if (!confirm.isConfirmed) return;

      try {
        await vehicleService.deleteVehicle(id);
        Swal.fire("Đã xóa!", "Xe đã bị xóa thành công.", "success");
        await fetchVehicles();
      } catch (err) {
        Swal.fire("Lỗi", "Không thể xóa xe", "error");
      }
    },
    [fetchVehicles]
  );

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
