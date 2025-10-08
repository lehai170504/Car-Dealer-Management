// src/components/evm/FinanceManagement.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRightCircle } from "lucide-react";

// Dữ liệu mẫu (số tiền tính bằng triệu VNĐ)
const financeData = [
  { dealerId: 'DL001', dealerName: 'Đại lý Miền Bắc - HN', creditLimit: 50000, outstandingDebt: 15000, lastPayment: '2025-09-28', debtStatus: 'Tốt' },
  { dealerId: 'DL002', dealerName: 'Đại lý Miền Nam - HCM', creditLimit: 70000, outstandingDebt: 25000, lastPayment: '2025-09-30', debtStatus: 'Đang xem xét' },
  { dealerId: 'DL003', dealerName: 'Đại lý Miền Trung - ĐN', creditLimit: 30000, outstandingDebt: 1000, lastPayment: '2025-10-01', debtStatus: 'Tốt' },
];

export function EVM_FinanceManagement() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 1000000);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã DL</TableHead>
            <TableHead>Tên Đại lý</TableHead>
            <TableHead className="text-right">Hạn mức Tín dụng</TableHead>
            <TableHead className="text-right">Công nợ Hiện tại</TableHead>
            <TableHead>Thanh toán Gần nhất</TableHead>
            <TableHead>Đánh giá</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {financeData.map((data) => (
            <TableRow key={data.dealerId}>
              <TableCell>{data.dealerId}</TableCell>
              <TableCell>{data.dealerName}</TableCell>
              <TableCell className="text-right text-gray-500">{formatCurrency(data.creditLimit)}</TableCell>
              <TableCell className={`text-right font-bold ${data.outstandingDebt > 10000 ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(data.outstandingDebt)}
              </TableCell>
              <TableCell>{data.lastPayment}</TableCell>
              <TableCell>
                <Badge variant={data.debtStatus === 'Tốt' ? 'success' as any : 'warning' as any}> 
                  {data.debtStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline" onClick={() => console.log('Xem Chi tiết công nợ', data.dealerId)}>
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