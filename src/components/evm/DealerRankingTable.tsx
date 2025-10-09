// src/components/evm/DealerRankingTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

// Dữ liệu mẫu (sắp xếp theo % hoàn thành)
interface DealerRank {
  rank: number;
  dealer: string;
  completion: number;
  region: string;
}

const dealerRanks: DealerRank[] = [
  { rank: 1, dealer: "DL001 - HN", completion: 110, region: "Miền Bắc" },
  { rank: 2, dealer: "DL002 - HCM", completion: 105, region: "Miền Nam" },
  { rank: 3, dealer: "DL004 - HP", completion: 98, region: "Miền Bắc" },
  { rank: 9, dealer: "DL006 - Huế", completion: 80, region: "Miền Trung" },
  { rank: 10, dealer: "DL003 - ĐN", completion: 75, region: "Miền Trung" },
];

export function EVM_DealerRankingTable() {
  const getCompletionBadgeClasses = (completion: number) => {
    if (completion >= 100) {
      return "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600";
    }
    if (completion >= 80) {
      return "bg-sky-600/50 text-sky-300 border-sky-700 hover:bg-sky-600/70";
    }
    return "bg-red-600/50 text-red-300 border-red-700 hover:bg-red-600/70";
  };

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-700/80">
          <TableRow className="border-gray-600 hover:bg-gray-700/80">
            <TableHead className="w-[80px] text-gray-200">Hạng</TableHead>
            <TableHead className="text-gray-200">Đại lý</TableHead>
            <TableHead className="text-gray-200">Khu vực</TableHead>
            <TableHead className="text-right text-gray-200">
              Hoàn thành (%)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dealerRanks.map((data, index) => {
            let rowClass =
              "border-gray-600 hover:bg-gray-700/50 transition-colors";

            // Highlight Top 2
            if (data.rank <= 2) {
              rowClass =
                "border-gray-600 bg-yellow-800/30 font-bold hover:bg-yellow-800/40 transition-colors";
            }
            // Highlight dưới 80%
            else if (data.completion < 80) {
              rowClass =
                "border-gray-600 bg-red-800/30 hover:bg-red-800/40 transition-colors";
            }

            return (
              <TableRow key={data.rank} className={rowClass}>
                {/* Hạng */}
                <TableCell className="font-bold text-gray-200">
                  {data.rank <= 2 && (
                    <Star className="h-4 w-4 inline text-yellow-400 mr-2 fill-yellow-400" />
                  )}
                  <span
                    className={
                      data.rank <= 2 ? "text-yellow-400" : "text-gray-200"
                    }
                  >
                    {data.rank}
                  </span>
                </TableCell>

                {/* Đại lý */}
                <TableCell className="text-gray-300">{data.dealer}</TableCell>

                {/* Khu vực */}
                <TableCell className="text-gray-400">{data.region}</TableCell>

                {/* Hoàn thành (%) */}
                <TableCell className="text-right">
                  <Badge
                    className={`${getCompletionBadgeClasses(
                      data.completion
                    )} font-semibold`}
                  >
                    {data.completion}%
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
