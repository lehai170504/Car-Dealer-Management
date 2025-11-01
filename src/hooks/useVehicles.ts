"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { vehicleService } from "@/services/vehicles/vehicleService";
import {
  Vehicle,
  CreateVehicleRequest,
  UpdateVehicleRequest,
} from "@/types/vehicles";

interface UseVehiclesResult {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;

  search: string;
  setSearch: (s: string) => void;

  fetchVehicles: () => Promise<void>;
  fetchVehicleById: (id: string) => Promise<void>;
  handleCreate: (payload: CreateVehicleRequest) => Promise<void>;
  handleUpdate: (id: string, payload: UpdateVehicleRequest) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleToggleStatus: (id: string, active: boolean) => Promise<void>;
  compareVehicles: (ids: string[]) => Promise<Vehicle[]>;
}

export const useVehicles = (): UseVehiclesResult => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const isFetching = useRef(false);

  /** 🔵 Lấy toàn bộ vehicles */
  const fetchVehicles = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    try {
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
      setError(err?.message || "Không thể tải danh sách vehicles.");
      toast.error("Không thể tải danh sách vehicles.");
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, []);

  /** 🟩 Lấy chi tiết vehicle */
  const fetchVehicleById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await vehicleService.getVehicleById(id);
      setSelectedVehicle(data);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy chi tiết vehicle ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin vehicle.");
      toast.error("Không thể tải thông tin vehicle.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🟢 Tạo mới vehicle */
  const handleCreate = useCallback(
    async (payload: CreateVehicleRequest) => {
      setLoading(true);
      const toastId = toast.loading("Đang tạo vehicle...");
      try {
        await vehicleService.createVehicle(payload);
        toast.success("Đã tạo vehicle mới!", { id: toastId });
        await fetchVehicles();
      } catch (err: any) {
        console.error("❌ Lỗi khi tạo vehicle:", err);
        toast.error(err?.message || "Không thể tạo vehicle.", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicles]
  );

  /** 🟡 Cập nhật vehicle */
  const handleUpdate = useCallback(
    async (id: string, payload: UpdateVehicleRequest) => {
      setLoading(true);
      const toastId = toast.loading("Đang cập nhật vehicle...");
      try {
        await vehicleService.updateVehicle(id, payload);
        toast.success("Đã cập nhật vehicle!", { id: toastId });
        await fetchVehicles();
      } catch (err: any) {
        console.error("❌ Lỗi khi cập nhật vehicle:", err);
        toast.error(err?.message || "Không thể cập nhật vehicle.", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicles]
  );

  /** 🔴 Xóa vehicle */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = window.confirm(
        "Bạn có chắc muốn xóa vehicle này? Hành động không thể hoàn tác!"
      );
      if (!confirm) return;

      setLoading(true);
      const toastId = toast.loading("Đang xóa vehicle...");
      try {
        await vehicleService.deleteVehicle(id);
        toast.success("Vehicle đã bị xóa.", { id: toastId });
        await fetchVehicles();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa vehicle:", err);
        toast.error(err?.message || "Không thể xóa vehicle.", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicles]
  );

  /** 🟣 Bật / Tắt trạng thái Active */
  const handleToggleStatus = useCallback(
    async (id: string, active: boolean) => {
      const toastId = toast.loading(
        `Đang ${active ? "kích hoạt" : "ngưng hoạt động"} vehicle...`
      );
      try {
        await handleUpdate(id, { active });
        toast.success(
          `Vehicle đã được ${active ? "kích hoạt" : "ngưng hoạt động"}.`,
          { id: toastId }
        );
      } catch (err: any) {
        console.error("❌ Lỗi khi cập nhật trạng thái vehicle:", err);
        toast.error("Không thể cập nhật trạng thái vehicle.", { id: toastId });
      }
    },
    [handleUpdate]
  );

  /** 🟣 So sánh nhiều vehicle */
  const compareVehicles = useCallback(async (ids: string[]) => {
    try {
      return await vehicleService.compareVehicles(ids);
    } catch (err: any) {
      console.error(`❌ Lỗi khi so sánh vehicles [${ids.join(", ")}]:`, err);
      toast.error(err?.message || "Không thể so sánh vehicles.");
      return [];
    }
  }, []);

  /** 🔍 Lọc danh sách client-side */
  const filteredVehicles = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return vehicles;
    return vehicles.filter((v) => {
      const modelName = v.model?.name || "";
      const brand = v.model?.brand || "";
      return (
        modelName.toLowerCase().includes(q) ||
        brand.toLowerCase().includes(q) ||
        v.trim.toLowerCase().includes(q) ||
        v.battery.toLowerCase().includes(q)
      );
    });
  }, [vehicles, search]);

  /** 🪄 Gọi danh sách khi mount */
  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    filteredVehicles,
    selectedVehicle,
    loading,
    error,
    search,
    setSearch,
    fetchVehicles,
    fetchVehicleById,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggleStatus,
    compareVehicles,
  };
};
