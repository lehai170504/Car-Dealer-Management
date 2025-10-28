"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import { vehicleModelService } from "@/services/vehicleModels/vehicleModelService";
import { VehicleModel, VehicleModelListResponse } from "@/types/vehicleModels";

interface UseVehicleModelsResult {
  vehicleModels: VehicleModel[];
  filteredVehicleModels: VehicleModel[];
  selectedModel: VehicleModel | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchVehicleModels: (page?: number) => Promise<void>;
  fetchVehicleModelById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách và chi tiết Vehicle Models */
export const useVehicleModels = (): UseVehicleModelsResult => {
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  /** 🔵 Lấy danh sách Vehicle Models (phân trang) */
  const fetchVehicleModels = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);

        const res: VehicleModelListResponse =
          await vehicleModelService.getAllVehicleModels({
            page: pageNumber,
            limit,
          });

        setVehicleModels(res.items ?? []);
        setTotal(res.total ?? 0);

        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);

        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách vehicle models:", err);
        setError(err?.message || "Không thể tải danh sách vehicle models.");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** 🟢 Lấy chi tiết Vehicle Model theo ID */
  const fetchVehicleModelById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await vehicleModelService.getVehicleModelById(id);
      setSelectedModel(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy vehicle model ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin vehicle model.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔴 Xóa Vehicle Model */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa Vehicle Model?",
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
        await vehicleModelService.deleteVehicleModel(id);
        Swal.fire("Đã xóa!", "Vehicle Model đã bị xóa thành công.", "success");
        await fetchVehicleModels(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa vehicle model:", err);
        Swal.fire(
          "Lỗi",
          err?.message || "Không thể xóa vehicle model",
          "error"
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleModels, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredVehicleModels = useMemo(() => {
    if (!search) return vehicleModels;
    const lower = search.toLowerCase();
    return vehicleModels.filter(
      (m) =>
        m.name.toLowerCase().includes(lower) ||
        m.brand.toLowerCase().includes(lower) ||
        m.segment.toLowerCase().includes(lower) ||
        m.description?.toLowerCase().includes(lower)
    );
  }, [vehicleModels, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchVehicleModels(page);
  }, [fetchVehicleModels, page]);

  return {
    vehicleModels,
    filteredVehicleModels,
    selectedModel,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchVehicleModels,
    fetchVehicleModelById,
    handleDelete,
  };
};
