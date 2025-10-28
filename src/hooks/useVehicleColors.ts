"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import { vehicleColorService } from "@/services/vehicleColors/vehicleColorService";
import { VehicleColor, VehicleColorListResponse } from "@/types/vehicleColors";

interface UseVehicleColorsResult {
  vehicleColors: VehicleColor[];
  filteredVehicleColors: VehicleColor[];
  selectedColor: VehicleColor | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchVehicleColors: (page?: number) => Promise<void>;
  fetchVehicleColorById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách và chi tiết Vehicle Colors */
export const useVehicleColors = (): UseVehicleColorsResult => {
  const [vehicleColors, setVehicleColors] = useState<VehicleColor[]>([]);
  const [selectedColor, setSelectedColor] = useState<VehicleColor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  /** 🔵 Lấy danh sách Vehicle Colors (phân trang) */
  const fetchVehicleColors = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);

        const res: VehicleColorListResponse =
          await vehicleColorService.getAllVehicleColors({
            page: pageNumber,
            limit,
          });

        setVehicleColors(res.items ?? []);
        setTotal(res.total ?? 0);

        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);

        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách vehicle colors:", err);
        setError(err?.message || "Không thể tải danh sách vehicle colors.");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** 🟢 Lấy chi tiết Vehicle Color theo ID */
  const fetchVehicleColorById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await vehicleColorService.getVehicleColorById(id);
      setSelectedColor(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy vehicle color ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin vehicle color.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔴 Xóa Vehicle Color */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa Vehicle Color?",
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
        await vehicleColorService.deleteVehicleColor(id);
        Swal.fire("Đã xóa!", "Vehicle Color đã bị xóa thành công.", "success");
        await fetchVehicleColors(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa vehicle color:", err);
        Swal.fire(
          "Lỗi",
          err?.message || "Không thể xóa vehicle color",
          "error"
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleColors, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredVehicleColors = useMemo(() => {
    if (!search) return vehicleColors;
    const lower = search.toLowerCase();
    return vehicleColors.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.code.toLowerCase().includes(lower) ||
        c.hex.toLowerCase().includes(lower)
    );
  }, [vehicleColors, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchVehicleColors(page);
  }, [fetchVehicleColors, page]);

  return {
    vehicleColors,
    filteredVehicleColors,
    selectedColor,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchVehicleColors,
    fetchVehicleColorById,
    handleDelete,
  };
};
