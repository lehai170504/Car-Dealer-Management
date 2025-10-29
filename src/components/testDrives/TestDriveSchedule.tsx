"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTestDrives } from "@/hooks/useTestDrives";
import type { TestDrive, TestDriveStatus } from "@/types/testDrives";
import { TestDriveDetailModal } from "./TestDriveDetailModal";
import { CreateTestDriveModal } from "./CreateTestDriveModal";
import { Pagination } from "@/components/ui/pagination";

export function TestDriveSchedule() {
  const {
    filteredTestDrives,
    loading,
    error,
    page,
    setPage,
    limit,
    total,
    search,
    setSearch,
    fetchTestDrives,
    handleDelete,
    fetchTestDriveById,
  } = useTestDrives();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTestDrive, setSelectedTestDrive] = useState<TestDrive | null>(
    null
  );

  // Badge classes
  const getStatusBadgeClasses = (status: TestDriveStatus) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700";
      case "cancelled":
        return "bg-red-600/50 text-red-300 border-red-600 hover:bg-red-600/70";
      case "done":
        return "bg-sky-600/50 text-sky-300 border-sky-600 hover:bg-sky-600/70";
      default:
        return "bg-gray-600/50 text-gray-300 border-gray-700";
    }
  };

  // Xem chi tiết
  const handleViewDetail = async (drive: TestDrive) => {
    await fetchTestDriveById(drive._id);
    setSelectedTestDrive(drive);
    setShowDetailModal(true);
  };

  // Gọi lại API khi chuyển trang
  useEffect(() => {
    fetchTestDrives(page);
  }, [page, fetchTestDrives]);

  return (
    <div className="space-y-6 p-4">
      {/* Header: Search + Create */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm khách hàng, xe, trạng thái..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
        </div>

        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4" /> Tạo lịch mới
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang tải dữ
            liệu...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-6">{error}</div>
        ) : (
          <Table className="text-gray-50">
            <TableHeader className="bg-gray-700/90">
              <TableRow className="border-gray-700">
                <TableHead className="text-center font-medium w-[50px]">
                  STT
                </TableHead>
                <TableHead className="font-medium">Khách hàng</TableHead>
                <TableHead className="font-medium">Mẫu xe</TableHead>
                <TableHead className="font-medium">Thời gian</TableHead>
                <TableHead className="font-medium">Trạng thái</TableHead>
                <TableHead className="text-right font-medium">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTestDrives.length > 0 ? (
                filteredTestDrives.map((drive, index) => (
                  <TableRow
                    key={drive._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>{drive.customer}</TableCell>
                    <TableCell className="text-sky-400 font-semibold">
                      {drive.variant}
                    </TableCell>
                    <TableCell>
                      {new Date(drive.preferredTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClasses(drive.status)}>
                        {drive.status === "confirmed"
                          ? "Đã xác nhận"
                          : drive.status === "done"
                          ? "Đã hoàn thành"
                          : drive.status === "cancelled"
                          ? "Đã hủy"
                          : "Không xác định"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-sky-400 hover:bg-gray-700 bg-gray-600 hover:border-sky-500"
                        onClick={() => handleViewDetail(drive)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-red-400 bg-gray-600 hover:bg-gray-700 hover:border-red-500"
                        onClick={() => handleDelete(drive._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-400 py-6"
                  >
                    Không có lịch lái thử nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={limit}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Modals */}
      <CreateTestDriveModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onCreated={() => fetchTestDrives(page)}
      />

      {selectedTestDrive && (
        <TestDriveDetailModal
          testDrive={selectedTestDrive}
          open={showDetailModal}
          onOpenChange={setShowDetailModal}
          onUpdated={() => fetchTestDrives(page)}
        />
      )}
    </div>
  );
}
