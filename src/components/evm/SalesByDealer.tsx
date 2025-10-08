// src/components/evm/SalesByDealer.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, TrendingUp, Filter } from "lucide-react";

// Dữ liệu mẫu (Doanh số là số lượng xe bán ra)
const salesData = [
  { dealer: 'DL002 - Miền Nam HCM', region: 'Miền Nam', target: 150, actual: 135, variance: -15, completion: 90 },
  { dealer: 'DL001 - Miền Bắc HN', region: 'Miền Bắc', target: 120, actual: 125, variance: 5, completion: 104 },
  { dealer: 'DL003 - Miền Trung ĐN', region: 'Miền Trung', target: 80, actual: 60, variance: -20, completion: 75 },
  { dealer: 'DL004 - Miền Bắc HP', region: 'Miền Bắc', target: 50, actual: 48, variance: -2, completion: 96 },
];

export function EVM_SalesByDealer() {
  const isTargetMet = (completion: number) => completion >= 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Hiệu suất Bán hàng Quý hiện tại (theo Xe)</h3>
        <Button variant="outline" size="sm" onClick={() => console.log('Áp dụng bộ lọc')}>
            <Filter className="mr-2 h-4 w-4" /> Lọc theo Khu vực
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Đại lý</TableHead>
              <TableHead>Khu vực</TableHead>
              <TableHead className="text-center">Mục tiêu (Xe)</TableHead>
              <TableHead className="text-center">Thực đạt (Xe)</TableHead>
              <TableHead className="text-center">Hoàn thành (%)</TableHead>
              <TableHead className="text-right">Chênh lệch</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.sort((a, b) => b.completion - a.completion).map((data, index) => (
              <TableRow key={index} className={isTargetMet(data.completion) ? 'bg-green-50/50' : ''}>
                <TableCell className="font-medium">{data.dealer}</TableCell>
                <TableCell>{data.region}</TableCell>
                <TableCell className="text-center">{data.target}</TableCell>
                <TableCell className="text-center font-bold text-blue-600">{data.actual}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={isTargetMet(data.completion) ? 'success' as any : 'destructive'}>
                    {data.completion}%
                  </Badge>
                </TableCell>
                <TableCell className={`text-right ${data.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {data.variance >= 0 ? `+${data.variance}` : data.variance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}