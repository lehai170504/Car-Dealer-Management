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
import { Loader2, Trash, Plus, Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuotes } from "@/hooks/useQuotes";
import { CreateQuoteModal } from "./CreateQuoteModal";
import { Quote } from "@/types/quotes";
import { QuoteDetailModal } from "./QuoteDetailModal";

const statusMap: Record<string, string> = {
  draft: "Bản nháp",
  sent: "Đã gửi",
  completed: "Đã chuyển đổi",
  cancelled: "Đã hủy",
};

export function QuoteTable() {
  const {
    filteredQuotes,
    loading,
    handleDelete,
    fetchQuotes,
    search,
    setSearch,
  } = useQuotes();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const getStatusBadgeClasses = (status: string) => {
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

  const displayedQuotes = filteredQuotes.filter(
    (q) =>
      !search ||
      q.customer.toLowerCase().includes(search.toLowerCase()) ||
      q._id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4">
      {/* Header: search + create */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo khách hàng, mã quote..."
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

      {/* Table / Loading */}
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang tải quotes...
          </div>
        ) : (
          <Table className="text-gray-50">
            <TableHeader className="bg-gray-700/90">
              <TableRow className="border-gray-700">
                <TableHead className="font-medium">Khách hàng</TableHead>
                <TableHead className="font-medium">Mã quote</TableHead>
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
              {displayedQuotes.length > 0 ? (
                displayedQuotes.map((quote) => (
                  <TableRow
                    key={quote._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell>{quote.customer}</TableCell>
                    <TableCell className="text-gray-300">{quote._id}</TableCell>
                    <TableCell className="text-sky-400 font-semibold">
                      {quote.items.reduce((sum, i) => sum + i.qty, 0)}
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
                        className={`${getStatusBadgeClasses(
                          quote.status
                        )} px-2 py-1`}
                      >
                        {statusMap[quote.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
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
                        className="border-gray-600 text-red-400 hover:bg-gray-700 hover:border-red-500"
                        onClick={() => handleDelete(quote._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
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

      {/* Modals */}
      <CreateQuoteModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={fetchQuotes}
      />

      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          onUpdated={fetchQuotes}
        />
      )}
    </div>
  );
}
