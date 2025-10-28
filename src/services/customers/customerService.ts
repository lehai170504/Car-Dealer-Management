// src/services/customers/customerService.ts
import axiosInstance from "@/utils/axiosInstance";
import {
  Customer,
  CustomerCredentials,
  CustomerListResponse,
  CustomerResponse,
} from "@/types/customer";

const endpoint = "/customers";

export const customerService = {
  /** Lấy danh sách khách hàng (trả về mảng Customer) */
  getAllCustomers: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<CustomerListResponse> => {
    try {
      const res = await axiosInstance.get<CustomerListResponse>(endpoint, {
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
      console.error("❌ Error fetching customers:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch customers"
      );
    }
  },

  /** Lấy chi tiết khách hàng theo ID */
  getCustomerById: async (id: string): Promise<Customer> => {
    try {
      const res = await axiosInstance.get<CustomerResponse>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error fetching customer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch customer"
      );
    }
  },

  /** Tạo khách hàng mới */
  createCustomer: async (payload: CustomerCredentials): Promise<Customer> => {
    try {
      const res = await axiosInstance.post<CustomerResponse>(endpoint, payload);
      return res.data;
    } catch (error: any) {
      console.error("❌ Error creating customer:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create customer"
      );
    }
  },

  /** Cập nhật khách hàng */
  updateCustomer: async (
    id: string,
    payload: Partial<CustomerCredentials>
  ): Promise<Customer> => {
    try {
      const res = await axiosInstance.patch<CustomerResponse>(
        `${endpoint}/${id}`,
        payload
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error updating customer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update customer"
      );
    }
  },

  /** Xóa khách hàng */
  deleteCustomer: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete<{ success: boolean }>(
        `${endpoint}/${id}`
      );
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting customer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete customer"
      );
    }
  },
};
