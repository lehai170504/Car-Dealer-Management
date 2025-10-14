"use client";

import { useDealerManagement } from "@/hooks/useDealerManagement";
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
import { Search, Eye, Trash2, Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CreateDealerModal } from "@/components/evm/CreateDealerModal";
import { ViewDealerModal } from "@/components/evm/ViewDealerModal"; // ✅ Modal xem/chỉnh sửa chi tiết

export function EVM_DealerList() {
  const {
    filteredDealers,
    loading,
    error,
    search,
    setSearch,
    fetchDealers,
    handleDelete,
  } = useDealerManagement();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<any | null>(null);

  // Sắp xếp dealer mới nhất lên đầu
  const sortedDealers = [...filteredDealers].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      {/* Thanh tìm kiếm + nút thêm đại lý */}
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo tên, khu vực, thông tin liên hệ..."
            className="pl-10 bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-emerald-500"
          />
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm Đại lý Mới
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10 text-emerald-400">
          <Loader2 className="animate-spin h-6 w-6 mr-2" />
          Đang tải danh sách đại lý...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-400 py-6">
          ❌ Lỗi tải dữ liệu: {error}
        </div>
      )}

      {/* Bảng hiển thị */}
      {!loading && !error && (
        <div className="border border-gray-600 rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-700/80">
              <TableRow className="border-gray-600 hover:bg-gray-700/80">
                <TableHead className="w-[100px] text-gray-200 text-center">
                  STT
                </TableHead>
                <TableHead className="text-gray-200">Tên Đại lý</TableHead>
                <TableHead className="text-gray-200">Khu vực</TableHead>
                <TableHead className="text-gray-200">Thông tin liên hệ</TableHead>
                <TableHead className="text-center text-gray-200">
                  Mục tiêu (Xe)
                </TableHead>
                <TableHead className="text-center text-gray-200">
                  Công nợ (VNĐ)
                </TableHead>
                <TableHead className="text-gray-200">Trạng thái</TableHead>
                <TableHead className="text-right text-gray-200">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedDealers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-gray-400 py-6"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                sortedDealers.map((dealer, index) => (
                  <TableRow
                    key={dealer._id}
                    className="border-gray-600 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium text-gray-200">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-gray-300">{dealer.name}</TableCell>
                    <TableCell className="text-gray-300">{dealer.location}</TableCell>
                    <TableCell className="text-gray-300">
                      {dealer.contactInfo}
                    </TableCell>
                    <TableCell className="text-center text-gray-300">
                      {dealer.salesTarget}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-emerald-400">
                      {dealer.debt?.toLocaleString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Đang hoạt động
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {/* Nút Xem/Chỉnh sửa */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-emerald-400 hover:bg-gray-700 hover:border-emerald-500"
                        onClick={() => {
                          setSelectedDealer(dealer);
                          setViewModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {/* Nút Xóa */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-red-400 hover:bg-gray-700 hover:border-red-500"
                        onClick={() => handleDelete(dealer._id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal thêm đại lý */}
      <CreateDealerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDealers} // ✅ Reload sau khi thêm
      />

      {/* Modal xem/chỉnh sửa đại lý */}
      {selectedDealer && (
        <ViewDealerModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          dealer={selectedDealer}
          onUpdated={fetchDealers} // ✅ Reload sau khi update
        />
      )}
    </div>
  );
}
