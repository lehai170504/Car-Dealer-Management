"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Order } from "@/types/orders";
import { orderService } from "@/services/orders/ordersService";
import Swal from "sweetalert2";

interface UseOrdersResult {
  orders: Order[];
  filteredOrders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchOrders: (page?: number) => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách và chi tiết Orders */
export const useOrders = (): UseOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  /** 🔵 Lấy danh sách orders (phân trang) */
  const fetchOrders = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);
        const res = await orderService.getAllOrders({
          page: pageNumber,
          limit,
        });

        // Sắp xếp theo createdAt giảm dần
        const sorted = [...(res.items ?? [])].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setOrders(sorted);
        setTotal(res.total ?? 0);

        // Cập nhật pagination từ server nếu có
        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);

        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách orders:", err);
        setError(err?.message || "Không thể tải danh sách orders.");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** 🟢 Lấy chi tiết order theo ID */
  const fetchOrderById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await orderService.getOrderById(id);
      setSelectedOrder(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy order ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin order.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔴 Xóa order */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa order?",
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
        await orderService.deleteOrder(id);
        Swal.fire("Đã xóa!", "Order đã bị xóa thành công.", "success");
        await fetchOrders(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa order:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa order", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchOrders, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredOrders = useMemo(() => {
    if (!search) return orders;
    const lower = search.toLowerCase();
    return orders.filter(
      (o) =>
        o.status?.toLowerCase().includes(lower) ||
        o.customer?.toLowerCase().includes(lower) ||
        o.dealer?.toLowerCase().includes(lower) ||
        o.orderNo?.toLowerCase().includes(lower)
    );
  }, [orders, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchOrders(page);
  }, [fetchOrders, page]);

  return {
    orders,
    filteredOrders,
    selectedOrder,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchOrders,
    fetchOrderById,
    handleDelete,
  };
};
