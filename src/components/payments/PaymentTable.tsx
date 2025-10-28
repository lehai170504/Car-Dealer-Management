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
import { usePayments } from "@/hooks/usePayments";
import { CreatePaymentModal } from "./CreatePaymentModal";
import { PaymentDetailModal } from "./PaymentDetailModal";
import { Pagination } from "@/components/ui/pagination";

const statusLabel: Record<string, string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  failed: "Thất bại",
  cancelled: "Đã hủy",
};

const statusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-600 text-yellow-100 border-yellow-600";
    case "confirmed":
      return "bg-emerald-600 text-white border-emerald-600";
    case "failed":
      return "bg-red-600 text-white border-red-600";
    case "cancelled":
      return "bg-gray-600 text-gray-200 border-gray-600";
    default:
      return "bg-gray-700 text-gray-200";
  }
};

const methodLabel: Record<string, string> = {
  cash: "Tiền mặt",
  bank: "Chuyển khoản",
  finance: "Trả góp",
};

const typeLabel: Record<string, string> = {
  deposit: "Đặt cọc",
  balance: "Thanh toán còn lại",
  refund: "Hoàn tiền",
};

export function PaymentTable() {
  const {
    filteredPayments,
    loading,
    error,
    page,
    setPage,
    limit,
    total,
    search,
    setSearch,
    fetchPayments,
    handleDelete,
  } = usePayments();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  // 🔁 Gọi lại API khi chuyển trang
  useEffect(() => {
    fetchPayments(page);
  }, [page, fetchPayments]);

  return (
    <div className="space-y-6 p-4">
      {/* Header: Search + Create */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo mã giao dịch, đơn hàng, trạng thái..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
        </div>

        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Tạo Payment mới
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang tải
            payments...
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
                <TableHead className="font-medium">Đơn hàng</TableHead>
                <TableHead className="font-medium">Loại</TableHead>
                <TableHead className="font-medium">Số tiền</TableHead>
                <TableHead className="font-medium">Phương thức</TableHead>
                <TableHead className="font-medium">Mã giao dịch</TableHead>
                <TableHead className="font-medium">Ngày thanh toán</TableHead>
                <TableHead className="font-medium">Trạng thái</TableHead>
                <TableHead className="text-right font-medium">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment, index) => (
                  <TableRow
                    key={payment._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {payment.order}
                    </TableCell>
                    <TableCell>
                      {typeLabel[payment.type] || payment.type}
                    </TableCell>
                    <TableCell className="text-emerald-400 font-semibold">
                      {payment.amount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                    <TableCell>
                      {methodLabel[payment.method] || payment.method}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {payment.transactionRef}
                    </TableCell>
                    <TableCell>
                      {new Date(payment.paidAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`px-2 py-1 rounded ${statusColor(
                          payment.status
                        )}`}
                      >
                        {statusLabel[payment.status] || payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
                        onClick={() => {
                          setSelectedPayment(payment);
                          setDetailModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-red-400 hover:bg-gray-700 hover:border-red-500"
                        onClick={() => handleDelete(payment._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center text-gray-400 py-6"
                  >
                    Không có payment nào
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
      <CreatePaymentModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={fetchPayments}
      />

      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          onUpdated={fetchPayments}
        />
      )}
    </div>
  );
}
