// src/hooks/useCustomer.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { Customer } from "@/types/customer";
import { customerService } from "@/services/customers/customerService";
import Swal from "sweetalert2";

interface UseCustomersResult {
  customers: Customer[];
  filteredCustomers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  fetchCustomers: () => Promise<void>;
  fetchCustomerById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export const useCustomers = (): UseCustomersResult => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // === Lấy tất cả khách hàng ===
  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await customerService.getAllCustomers();

      // Sắp xếp theo createdAt giảm dần (mới nhất lên đầu)
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setCustomers(sorted);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách khách hàng:", err);
      setError(err?.message || "Không thể tải danh sách khách hàng từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Lấy chi tiết khách hàng theo ID ===
  const fetchCustomerById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await customerService.getCustomerById(id);
      setSelectedCustomer(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy thông tin khách hàng ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin khách hàng.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Xóa khách hàng ===
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa khách hàng?",
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
        await customerService.deleteCustomer(id);
        Swal.fire("Đã xóa!", "Khách hàng đã bị xóa thành công.", "success");
        await fetchCustomers();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa khách hàng:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa khách hàng", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchCustomers]
  );

  // === Lọc danh sách client-side ===
  const filteredCustomers = useMemo(() => {
    if (!search) return customers;
    const lowercasedSearch = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.fullName.toLowerCase().includes(lowercasedSearch) ||
        c.phone.toLowerCase().includes(lowercasedSearch) ||
        c.email.toLowerCase().includes(lowercasedSearch)
    );
  }, [customers, search]);

  // === Load lần đầu ===
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    filteredCustomers,
    selectedCustomer,
    loading,
    error,
    search,
    setSearch,
    fetchCustomers,
    fetchCustomerById,
    handleDelete,
  };
};
