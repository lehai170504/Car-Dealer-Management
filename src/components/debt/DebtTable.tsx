"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReports } from "@/hooks/useReports";
import { Dealer } from "@/types/dealer";

export function DebtTable() {
  const { debt } = useReports();

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount * 1000000);

  useEffect(() => {
    debt.fetchReport();
  }, []);

  if (!debt.data) {
    return <div>Đang tải dữ liệu công nợ...</div>;
  }

  const dealers: Dealer[] = debt.data.dealers;

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
          </TableRow>
        </TableHeader>

        <TableBody>
          {dealers.map((dealer) => (
            <TableRow
              key={dealer._id}
              className="border-gray-600 hover:bg-gray-700/50 transition-colors"
            >
              <TableCell className="font-medium text-gray-200">
                {dealer.code}
              </TableCell>
              <TableCell className="text-gray-300">{dealer.name}</TableCell>
              <TableCell className="text-right text-gray-400">
                {formatCurrency(dealer.creditLimit)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
