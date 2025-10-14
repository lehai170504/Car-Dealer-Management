// src/hooks/useCustomer.ts

import { useState, useEffect, useCallback, useMemo } from "react";
import { Customer } from "@/types/customer"; 
import { customerService } from "@/services/customers/customerService"; 
import Swal from "sweetalert2";

interface UseCustomersResult {
  customers: Customer[];
  filteredCustomers: Customer[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  fetchCustomers: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export const useCustomers = (): UseCustomersResult => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // === 1. Hàm Tải Dữ liệu (Dùng useCallback để ổn định) ===
  const fetchCustomers = useCallback(async () => {
    try {   
      setLoading(true);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách khách hàng:", err);
      setError(err.message || "Không thể tải danh sách khách hàng từ API.");
    } finally {
      setLoading(false);
    }
  }, []); 

  // === 2. Xử lý Xóa Khách hàng ===
  const handleDelete = useCallback(async (id: string) => {
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
      await customerService.deleteCustomer(id);
      Swal.fire("Đã xóa!", "Khách hàng đã bị xóa thành công.", "success");
      await fetchCustomers();
    } catch (err) {
      Swal.fire("Lỗi", "Không thể xóa khách hàng", "error");
    }
  }, [fetchCustomers]);

  // === 3. Xử lý Lọc Client-Side (Dùng useMemo để tối ưu) ===
  const filteredCustomers = useMemo(() => {
    if (!search) return customers;
    const lowercasedSearch = search.toLowerCase();
    
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(lowercasedSearch) ||
        c.phone.toLowerCase().includes(lowercasedSearch) ||
        c.email.toLowerCase().includes(lowercasedSearch)
    );
  }, [customers, search]);


  // === 4. Tải dữ liệu lần đầu (useEffect) ===
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]); 
  return {
    customers,
    filteredCustomers,
    loading,
    error,
    search,
    setSearch,
    fetchCustomers,
    handleDelete,
  };
};