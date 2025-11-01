"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Dealer, DealerInventory, UpdateDealerRequest } from "@/types/dealer";
import { dealerService } from "@/services/dealers/dealerService";
import { toast } from "sonner";

interface UseDealersResult {
  dealers: Dealer[];
  filteredDealers: Dealer[];
  selectedDealer: Dealer | null;
  dealerInventory: DealerInventory[];
  loading: boolean;
  inventoryLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  fetchDealers: () => Promise<void>;
  fetchDealerById: (id: string) => Promise<void>;
  fetchDealerInventory: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleToggleStatus: (
    id: string,
    status: "active" | "inactive"
  ) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách Dealer + Inventory */
export const useDealers = (): UseDealersResult => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [dealerInventory, setDealerInventory] = useState<DealerInventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  /** 🔵 Lấy danh sách dealers */
  const fetchDealers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dealerService.getAllDealers();
      setDealers(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách dealers:", err);
      setError(err?.message || "Không thể tải danh sách dealers.");
      toast.error(err?.message || "Không thể tải danh sách dealers.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🟢 Lấy chi tiết dealer theo ID */
  const fetchDealerById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await dealerService.getDealerById(id);
      setSelectedDealer(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy dealer ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin dealer.");
      toast.error(err?.message || "Không thể tải thông tin dealer.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🟣 Lấy inventory dealer theo ID */
  const fetchDealerInventory = useCallback(async (id: string) => {
    try {
      setInventoryLoading(true); // ✅ dùng riêng
      const data = await dealerService.getDealerInventory(id);
      setDealerInventory(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy inventory dealer ID ${id}:`, err);
      setError(err?.message || "Không thể tải inventory dealer.");
      toast.error(err?.message || "Không thể tải inventory dealer.");
    } finally {
      setInventoryLoading(false); // ✅ kết thúc riêng
    }
  }, []);

  /** 🔴 Xóa dealer */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = window.confirm(
        "Xóa đại lý? Hành động này không thể hoàn tác!"
      );
      if (!confirm) return;

      try {
        setLoading(true);
        await dealerService.deleteDealer(id);
        toast.success("Đại lý đã bị xóa thành công.");
        await fetchDealers();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa đại lí:", err);
        toast.error(err?.message || "Không thể xóa đại lý");
      } finally {
        setLoading(false);
      }
    },
    [fetchDealers]
  );

  /** 🟠 Toggle status dealer */
  /** 🟠 Toggle status dealer - Optimistic Update */
  const handleToggleStatus = useCallback(
    async (id: string, newStatus: "active" | "inactive") => {
      try {
        setLoading(true);

        // 🔹 Optimistic UI: cập nhật local state ngay
        setDealers((prev) =>
          prev.map((dealer) =>
            dealer._id === id ? { ...dealer, status: newStatus } : dealer
          )
        );

        const payload: UpdateDealerRequest = { status: newStatus };
        await dealerService.updateDealer(id, payload);

        const statusLabel =
          newStatus === "active" ? "đang hoạt động" : "ngưng hoạt động";
        toast.success(`Đại lý đã được chuyển sang trạng thái ${statusLabel}.`);

        // 🔹 Đồng bộ lại với server (tùy chọn, đảm bảo dữ liệu chính xác)
        await fetchDealers();
      } catch (err: any) {
        console.error(`❌ Lỗi khi cập nhật status dealer ID ${id}:`, err);
        toast.error(err?.message || "Không thể cập nhật trạng thái đại lý.");

        // 🔹 Revert trạng thái cũ nếu API lỗi
        setDealers((prev) =>
          prev.map((dealer) =>
            dealer._id === id
              ? {
                  ...dealer,
                  status: newStatus === "active" ? "inactive" : "active",
                }
              : dealer
          )
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchDealers]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredDealers = useMemo(() => {
    if (!search) return dealers;
    const lower = search.toLowerCase();
    return dealers.filter(
      (d) =>
        d.name.toLowerCase().includes(lower) ||
        d.region.toLowerCase().includes(lower) ||
        d.address.toLowerCase().includes(lower) ||
        d.contacts?.some(
          (c) =>
            c.name.toLowerCase().includes(lower) ||
            c.phone.toLowerCase().includes(lower) ||
            c.email.toLowerCase().includes(lower)
        )
    );
  }, [dealers, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  return {
    dealers,
    filteredDealers,
    selectedDealer,
    dealerInventory,
    loading,
    inventoryLoading, // ✅ trả về riêng
    error,
    search,
    setSearch,
    fetchDealers,
    fetchDealerById,
    fetchDealerInventory,
    handleDelete,
    handleToggleStatus,
  };
};
