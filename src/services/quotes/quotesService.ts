// src/services/quotes/quotesService.ts
import {
  Quote,
  QuoteListResponse,
  QuoteCredentials,
  QuoteUpdateRequest,
} from "@/types/quotes";
import axiosInstance from "@/utils/axiosInstance";

const endpoint = "/quotes";

export const quotesService = {
  /** Lấy danh sách quotes */
  getAllQuotes: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<QuoteListResponse> => {
    try {
      const res = await axiosInstance.get<QuoteListResponse>(endpoint, {
        params,
      });

      const data = res.data || {};
      return {
        items: data.items || [],
        total: data.total ?? 0,
        page: data.page ?? params?.page ?? 1,
        limit: data.limit ?? params?.limit ?? 10,
      };
    } catch (error: any) {
      console.error("❌ Error fetching quotes:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch quotes"
      );
    }
  },

  /** Lấy chi tiết quote theo ID */
  getQuoteById: async (id: string): Promise<Quote> => {
    try {
      const res = await axiosInstance.get<Quote>(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching quote ID ${id}:`, error);
      throw new Error(error.response?.data?.message || "Failed to fetch quote");
    }
  },

  /** Tạo quote mới */
  createQuote: async (payload: QuoteCredentials): Promise<Quote> => {
    try {
      const res = await axiosInstance.post<Quote>(endpoint, payload);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating quote:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create quote"
      );
    }
  },

  /** Cập nhật quote */
  updateQuote: async (
    id: string,
    payload: QuoteUpdateRequest
  ): Promise<Quote> => {
    try {
      const res = await axiosInstance.patch<Quote>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating quote ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update quote"
      );
    }
  },

  /** Xóa quote */
  deleteQuote: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting quote ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete quote"
      );
    }
  },
};
