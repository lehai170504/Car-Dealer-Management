// src/components/dealer/PriceList.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

// Dữ liệu mẫu
const prices = [
  { model: 'EV Model X', version: 'Long Range', basePrice: '950,000,000', VAT: '10%', policy: 'Áp dụng KM Q4' },
  { model: 'EV Model Y', version: 'Standard', basePrice: '720,000,000', VAT: '10%', policy: 'Giá ổn định' },
  { model: 'EV Model Y', version: 'Performance', basePrice: '850,000,000', VAT: '10%', policy: 'Áp dụng KM Q4' },
  { model: 'EV Model Z', version: 'City', basePrice: '580,000,000', VAT: '10%', policy: 'Đang chờ cập nhật' },
];

export function PriceList() {
  return (
    <div className="space-y-4">
        <div className="flex items-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <Info className="mr-2 h-4 w-4 flex-shrink-0" />
            <p>Bảng giá này là Giá bán lẻ Đề xuất (MSRP). Giá lăn bánh cuối cùng sẽ bao gồm thuế, phí và các chương trình khuyến mãi hiện hành.</p>
        </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mẫu xe</TableHead>
              <TableHead>Phiên bản</TableHead>
              <TableHead className="text-right">Giá niêm yết (chưa VAT)</TableHead>
              <TableHead className="text-right">VAT</TableHead>
              <TableHead>Chính sách giá</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.model}</TableCell>
                <TableCell>{item.version}</TableCell>
                <TableCell className="text-right font-semibold">{item.basePrice} VNĐ</TableCell>
                <TableCell className="text-right">{item.VAT}</TableCell>
                <TableCell>
                    <Badge variant={item.policy.includes('KM Q4') ? 'default' : 'secondary'}>
                        {item.policy}
                    </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}