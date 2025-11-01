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
import { Loader2, Plus, Search, Eye, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuotes } from "@/hooks/useQuotes";
import { CreateQuoteModal } from "./CreateQuoteModal";
import QuoteDetailModal from "./QuoteDetailModal";
import { Quote } from "@/types/quotes";
import { Pagination } from "@/components/ui/pagination";

const statusMap: Record<string, string> = {
  draft: "Bản nháp",
  sent: "Đã gửi",
  completed: "Đã chuyển đổi",
  cancelled: "Đã hủy",
};

const statusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-gray-600 text-gray-200 border-gray-600";
    case "sent":
      return "bg-sky-600 text-white border-sky-600";
    case "completed":
      return "bg-emerald-600 text-white border-emerald-600";
    case "cancelled":
      return "bg-red-600 text-white border-red-600";
    default:
      return "bg-gray-600 text-gray-200";
  }
};

export function QuoteTable() {
  const {
    filteredQuotes,
    loading,
    error,
    page,
    setPage,
    limit,
    total,
    search,
    setSearch,
    fetchQuotes,
    handleDelete,
  } = useQuotes();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [loadingQuoteDetail, setLoadingQuoteDetail] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);

  // 🔁 Load dữ liệu khi đổi trang
  useEffect(() => {
    fetchQuotes(page);
  }, [page, fetchQuotes]);

  // 🛠 Xử lý khi nhấn "Chỉnh sửa" trong modal chi tiết
  const handleEditQuote = (quote: Quote) => {
    setEditingQuote(quote);
    setEditModalOpen(true);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header: Search + Create */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo khách hàng, số điện thoại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
        </div>

        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Tạo Quote mới
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang tải quotes...
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
                <TableHead className="font-medium">Số điện thoại</TableHead>
                <TableHead className="font-medium">Đại lý</TableHead>
                <TableHead className="font-medium">Số lượng xe</TableHead>
                <TableHead className="font-medium">Giá trị</TableHead>
                <TableHead className="font-medium">Ngày tạo</TableHead>
                <TableHead className="font-medium">Trạng thái</TableHead>
                <TableHead className="text-right font-medium">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote, index) => (
                  <TableRow
                    key={quote._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {(page - 1) * limit + index + 1}
                    </TableCell>

                    <TableCell>
                      {quote.customerInfo?.fullName || "Không rõ"}
                    </TableCell>
                    <TableCell>{quote.customerInfo?.phone || "—"}</TableCell>

                    <TableCell>
                      {quote.dealerInfo ? (
                        <div className="flex flex-col">
                          <span className="font-medium text-sky-400">
                            {quote.dealerInfo.name}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {quote.dealerInfo.region}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </TableCell>

                    <TableCell className="text-sky-400 font-semibold">
                      {quote.items?.reduce((sum, i) => sum + i.qty, 0) ?? 0}
                    </TableCell>

                    <TableCell className="text-emerald-400 font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(quote.total)}
                    </TableCell>

                    <TableCell>
                      {new Date(quote.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`px-2 py-1 rounded ${statusColor(
                          quote.status
                        )}`}
                      >
                        {statusMap[quote.status] || quote.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-sky-400 hover:bg-gray-700 bg-gray-600 hover:border-sky-500"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setDetailModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-red-400 bg-gray-600 hover:bg-gray-700 hover:border-red-500"
                        onClick={() => handleDelete(quote._id)}
                      >
                        <Trash2 className="h-4 w-4" />
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
                    Không có quote nào
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

      {/* Create Quote Modal */}
      <CreateQuoteModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={() => fetchQuotes(page)}
      />

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          onEdit={(quote) => {
            handleEditQuote(quote);
            setDetailModalOpen(false);
          }}
          loading={loadingQuoteDetail}
        />
      )}
    </div>
  );
}
