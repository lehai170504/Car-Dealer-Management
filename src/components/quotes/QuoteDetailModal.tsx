"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Quote } from "@/types/quotes";
import { format } from "date-fns";
import { Loader2, Pencil } from "lucide-react";

interface QuoteDetailModalProps {
  quote: Quote | null;
  open: boolean;
  onClose: () => void;
  onEdit: (quote: Quote) => void;
  loading?: boolean;
}

export default function QuoteDetailModal({
  quote,
  open,
  onClose,
  onEdit,
  loading,
}: QuoteDetailModalProps) {
  const labelClass = "text-gray-400 text-sm font-medium";

  if (!quote) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-gray-100 max-w-4xl w-full rounded-xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="border-b border-gray-700 pb-3">
          <DialogTitle className="text-xl font-semibold flex justify-between items-center">
            <span>Chi tiết báo giá #{quote._id}</span>
            <Button
              onClick={() => onEdit(quote)}
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white"
            >
              <Pencil className="w-4 h-4 mr-2" /> Chỉnh sửa
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <ScrollArea className="max-h-[75vh] mt-4 pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1 pb-6">
            {/* ===== CỘT TRÁI ===== */}
            <div className="space-y-6">
              {/* Khách hàng */}
              <div>
                <label className={labelClass}>Khách hàng</label>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                  <div className="font-medium text-gray-100">
                    {quote.customer || "—"}
                  </div>
                </div>
              </div>

              {/* Đại lý */}
              <div>
                <label className={labelClass}>Đại lý</label>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                  <div className="font-medium text-gray-100">
                    {quote.dealer || "—"}
                  </div>
                </div>
              </div>

              {/* Danh sách xe */}
              <div>
                <label className={labelClass}>Danh sách xe</label>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 space-y-3">
                  {quote.items?.length ? (
                    quote.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="border-b border-gray-700 pb-2 last:border-none"
                      >
                        <div className="flex justify-between text-sm font-medium">
                          <span>
                            🚗 Biến thể:{" "}
                            <span className="text-sky-400">
                              {item.variant || "Không rõ"}
                            </span>{" "}
                            – Màu:{" "}
                            <span className="text-sky-400">
                              {item.color || "Không rõ"}
                            </span>
                          </span>
                          <span>SL: {item.qty}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>
                            Đơn giá: {item.unitPrice.toLocaleString()} đ
                          </span>
                          <span>
                            Thành tiền:{" "}
                            {(item.qty * item.unitPrice).toLocaleString()} đ
                          </span>
                        </div>

                        {item.promotionApplied?.length ? (
                          <div className="text-xs text-green-400 mt-1">
                            Ưu đãi: {item.promotionApplied.join(", ")}
                          </div>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 italic">Không có xe nào</div>
                  )}
                </div>
              </div>
            </div>

            {/* ===== CỘT PHẢI ===== */}
            <div className="space-y-6">
              {/* Phí */}
              <div>
                <label className={labelClass}>Phí</label>
                {quote.fees ? (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Đăng ký:</span>
                      <span>{quote.fees.registration.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biển số:</span>
                      <span>{quote.fees.plate.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giao xe:</span>
                      <span>{quote.fees.delivery.toLocaleString()} đ</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 italic">Không có phí</div>
                )}
              </div>

              {/* Tổng phụ */}
              <div>
                <label className={labelClass}>Tổng phụ</label>
                <div className="bg-gray-800 px-3 py-2 rounded-md border border-gray-700 text-gray-300">
                  {quote.subtotal?.toLocaleString()} đ
                </div>
              </div>

              {/* Giảm giá */}
              <div>
                <label className={labelClass}>Giảm giá</label>
                <div className="bg-gray-800 px-3 py-2 rounded-md border border-gray-700 text-gray-300">
                  {quote.discount
                    ? `${quote.discount.toLocaleString()} đ`
                    : "—"}
                </div>
              </div>

              {/* Tổng cộng */}
              <div>
                <label className={labelClass}>Tổng cộng</label>
                <div className="bg-gray-800 px-3 py-2 rounded-md border border-gray-700 text-lg font-semibold text-sky-400">
                  {quote.total?.toLocaleString()} đ
                </div>
              </div>

              {/* Ngày hết hạn */}
              <div>
                <label className={labelClass}>Ngày hết hạn</label>
                <div className="bg-gray-800 px-3 py-2 rounded-md border border-gray-700 text-gray-300">
                  {quote.validUntil
                    ? format(new Date(quote.validUntil), "dd/MM/yyyy")
                    : "—"}
                </div>
              </div>

              {/* Trạng thái */}
              <div>
                <label className={labelClass}>Trạng thái</label>
                <div
                  className={`bg-gray-800 px-3 py-2 rounded-md border border-gray-700 capitalize font-medium ${
                    quote.status === "completed"
                      ? "text-green-400"
                      : quote.status === "cancelled"
                      ? "text-red-400"
                      : quote.status === "sent"
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  {quote.status}
                </div>
              </div>

              {/* Ghi chú */}
              <div>
                <label className={labelClass}>Ghi chú</label>
                <div className="bg-gray-800 px-3 py-2 rounded-md border border-gray-700">
                  {quote.notes || "—"}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* FOOTER */}
        <DialogFooter className="border-t border-gray-700 pt-4">
          <Button
            onClick={onClose}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Đóng
          </Button>
        </DialogFooter>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
            <Loader2 className="animate-spin w-6 h-6 text-sky-400" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
