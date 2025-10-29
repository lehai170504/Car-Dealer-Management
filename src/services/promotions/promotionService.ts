import axiosInstance from "@/utils/axiosInstance";
import {
  Promotion,
  CreatePromotionRequest,
  UpdatePromotionRequest,
  PromotionListResponse,
} from "@/types/promotions";

const endpoint = "/promotions";

export const promotionService = {
  /** 🟦 Lấy tất cả promotions */
  getAllPromotions: async (): Promise<PromotionListResponse> => {
    try {
      const res = await axiosInstance.get<PromotionListResponse>(endpoint);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error fetching promotions list:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch promotions list"
      );
    }
  },

  /** 🟦 Tạo mới promotion */
  createPromotion: async (
    payload: CreatePromotionRequest
  ): Promise<Promotion> => {
    try {
      const res = await axiosInstance.post<Promotion>(endpoint, payload);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating promotion:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create promotion"
      );
    }
  },

  /** 🟦 Cập nhật promotion theo ID */
  updatePromotion: async (
    id: string,
    payload: UpdatePromotionRequest
  ): Promise<Promotion> => {
    try {
      const res = await axiosInstance.put<Promotion>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating promotion ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update promotion"
      );
    }
  },

  /** 🟦 Xóa promotion theo ID */
  deletePromotion: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data || { success: true };
    } catch (error: any) {
      console.error(`❌ Error deleting promotion ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete promotion"
      );
    }
  },
};
