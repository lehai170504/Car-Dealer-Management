// src/hooks/useTestDrives.ts
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
  fetchTestDrives: () => Promise<void>;
  fetchTestDriveById: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

/** Hook quản lý danh sách và chi tiết Test Drives */
export const useTestDrives = (): UseTestDrivesResult => {
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
  const [selectedTestDrive, setSelectedTestDrive] = useState<TestDrive | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // === Lấy danh sách test drives ===
  const fetchTestDrives = useCallback(async () => {
    try {
      setLoading(true);
      const data = await testDriveService.getAllTestDrives();

      // Sắp xếp theo createdAt giảm dần
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setTestDrives(sorted);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách test drives:", err);
      setError(err?.message || "Không thể tải danh sách test drives từ API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // === Lấy chi tiết test drive theo ID ===
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

  // === Xóa test drive ===
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
        await fetchTestDrives();
      } catch (err: any) {
        console.error("❌ Lỗi khi xóa test drive:", err);
        Swal.fire("Lỗi", err?.message || "Không thể xóa test drive", "error");
      } finally {
        setLoading(false);
      }
    },
    [fetchTestDrives]
  );

  // === Lọc danh sách client-side ===
  const filteredTestDrives = useMemo(() => {
    if (!search) return testDrives;
    const lowercased = search.toLowerCase();
    return testDrives.filter(
      (td) =>
        td.status?.toLowerCase().includes(lowercased) ||
        td.customer?.toLowerCase().includes(lowercased) ||
        td.dealer?.toLowerCase().includes(lowercased)
    );
  }, [testDrives, search]);

  // === Gọi lần đầu ===
  useEffect(() => {
    fetchTestDrives();
  }, [fetchTestDrives]);

  return {
    testDrives,
    filteredTestDrives,
    selectedTestDrive,
    loading,
    error,
    search,
    setSearch,
    fetchTestDrives,
    fetchTestDriveById,
    handleDelete,
  };
};
