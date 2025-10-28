// src/services/orders/orderService.ts
import axiosInstance from "@/utils/axiosInstance";
import {
  Order,
  OrderListResponse,
  CreateOrderRequest,
  UpdateOrderRequest,
} from "@/types/orders";

const endpoint = "/orders";

export const orderService = {
  /** 🟦 Lấy danh sách orders */
  getAllOrders: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<OrderListResponse> => {
    try {
      const res = await axiosInstance.get<OrderListResponse>(endpoint, {
        params,
      });

      // Đảm bảo dữ liệu có đủ structure
      const data = res.data || {};
      return {
        items: data.items || [],
        total: data.total ?? 0,
        page: data.page ?? params?.page ?? 1,
        limit: data.limit ?? params?.limit ?? 10,
      };
    } catch (error: any) {
      console.error("❌ Error fetching orders:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  },

  /** 🟩 Lấy chi tiết order theo ID */
  getOrderById: async (id: string): Promise<Order> => {
    try {
      const res = await axiosInstance.get<Order>(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching order ID ${id}:`, error);
      throw new Error(error.response?.data?.message || "Failed to fetch order");
    }
  },

  /** 🟢 Tạo order mới */
  createOrder: async (payload: CreateOrderRequest): Promise<Order> => {
    try {
      const res = await axiosInstance.post<Order>(endpoint, payload);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating order:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create order"
      );
    }
  },

  /** 🟡 Cập nhật order */
  updateOrder: async (
    id: string,
    payload: UpdateOrderRequest
  ): Promise<Order> => {
    try {
      const res = await axiosInstance.patch<Order>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating order ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update order"
      );
    }
  },

  /** 🔴 Xóa order */
  deleteOrder: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting order ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  },
};
