// src/services/testDrives/testDriveService.ts
import axiosInstance from "@/utils/axiosInstance";
import {
  TestDrive,
  TestDriveListResponse,
  CreateTestDriveRequest,
  UpdateTestDriveRequest,
} from "@/types/testDrives";

const endpoint = "/test-drives";

export const testDriveService = {
  /** 🟦 Lấy danh sách test drives */
  getAllTestDrives: async (): Promise<TestDrive[]> => {
    try {
      const res = await axiosInstance.get<TestDriveListResponse>(endpoint);
      return res.data?.items || [];
    } catch (error: any) {
      console.error("❌ Error fetching test drives:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch test drives"
      );
    }
  },

  /** 🟩 Lấy chi tiết test drive theo ID */
  getTestDriveById: async (id: string): Promise<TestDrive> => {
    try {
      const res = await axiosInstance.get<TestDrive>(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching test drive ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch test drive"
      );
    }
  },

  /** 🟢 Tạo test drive mới */
  createTestDrive: async (
    payload: CreateTestDriveRequest
  ): Promise<TestDrive> => {
    try {
      const res = await axiosInstance.post<TestDrive>(endpoint, payload);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating test drive:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create test drive"
      );
    }
  },

  /** 🟡 Cập nhật test drive */
  updateTestDrive: async (
    id: string,
    payload: UpdateTestDriveRequest
  ): Promise<TestDrive> => {
    try {
      const res = await axiosInstance.patch<TestDrive>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating test drive ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update test drive"
      );
    }
  },

  /** 🔴 Xóa test drive */
  deleteTestDrive: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting test drive ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete test drive"
      );
    }
  },
};
