import axiosInstance from "@/utils/axiosInstance";
import { Customer } from "@/types/customer";

const endpoint = "/customers";

export const customerService = {
  /** Get all customers */
  getAllCustomers: async (): Promise<Customer[]> => {
    try {
      const res = await axiosInstance.get(endpoint);
      return res.data?.data || [];
    } catch (error: any) {
      console.error("❌ Error fetching customers:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch customers"
      );
    }
  },

  /** Get customer by ID */
  getCustomerById: async (id: string): Promise<Customer> => {
    try {
      const res = await axiosInstance.get(`${endpoint}/${id}`);
      return res.data?.data;
    } catch (error: any) {
      console.error(`❌ Error fetching customer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch customer"
      );
    }
  },

  /** Create new customer */
  createCustomer: async (
    payload: Omit<Customer, "_id" | "createdAt" | "updatedAt">
  ): Promise<Customer> => {
    try {
      const res = await axiosInstance.post(endpoint, payload);
      return res.data?.data;
    } catch (error: any) {
      console.error("❌ Error creating customer:", error);
      throw new Error(
        error.response?.data?.message || "Failed to create customer"
      );
    }
  },

  /** Update customer */
  updateCustomer: async (
    id: string,
    payload: Partial<Omit<Customer, "_id" | "createdAt" | "updatedAt">>
  ): Promise<Customer> => {
    try {
      const res = await axiosInstance.put(`${endpoint}/${id}`, payload);
      return res.data?.data;
    } catch (error: any) {
      console.error(`❌ Error updating customer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to update customer"
      );
    }
  },

  /** Delete customer */
  deleteCustomer: async (id: string): Promise<{ success: boolean }> => {
    try {
      const res = await axiosInstance.delete(`${endpoint}/${id}`);
      return res.data;
    } catch (error: any) {
      console.error(`❌ Error deleting customer ID ${id}:`, error);
      throw new Error(
        error.response?.data?.message || "Failed to delete customer"
      );
    }
  },
};
