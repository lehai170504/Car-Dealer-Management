// src/components/evm/DealerRankingTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

// Dữ liệu mẫu (sắp xếp theo % hoàn thành)
const dealerRanks = [
  { rank: 1, dealer: 'DL001 - HN', completion: 110, region: 'Miền Bắc' },
  { rank: 2, dealer: 'DL002 - HCM', completion: 105, region: 'Miền Nam' },
  { rank: 3, dealer: 'DL004 - HP', completion: 98, region: 'Miền Bắc' },
  { rank: 9, dealer: 'DL006 - Huế', completion: 80, region: 'Miền Trung' },
  { rank: 10, dealer: 'DL003 - ĐN', completion: 75, region: 'Miền Trung' },
];

export function EVM_DealerRankingTable() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Hạng</TableHead>
            <TableHead>Đại lý</TableHead>
            <TableHead>Khu vực</TableHead>
            <TableHead className="text-right">Hoàn thành (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dealerRanks.map((data, index) => (
            <TableRow 
              key={data.rank} 
              className={data.rank <= 2 ? 'bg-yellow-50 font-bold' : data.completion < 80 ? 'bg-red-50' : ''}
            >
              <TableCell className="font-bold">
                {data.rank <= 2 ? <Star className="h-4 w-4 inline text-yellow-500 mr-1" /> : ''}
                {data.rank}
              </TableCell>
              <TableCell>{data.dealer}</TableCell>
              <TableCell>{data.region}</TableCell>
              <TableCell className="text-right">
                <Badge variant={data.completion >= 100 ? 'default' : 'destructive'}>
                  {data.completion}%
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}