// src/components/dealer/PriceList.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

// Dữ liệu mẫu
interface PriceItem {
  model: string;
  version: string;
  basePrice: string;
  VAT: string;
  policy: string;
}

const prices: PriceItem[] = [
  {
    model: "EV Model X",
    version: "Long Range",
    basePrice: "950,000,000",
    VAT: "10%",
    policy: "Áp dụng KM Q4",
  },
  {
    model: "EV Model Y",
    version: "Standard",
    basePrice: "720,000,000",
    VAT: "10%",
    policy: "Giá ổn định",
  },
  {
    model: "EV Model Y",
    version: "Performance",
    basePrice: "850,000,000",
    VAT: "10%",
    policy: "Áp dụng KM Q4",
  },
  {
    model: "EV Model Z",
    version: "City",
    basePrice: "580,000,000",
    VAT: "10%",
    policy: "Đang chờ cập nhật",
  },
];

export function PriceList() {
  const getPolicyBadgeClasses = (policy: string) => {
    if (policy.includes("KM Q4")) {
      // Khuyến mãi nổi bật (Primary Dark)
      return "bg-sky-600 text-white border-sky-600 font-semibold";
    }
    if (policy.includes("ổn định")) {
      // Trung tính
      return "bg-gray-600/50 text-gray-300 border-gray-700";
    }
    // Cảnh báo (Đang chờ cập nhật)
    return "bg-yellow-600/50 text-yellow-300 border-yellow-700";
  };

  return (
    <div className="space-y-4">
      {/* Banner thông báo - Dark Theme */}
      <div className="flex items-start text-sm bg-sky-900/40 p-3 rounded-lg border border-sky-700">
        <Info className="mr-2 h-4 w-4 flex-shrink-0 text-sky-400" />
        <p className="text-gray-200">
          Bảng giá này là **Giá bán lẻ Đề xuất (MSRP)**. Giá lăn bánh cuối cùng
          sẽ bao gồm thuế, phí và các chương trình khuyến mãi hiện hành.
        </p>
      </div>

      {/* Bảng giá - Dark Theme */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow className="border-gray-700 hover:bg-gray-700/80">
              <TableHead className="text-gray-200">Mẫu xe</TableHead>
              <TableHead className="text-gray-200">Phiên bản</TableHead>
              <TableHead className="text-right text-gray-200">
                Giá niêm yết (chưa VAT)
              </TableHead>
              <TableHead className="text-right text-gray-200">VAT</TableHead>
              <TableHead className="text-gray-200">Chính sách giá</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((item, index) => (
              <TableRow
                key={index}
                className="border-gray-700 hover:bg-gray-700/50 transition-colors"
              >
                <TableCell className="font-medium text-gray-100">
                  {item.model}
                </TableCell>
                <TableCell className="text-gray-300">{item.version}</TableCell>

                {/* Giá niêm yết */}
                <TableCell className="text-right font-bold text-emerald-400">
                  {item.basePrice} VNĐ
                </TableCell>

                <TableCell className="text-right text-gray-400">
                  {item.VAT}
                </TableCell>

                {/* Chính sách */}
                <TableCell>
                  <Badge className={getPolicyBadgeClasses(item.policy)}>
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
