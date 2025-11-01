// src/services/userService.ts
import axiosInstance from "@/utils/axiosInstance";
import { User } from "@/types/users";

const endpoint = "/users";

export const userService = {
  /** 🟦 Lấy danh sách user */
  getUsers: async (): Promise<User[]> => {
    try {
      const res = await axiosInstance.get<User[]>(endpoint);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error fetching users:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to fetch users"
      );
    }
  },

  /** 🟦 Cập nhật thông tin user */
  updateUser: async (id: string, payload: Partial<User>): Promise<User> => {
    try {
      const res = await axiosInstance.put<{ data: User }>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data.data; // trả thẳng object user
    } catch (error: any) {
      console.error("❌ Error updating user:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to update user"
      );
    }
  },

  /** 🟦 Xóa user */
  deleteUser: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`${endpoint}/${id}`);
    } catch (error: any) {
      console.error("❌ Error deleting user:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to delete user"
      );
    }
  },
};
