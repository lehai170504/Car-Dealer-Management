// src/hooks/useOrders.ts
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
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** Hook quản lý danh sách và chi tiết Orders */
export const useOrders = (): UseOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // === Lấy danh sách orders ===
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await orderService.getAllOrders();

      // Sắp xếp theo createdAt giảm dần
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setOrders(sorted);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách orders:", err);
      setError(err?.message || "Không thể tải danh sách orders từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Lấy chi tiết order theo ID ===
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

  // === Xóa order ===
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
        await fetchOrders();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa order:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa order", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchOrders]
  );

  // === Lọc danh sách client-side ===
  const filteredOrders = useMemo(() => {
    if (!search) return orders;
    const lowercased = search.toLowerCase();
    return orders.filter(
      (o) =>
        o.status.toLowerCase().includes(lowercased) ||
        o.customer.toLowerCase().includes(lowercased) ||
        o.dealer.toLowerCase().includes(lowercased) ||
        o.orderNo.toLowerCase().includes(lowercased)
    );
  }, [orders, search]);

  // === Gọi lần đầu ===
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    filteredOrders,
    selectedOrder,
    loading,
    error,
    search,
    setSearch,
    fetchOrders,
    fetchOrderById,
    handleDelete,
  };
};
