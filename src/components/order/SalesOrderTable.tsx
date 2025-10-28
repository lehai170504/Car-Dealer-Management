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
import { Loader2, Trash, Eye, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/hooks/useOrders";
import { OrderDetailModal } from "./OrderDetailModal";
import { CreateOrderModal } from "./CreateOrderModal";
import { Pagination } from "@/components/ui/pagination";

const statusLabel: Record<string, string> = {
  new: "Mới",
  confirmed: "Đã xác nhận",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

const statusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-gray-600 text-gray-200 border-gray-600";
    case "confirmed":
      return "bg-sky-600 text-white border-sky-600";
    case "delivered":
      return "bg-emerald-600 text-white border-emerald-600";
    case "cancelled":
      return "bg-red-600 text-white border-red-600";
    default:
      return "bg-gray-700 text-gray-200";
  }
};

export function OrderTable() {
  const {
    filteredOrders,
    loading,
    error,
    fetchOrders,
    handleDelete,
    page: currentPage,
    setPage,
    limit,
    total,
    search,
    setSearch,
  } = useOrders();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // 🔁 Gọi lại API khi chuyển trang
  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, fetchOrders]);

  return (
    <div className="space-y-6 p-4">
      {/* Header: Search + Create */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo khách hàng, mã order..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
        </div>

        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Tạo Order mới
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang tải orders...
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
                <TableHead className="font-medium">Mã Order</TableHead>
                <TableHead className="font-medium">Số lượng xe</TableHead>
                <TableHead className="font-medium">Tổng tiền</TableHead>
                <TableHead className="font-medium">Ngày tạo</TableHead>
                <TableHead className="font-medium">Trạng thái</TableHead>
                <TableHead className="text-right font-medium">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {(currentPage - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="text-gray-300">
                      {order.orderNo}
                    </TableCell>
                    <TableCell className="text-sky-400 font-semibold">
                      {order.items.reduce((sum, i) => sum + i.qty, 0)}
                    </TableCell>
                    <TableCell className="text-emerald-400 font-medium">
                      {order.items
                        .reduce((sum, i) => sum + i.qty * i.unitPrice, 0)
                        .toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`px-2 py-1 rounded ${statusColor(
                          order.status
                        )}`}
                      >
                        {statusLabel[order.status] || order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
                        onClick={() => {
                          setSelectedOrder(order);
                          setDetailModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-red-400 hover:bg-gray-700 hover:border-red-500"
                        onClick={() => handleDelete(order._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-gray-400 py-6"
                  >
                    Không có order nào
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
            currentPage={currentPage}
            totalCount={total}
            pageSize={limit}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Modals */}
      <CreateOrderModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={() => fetchOrders(currentPage)}
      />

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          onUpdated={() => fetchOrders(currentPage)}
        />
      )}
    </div>
  );
}
