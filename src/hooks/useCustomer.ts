"use client";

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

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchCustomers: (page?: number) => Promise<void>;
  fetchCustomerById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách và chi tiết Customers */
export const useCustomers = (): UseCustomersResult => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  /** 🔵 Lấy danh sách khách hàng (phân trang) */
  const fetchCustomers = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);
        const res = await customerService.getAllCustomers({
          page: pageNumber,
          limit,
        });

        // Sắp xếp theo createdAt giảm dần
        const sorted = (res.items ?? []).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setCustomers(sorted);
        setTotal(res.total ?? 0);

        // Cập nhật page/limit từ BE nếu có
        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);

        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách khách hàng:", err);
        setError(err?.message || "Không thể tải danh sách khách hàng.");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** 🟢 Lấy chi tiết khách hàng theo ID */
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

  /** 🔴 Xóa khách hàng */
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
        await fetchCustomers(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa khách hàng:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa khách hàng", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchCustomers, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredCustomers = useMemo(() => {
    if (!search) return customers;
    const lower = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.fullName.toLowerCase().includes(lower) ||
        c.phone.toLowerCase().includes(lower) ||
        c.email.toLowerCase().includes(lower)
    );
  }, [customers, search]);

  /** 🪄 Load lần đầu */
  useEffect(() => {
    fetchCustomers(page);
  }, [fetchCustomers, page]);

  return {
    customers,
    filteredCustomers,
    selectedCustomer,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchCustomers,
    fetchCustomerById,
    handleDelete,
  };
};
