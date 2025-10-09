"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DealerFinance {
  dealerId: string;
  dealerName: string;
  creditLimit: number;
  outstandingDebt: number;
  lastPayment: string;
  debtStatus: string;
}

interface DebtDetailModalProps {
  open: boolean;
  onClose: () => void;
  dealer: DealerFinance | null;
  formatCurrency: (amount: number) => string;
}

export function DebtDetailModal({
  open,
  onClose,
  dealer,
  formatCurrency,
}: DebtDetailModalProps) {
  if (!dealer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle>Chi tiết Công nợ</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết công nợ của{" "}
            <span className="font-semibold text-emerald-400">
              {dealer.dealerName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <p>
            <span className="font-semibold">Mã Đại lý:</span> {dealer.dealerId}
          </p>
          <p>
            <span className="font-semibold">Hạn mức Tín dụng:</span>{" "}
            {formatCurrency(dealer.creditLimit)}
          </p>
          <p>
            <span className="font-semibold">Công nợ Hiện tại:</span>{" "}
            {formatCurrency(dealer.outstandingDebt)}
          </p>
          <p>
            <span className="font-semibold">Thanh toán Gần nhất:</span>{" "}
            {dealer.lastPayment}
          </p>
          <p>
            <span className="font-semibold">Đánh giá:</span> {dealer.debtStatus}
          </p>
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
