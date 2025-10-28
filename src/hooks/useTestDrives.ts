"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { TestDrive } from "@/types/testDrives";
import { testDriveService } from "@/services/testDrives/testDriveService";
import Swal from "sweetalert2";

interface UseTestDrivesResult {
  testDrives: TestDrive[];
  filteredTestDrives: TestDrive[];
  selectedTestDrive: TestDrive | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;

  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;

  fetchTestDrives: (page?: number) => Promise<void>;
  fetchTestDriveById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** 🧩 Hook quản lý danh sách và chi tiết Test Drives */
export const useTestDrives = (): UseTestDrivesResult => {
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
  const [selectedTestDrive, setSelectedTestDrive] = useState<TestDrive | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  /** 🔵 Lấy danh sách test drives (phân trang) */
  const fetchTestDrives = useCallback(
    async (pageNumber: number = page) => {
      try {
        setLoading(true);
        const res = await testDriveService.getAllTestDrives({
          page: pageNumber,
          limit,
        });

        // Sắp xếp theo createdAt giảm dần
        const sorted = (res.items ?? []).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setTestDrives(sorted);
        setTotal(res.total ?? 0);

        if (typeof res.page === "number") setPage(res.page);
        if (typeof res.limit === "number") setLimit(res.limit);

        setError(null);
      } catch (err: any) {
        console.error("❌ Lỗi khi tải danh sách test drives:", err);
        setError(err?.message || "Không thể tải danh sách test drives.");
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  /** 🟢 Lấy chi tiết test drive theo ID */
  const fetchTestDriveById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await testDriveService.getTestDriveById(id);
      setSelectedTestDrive(data);
      setError(null);
    } catch (err: any) {
      console.error(`❌ Lỗi khi lấy test drive ID ${id}:`, err);
      setError(err?.message || "Không thể tải thông tin test drive.");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🔴 Xóa test drive */
  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = await Swal.fire({
        title: "Xóa test drive?",
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
        await testDriveService.deleteTestDrive(id);
        Swal.fire("Đã xóa!", "Test drive đã bị xóa thành công.", "success");
        await fetchTestDrives(page);
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa test drive:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa test drive", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchTestDrives, page]
  );

  /** 🧮 Lọc danh sách client-side */
  const filteredTestDrives = useMemo(() => {
    if (!search) return testDrives;
    const lower = search.toLowerCase();
    return testDrives.filter(
      (td) =>
        td.status?.toLowerCase().includes(lower) ||
        td.customer?.toLowerCase().includes(lower) ||
        td.dealer?.toLowerCase().includes(lower)
    );
  }, [testDrives, search]);

  /** 🪄 Gọi lần đầu */
  useEffect(() => {
    fetchTestDrives(page);
  }, [fetchTestDrives, page]);

  return {
    testDrives,
    filteredTestDrives,
    selectedTestDrive,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    total,
    fetchTestDrives,
    fetchTestDriveById,
    handleDelete,
  };
};
