"use client";

import { useState } from "react";
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
import { Loader2, Eye, Plus } from "lucide-react";
import { useTestDrives } from "@/hooks/useTestDrives";
import type { TestDrive, TestDriveStatus } from "@/types/testDrives";
import { TestDriveDetailModal } from "./TestDriveDetailModal";
import { CreateTestDriveModal } from "./CreateTestDriveModal";

export function TestDriveSchedule() {
  const {
    testDrives,
    loading,
    error,
    fetchTestDrives,
    fetchTestDriveById,
    selectedTestDrive,
  } = useTestDrives();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  /** Badge styling */
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

  /** Xem chi tiết */
  const handleViewDetail = async (drive: TestDrive) => {
    await fetchTestDriveById(drive._id);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header + Tạo mới */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">
          📅 Lịch hẹn lái thử
        </h2>
        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white flex items-center space-x-2"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Tạo mới</span>
        </Button>
      </div>

      {/* Bảng lịch hẹn */}
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Đang tải dữ liệu lịch hẹn...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-6">{error}</div>
        ) : (
          <Table className="text-gray-50">
            <TableHeader className="bg-gray-700/90">
              <TableRow className="border-gray-700">
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
              {testDrives.length > 0 ? (
                testDrives.map((drive) => (
                  <TableRow
                    key={drive._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
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
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2"
                        onClick={() => handleViewDetail(drive)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
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

      {/* Modal Chi tiết */}
      {selectedTestDrive && (
        <TestDriveDetailModal
          testDrive={selectedTestDrive}
          open={showDetailModal}
          onOpenChange={setShowDetailModal}
          onUpdated={fetchTestDrives}
        />
      )}

      {/* Modal Tạo mới */}
      <CreateTestDriveModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onCreated={fetchTestDrives}
      />
    </div>
  );
}
