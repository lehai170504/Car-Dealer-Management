"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { vehicleModelService } from "@/services/vehicleModels/vehicleModelService";
import {
  VehicleModel,
  CreateVehicleModelRequest,
  UpdateVehicleModelRequest,
} from "@/types/vehicleModels";

/** 🧩 Kết quả trả về của hook */
interface UseVehicleModelsResult {
  vehicleModels: VehicleModel[];
  filteredVehicleModels: VehicleModel[];
  selectedModel: VehicleModel | null;
  loading: boolean;
  error: string | null;

  search: string;
  setSearch: (s: string) => void;

  fetchVehicleModels: () => Promise<void>;
  fetchVehicleModelById: (id: string) => Promise<void>;
  handleCreate: (payload: CreateVehicleModelRequest) => Promise<void>;
  handleUpdate: (
    id: string,
    payload: UpdateVehicleModelRequest
  ) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;

  /** 🟣 Cập nhật trạng thái mẫu xe (Active / Inactive) */
  handleToggleStatus: (id: string, active: boolean) => Promise<void>;
}

/** 🧠 Hook quản lý CRUD cho Mẫu Xe */
export const useVehicleModels = (): UseVehicleModelsResult => {
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const isFetching = useRef(false);

  /** 🔵 Lấy toàn bộ danh sách mẫu xe */
  const fetchVehicleModels = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    try {
      const data = await vehicleModelService.getAllVehicleModels();
      setVehicleModels(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách mẫu xe:", err);
      setError(err?.message || "Không thể tải danh sách mẫu xe.");
      toast.error("Không thể tải danh sách mẫu xe.");
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, []);

  /** 🟩 Lấy chi tiết mẫu xe */
  const fetchVehicleModelById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await vehicleModelService.getDetailVehicleModel(id);
      setSelectedModel(data);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy chi tiết mẫu xe ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin mẫu xe.");
      toast.error("Không thể tải thông tin mẫu xe.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🟢 Tạo mới mẫu xe */
  const handleCreate = useCallback(
    async (payload: CreateVehicleModelRequest) => {
      setLoading(true);
      const toastId = toast.loading("Đang tạo mẫu xe...");
      try {
        await vehicleModelService.createVehicleModel(payload);
        toast.success("Đã tạo mẫu xe mới!", { id: toastId });
        await fetchVehicleModels();
      } catch (err: any) {
        console.error("❌ Lỗi khi tạo mẫu xe:", err);
        toast.error(err?.message || "Không thể tạo mẫu xe mới.", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleModels]
  );

  /** 🟡 Cập nhật mẫu xe */
  const handleUpdate = useCallback(
    async (id: string, payload: UpdateVehicleModelRequest) => {
      setLoading(true);
      const toastId = toast.loading("Đang cập nhật mẫu xe...");
      try {
        await vehicleModelService.updateVehicleModel(id, payload);
        toast.success("Đã cập nhật mẫu xe!", { id: toastId });
        await fetchVehicleModels();
      } catch (err: any) {
        console.error("❌ Lỗi khi cập nhật mẫu xe:", err);
        toast.error(err?.message || "Không thể cập nhật mẫu xe.", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleModels]
  );

  /** 🟣 Cập nhật trạng thái mẫu xe (Active / Inactive) */
  const handleToggleStatus = useCallback(
    async (id: string, active: boolean) => {
      const toastId = toast.loading("Đang cập nhật trạng thái mẫu xe...");
      try {
        await handleUpdate(id, { active });
        toast.success(
          `Mẫu xe đã được ${active ? "kích hoạt" : "ngưng hoạt động"}.`,
          { id: toastId }
        );
      } catch (err: any) {
        console.error("❌ Lỗi khi cập nhật trạng thái mẫu xe:", err);
        toast.error("Không thể cập nhật trạng thái mẫu xe.", { id: toastId });
      }
    },
    [handleUpdate]
  );

  /** 🔴 Xóa mẫu xe */
  const handleDelete = useCallback(
    async (id: string) => {
      toast.warning("Đang xóa mẫu xe...");
      setLoading(true);
      try {
        await vehicleModelService.deleteVehicleModel(id);
        toast.success("Mẫu xe đã bị xóa.");
        await fetchVehicleModels();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa mẫu xe:", err);
        toast.error(err?.message || "Không thể xóa mẫu xe.");
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleModels]
  );

  /** 🔍 Lọc danh sách client-side */
  const filteredVehicleModels = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return vehicleModels;
    return vehicleModels.filter((m) =>
      [m.name, m.brand, m.segment, m.description]
        .filter(Boolean)
        .some((f) => f!.toLowerCase().includes(q))
    );
  }, [vehicleModels, search]);

  /** 🪄 Gọi danh sách khi mount */
  useEffect(() => {
    fetchVehicleModels();
  }, [fetchVehicleModels]);

  return {
    vehicleModels,
    filteredVehicleModels,
    selectedModel,
    loading,
    error,
    search,
    setSearch,
    fetchVehicleModels,
    fetchVehicleModelById,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggleStatus,
  };
};
