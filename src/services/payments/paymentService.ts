// src/services/payments/paymentService.ts
import axiosInstance from "@/utils/axiosInstance";
import {
  Payment,
  PaymentListResponse,
  CreatePaymentRequest,
  UpdatePaymentRequest,
} from "@/types/payments";

const endpoint = "/payments";

export const paymentService = {
  /** 🟦 Lấy danh sách payments (hỗ trợ phân trang) */
  getAllPayments: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<PaymentListResponse> => {
    try {
      const res = await axiosInstance.get<PaymentListResponse>(endpoint, {
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
      console.error("❌ Error fetching payments:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch payments"
      );
    }
  },

  /** 🟩 Lấy chi tiết payment theo ID */
  getPaymentById: async (id: string): Promise<Payment> => {
    try {
      const res = await axiosInstance.get<Payment>(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching payment ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch payment"
      );
    }
  },

  /** 🟢 Tạo payment mới */
  createPayment: async (payload: CreatePaymentRequest): Promise<Payment> => {
    try {
      const res = await axiosInstance.post<Payment>(endpoint, payload);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating payment:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create payment"
      );
    }
  },

  /** 🟡 Cập nhật payment */
  updatePayment: async (
    id: string,
    payload: UpdatePaymentRequest
  ): Promise<Payment> => {
    try {
      const res = await axiosInstance.patch<Payment>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating payment ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update payment"
      );
    }
  },

  /** 🔴 Xóa payment */
  deletePayment: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting payment ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete payment"
      );
    }
  },
};
