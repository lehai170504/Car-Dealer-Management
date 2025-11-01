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
      console.error("❌ Lỗi khi lấy danh sách khuyến mãi:", error);
      throw new Error(
        error.response?.data?.message || "Không thể lấy danh sách khuyến mãi"
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
      console.error("❌ Lỗi khi tạo khuyến mãi mới:", error);
      throw new Error(
        error.response?.data?.message || "Không thể tạo khuyến mãi mới"
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
      console.error(`❌ Lỗi khi cập nhật khuyến mãi ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Không thể cập nhật khuyến mãi"
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
      console.error(`❌ Lỗi khi xóa khuyến mãi ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Không thể xóa khuyến mãi"
      );
    }
  },
};
