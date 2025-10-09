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
import { ArrowRightCircle } from "lucide-react";

const financeData = [
  {
    dealerId: "DL001",
    dealerName: "Đại lý Miền Bắc - HN",
    creditLimit: 50000,
    outstandingDebt: 15000,
    lastPayment: "2025-09-28",
    debtStatus: "Tốt",
  },
  {
    dealerId: "DL002",
    dealerName: "Đại lý Miền Nam - HCM",
    creditLimit: 70000,
    outstandingDebt: 25000,
    lastPayment: "2025-09-30",
    debtStatus: "Đang xem xét",
  },
  {
    dealerId: "DL003",
    dealerName: "Đại lý Miền Trung - ĐN",
    creditLimit: 30000,
    outstandingDebt: 1000,
    lastPayment: "2025-10-01",
    debtStatus: "Tốt",
  },
];

export function EVM_FinanceManagement() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount * 1000000);
  };

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-700/80">
          <TableRow className="border-gray-600 hover:bg-gray-700/80">
            <TableHead className="text-gray-200">Mã DL</TableHead>
            <TableHead className="text-gray-200">Tên Đại lý</TableHead>
            <TableHead className="text-right text-gray-200">
              Hạn mức Tín dụng
            </TableHead>
            <TableHead className="text-right text-gray-200">
              Công nợ Hiện tại
            </TableHead>
            <TableHead className="text-gray-200">Thanh toán Gần nhất</TableHead>
            <TableHead className="text-gray-200">Đánh giá</TableHead>
            <TableHead className="text-right text-gray-200">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {financeData.map((data) => (
            <TableRow
              key={data.dealerId}
              className="border-gray-600 hover:bg-gray-700/50 transition-colors"
            >
              <TableCell className="font-medium text-gray-200">
                {data.dealerId}
              </TableCell>
              <TableCell className="text-gray-300">{data.dealerName}</TableCell>
              <TableCell className="text-right text-gray-400">
                {formatCurrency(data.creditLimit)}
              </TableCell>
              <TableCell
                className={`text-right font-bold ${
                  data.outstandingDebt > 20000
                    ? "text-red-500" // Công nợ cao (trên 20 tỷ)
                    : data.outstandingDebt > 5000
                    ? "text-yellow-400" // Công nợ trung bình (trên 5 tỷ)
                    : "text-emerald-400" // Công nợ thấp
                }`}
              >
                {formatCurrency(data.outstandingDebt)}
              </TableCell>
              <TableCell className="text-gray-300">
                {data.lastPayment}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    data.debtStatus === "Tốt"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-yellow-600/50 text-yellow-300 border-yellow-700 hover:bg-yellow-600/70"
                  }
                >
                  {data.debtStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 bg-gray-700/50 text-emerald-400 hover:bg-emerald-700 hover:text-white hover:border-emerald-700 transition-colors"
                  onClick={() =>
                    console.log("Xem Chi tiết công nợ", data.dealerId)
                  }
                >
                  <ArrowRightCircle className="mr-2 h-4 w-4" /> Chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
