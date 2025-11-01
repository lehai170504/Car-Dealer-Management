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
import { Button } from "@/components/ui/button";
import { Search, Eye, Trash2, Plus, Pencil, Box } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateDealerModal } from "@/components/dealers/CreateDealerModal";
import { ViewDealerModal } from "@/components/dealers/ViewDealerModal";
import { UpdateDealerTargetModal } from "@/components/dealers/UpdateDealerTargetModal";
import { DealerInventoryModal } from "@/components/dealers/DealerInventoryModal";
import { Dealer } from "@/types/dealer";
import { useDealers } from "@/hooks/useDealers";
import { Pagination } from "@/components/ui/pagination";
import { useAuth } from "@/context/AuthContext";

export function DealerTable() {
  const { user } = useAuth();
  const canEdit = user?.role === "Admin" || user?.role === "DealerManager";

  const {
    filteredDealers,
    loading,
    error,
    search,
    setSearch,
    fetchDealers,
    handleDelete,
    handleToggleStatus,
    fetchDealerInventory,
    dealerInventory,
    inventoryLoading,
  } = useDealers();

  const [page, setPage] = useState(1);
  const limit = 10;
  const total = filteredDealers.length;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  const [targetModalOpen, setTargetModalOpen] = useState(false);
  const [selectedDealerForTarget, setSelectedDealerForTarget] =
    useState<Dealer | null>(null);

  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [selectedDealerForInventory, setSelectedDealerForInventory] =
    useState<Dealer | null>(null);

  const paginatedDealers = filteredDealers.slice(
    (page - 1) * limit,
    page * limit
  );

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo tên, khu vực, liên hệ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Chỉ hiện nút tạo khi có quyền */}
        {canEdit && (
          <Button
            className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4" /> Thêm Đại lý Mới
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Box className="mr-2 h-5 w-5 animate-spin" />
            Đang tải dữ liệu đại lý...
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
                <TableHead className="font-medium">Tên đại lý</TableHead>
                <TableHead className="font-medium">Khu vực</TableHead>
                <TableHead className="font-medium">Thông tin liên hệ</TableHead>
                <TableHead className="text-center font-medium">
                  Credit Limit (VNĐ)
                </TableHead>
                <TableHead className="font-medium">Trạng thái</TableHead>
                <TableHead className="text-right font-medium">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedDealers.length > 0 ? (
                paginatedDealers.map((dealer, index) => (
                  <TableRow
                    key={dealer._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>{dealer.name}</TableCell>
                    <TableCell>{dealer.region}</TableCell>
                    <TableCell>
                      {dealer.contacts
                        ?.map((c) => `${c.name} (${c.phone})`)
                        .join(", ")}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-emerald-400">
                      {dealer.creditLimit?.toLocaleString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      {canEdit ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className={`text-white ${
                            dealer.status === "active"
                              ? "bg-emerald-600"
                              : "bg-gray-500"
                          }`}
                          onClick={() =>
                            handleToggleStatus(
                              dealer._id!,
                              dealer.status === "active" ? "inactive" : "active"
                            )
                          }
                        >
                          {dealer.status === "active"
                            ? "Đang hoạt động"
                            : "Ngưng hoạt động"}
                        </Button>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            dealer.status === "active"
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-500 text-gray-100"
                          }`}
                        >
                          {dealer.status === "active"
                            ? "Đang hoạt động"
                            : "Ngưng hoạt động"}
                        </span>
                      )}
                    </TableCell>

                    {/* Hành động */}
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500 bg-gray-600"
                        onClick={() => {
                          setSelectedDealer(dealer);
                          setViewModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {user?.role !== "Admin" && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-600 text-green-400 hover:bg-gray-700 hover:border-green-500 bg-gray-600"
                          onClick={() => {
                            setSelectedDealerForInventory(dealer);
                            setInventoryModalOpen(true);
                          }}
                        >
                          <Box className="h-4 w-4" />
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-yellow-400 hover:bg-gray-700 hover:border-yellow-500 bg-gray-600"
                        onClick={() => {
                          setSelectedDealerForTarget(dealer);
                          setTargetModalOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      {canEdit && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-600 text-red-400 hover:bg-gray-700 bg-gray-600 hover:border-red-500"
                          onClick={() => handleDelete(dealer._id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-400 py-6"
                  >
                    Không có đại lý nào
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
      {canEdit && (
        <CreateDealerModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={fetchDealers}
        />
      )}

      {selectedDealer && (
        <ViewDealerModal
          dealer={selectedDealer}
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          onUpdated={fetchDealers}
        />
      )}

      {selectedDealerForTarget && (
        <UpdateDealerTargetModal
          dealerId={selectedDealerForTarget._id}
          initialTarget={selectedDealerForTarget.salesTarget || 0}
          isOpen={targetModalOpen}
          onClose={() => setTargetModalOpen(false)}
          onUpdated={fetchDealers}
        />
      )}

      {selectedDealerForInventory && (
        <DealerInventoryModal
          dealerId={selectedDealerForInventory._id}
          isOpen={inventoryModalOpen}
          onClose={() => setInventoryModalOpen(false)}
          fetchInventory={fetchDealerInventory}
          inventoryData={dealerInventory}
          loading={inventoryLoading}
        />
      )}
    </div>
  );
}
