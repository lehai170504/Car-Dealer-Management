"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { vehicleColorService } from "@/services/vehicleColors/vehicleColorService";
import {
  VehicleColor,
  CreateVehicleColorRequest,
  UpdateVehicleColorRequest,
} from "@/types/vehicleColors";

/** 🧩 Kết quả trả về của hook */
interface UseVehicleColorsResult {
  vehicleColors: VehicleColor[];
  filteredVehicleColors: VehicleColor[];
  selectedColor: VehicleColor | null;
  loading: boolean;
  error: string | null;

  search: string;
  setSearch: (s: string) => void;

  fetchVehicleColors: () => Promise<void>;
  fetchVehicleColorById: (id: string) => Promise<void>;
  handleCreate: (payload: CreateVehicleColorRequest) => Promise<void>;
  handleUpdate: (
    id: string,
    payload: UpdateVehicleColorRequest
  ) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleToggleStatus: (id: string, active: boolean) => Promise<void>;
}

export const useVehicleColors = (): UseVehicleColorsResult => {
  const [vehicleColors, setVehicleColors] = useState<VehicleColor[]>([]);
  const [selectedColor, setSelectedColor] = useState<VehicleColor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const isFetching = useRef(false);

  /** 🔵 Lấy toàn bộ danh sách Vehicle Colors */
  const fetchVehicleColors = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    try {
      const data = await vehicleColorService.getAllVehicleColors();
      setVehicleColors(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách vehicle colors:", err);
      setError(err?.message || "Không thể tải danh sách vehicle colors.");
      toast.error("Không thể tải danh sách vehicle colors.");
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, []);

  /** 🟢 Lấy chi tiết Vehicle Color theo ID */
  const fetchVehicleColorById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await vehicleColorService.getVehicleColorById(id);
      setSelectedColor(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy vehicle color ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin vehicle color.");
      toast.error("Không thể tải thông tin vehicle color.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🟢 Tạo Vehicle Color mới */
  const handleCreate = useCallback(
    async (payload: CreateVehicleColorRequest) => {
      setLoading(true);
      const toastId = toast.loading("Đang tạo màu xe...");
      try {
        await vehicleColorService.createVehicleColor(payload);
        toast.success("Đã tạo màu xe mới!", { id: toastId });
        await fetchVehicleColors();
      } catch (err: any) {
        console.error("❌ Lỗi khi tạo màu xe:", err);
        toast.error(err?.message || "Không thể tạo màu xe mới.", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleColors]
  );

  /** 🟡 Cập nhật Vehicle Color */
  const handleUpdate = useCallback(
    async (id: string, payload: UpdateVehicleColorRequest) => {
      setLoading(true);
      const toastId = toast.loading("Đang cập nhật màu xe...");
      try {
        await vehicleColorService.updateVehicleColor(id, payload);
        toast.success("Đã cập nhật màu xe!", { id: toastId });
        await fetchVehicleColors();
      } catch (err: any) {
        console.error(`❌ Lỗi khi cập nhật màu xe ID ${id}:`, err);
        toast.error(err?.message || "Không thể cập nhật màu xe.", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleColors]
  );

  /** 🔴 Xóa Vehicle Color */
  const handleDelete = useCallback(
    async (id: string) => {
      const toastId = toast.loading("Đang xóa màu xe...");
      setLoading(true);
      try {
        await vehicleColorService.deleteVehicleColor(id);
        toast.success("Màu xe đã bị xóa.", { id: toastId });
        await fetchVehicleColors();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa màu xe:", err);
        toast.error(err?.message || "Không thể xóa màu xe.", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleColors]
  );

  /** 🟣 Chuyển trạng thái Active / Inactive */
  const handleToggleStatus = useCallback(
    async (id: string, active: boolean) => {
      const toastId = toast.loading(
        `Đang ${active ? "kích hoạt" : "ngưng hoạt động"} màu xe...`
      );
      try {
        await handleUpdate(id, { active });
        toast.success(
          `Màu xe đã được ${active ? "kích hoạt" : "ngưng hoạt động"}.`,
          { id: toastId }
        );
      } catch (err: any) {
        console.error("❌ Lỗi khi đổi trạng thái màu xe:", err);
        toast.error("Không thể đổi trạng thái màu xe.", { id: toastId });
      }
    },
    [handleUpdate]
  );

  /** 🔍 Lọc danh sách client-side */
  const filteredVehicleColors = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return vehicleColors;
    return vehicleColors.filter((c) =>
      [c.name, c.code, c.hex]
        .filter(Boolean)
        .some((f) => f!.toLowerCase().includes(q))
    );
  }, [vehicleColors, search]);

  /** 🪄 Gọi danh sách khi mount */
  useEffect(() => {
    fetchVehicleColors();
  }, [fetchVehicleColors]);

  return {
    vehicleColors,
    filteredVehicleColors,
    selectedColor,
    loading,
    error,
    search,
    setSearch,
    fetchVehicleColors,
    fetchVehicleColorById,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggleStatus,
  };
};
