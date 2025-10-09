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
import { Search, FileText, BarChart2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const dealers = [
  {
    id: "DL001",
    name: "Đại lý Miền Bắc - HN",
    region: "Miền Bắc",
    contract: "2025-2027",
    salesTarget: 120,
    currentSales: 95,
    status: "Active",
  },
  {
    id: "DL002",
    name: "Đại lý Miền Nam - HCM",
    region: "Miền Nam",
    contract: "2024-2026",
    salesTarget: 150,
    currentSales: 130,
    status: "Active",
  },
  {
    id: "DL003",
    name: "Đại lý Miền Trung - ĐN",
    region: "Miền Trung",
    contract: "2025-2028",
    salesTarget: 80,
    currentSales: 60,
    status: "Pending",
  },
];

export function EVM_DealerList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo tên Đại lý, Mã..."
            className="pl-10 bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:border-emerald-500"
          />
        </div>
      </div>
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow className="border-gray-600 hover:bg-gray-700/80">
              <TableHead className="w-[100px] text-gray-200">Mã DL</TableHead>
              <TableHead className="text-gray-200">Tên Đại lý</TableHead>
              <TableHead className="text-gray-200">Khu vực</TableHead>
              <TableHead className="text-gray-200">Hợp đồng</TableHead>
              <TableHead className="text-center text-gray-200">
                Mục tiêu (Xe)
              </TableHead>
              <TableHead className="text-center text-gray-200">
                Doanh số QTD (Xe)
              </TableHead>
              <TableHead className="text-gray-200">Trạng thái</TableHead>
              <TableHead className="text-right text-gray-200">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealers.map((dealer) => (
              <TableRow
                key={dealer.id}
                className="border-gray-600 hover:bg-gray-700/50 transition-colors"
              >
                <TableCell className="font-medium text-gray-200">
                  {dealer.id}
                </TableCell>
                <TableCell className="text-gray-300">{dealer.name}</TableCell>
                <TableCell className="text-gray-300">{dealer.region}</TableCell>
                <TableCell className="text-gray-300">
                  {dealer.contract}
                </TableCell>
                <TableCell className="text-center text-gray-300">
                  {dealer.salesTarget}
                </TableCell>
                <TableCell className="text-center font-semibold text-emerald-400">
                  {dealer.currentSales}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      dealer.status === "Active"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-yellow-600/50 text-yellow-300 border-yellow-700 hover:bg-yellow-600/70"
                    }
                  >
                    {dealer.status === "Active"
                      ? "Đang hoạt động"
                      : "Chờ duyệt"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 text-emerald-400 hover:bg-gray-600/50 hover:border-emerald-500"
                    onClick={() => console.log("Xem Hợp đồng", dealer.id)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600 text-emerald-400 hover:bg-gray-600/50 hover:border-emerald-500"
                    onClick={() => console.log("Xem Hiệu suất", dealer.id)}
                  >
                    <BarChart2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
