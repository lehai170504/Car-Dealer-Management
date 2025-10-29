"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Eye, Trash2, Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreatePromotionModal } from "./CreatePromotionModal";
import { ViewPromotionModal } from "./ViewPromotionModal";
import { Promotion } from "@/types/promotions";
import { usePromotions } from "@/hooks/usePromotions";

export function PromotionTable() {
  const {
    filteredPromotions,
    loading,
    error,
    search,
    setSearch,
    fetchPromotions,
    handleDelete,
  } = usePromotions();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo tên hoặc đại lý..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-green-500"
          />
        </div>

        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Thêm Khuyến mãi
        </Button>
      </div>

      <div className="border border-gray-700 rounded-lg overflow-x-auto bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Đang tải danh sách khuyến mãi...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-6">{error}</div>
        ) : (
          <Table className="text-gray-50 min-w-full">
            <TableHeader className="bg-gray-700/90">
              <TableRow className="border-gray-700">
                <TableHead className="font-medium max-w-[200px] whitespace-nowrap">
                  Tên chương trình
                </TableHead>
                <TableHead className="font-medium whitespace-nowrap">
                  Loại
                </TableHead>
                <TableHead className="font-medium whitespace-nowrap">
                  Giá trị
                </TableHead>
                <TableHead className="font-medium whitespace-nowrap">
                  Áp dụng cho
                </TableHead>
                <TableHead className="font-medium whitespace-nowrap">
                  Từ ngày
                </TableHead>
                <TableHead className="font-medium whitespace-nowrap">
                  Đến ngày
                </TableHead>
                <TableHead className="text-right font-medium w-[100px]">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredPromotions.length > 0 ? (
                filteredPromotions.map((promo) => (
                  <TableRow
                    key={promo._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="max-w-[200px] truncate">
                      {promo.name}
                    </TableCell>
                    <TableCell>{promo.type}</TableCell>
                    <TableCell>{promo.value}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {promo.dealers.length > 0
                        ? promo.dealers
                            .map((d) => (typeof d === "string" ? d : d.name))
                            .join(", ")
                        : "Toàn hệ thống"}
                    </TableCell>
                    <TableCell>
                      {new Date(promo.validFrom).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(promo.validTo).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2 w-[100px]">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-green-400 hover:bg-gray-700 hover:border-green-500"
                        onClick={() => {
                          setSelectedPromotion(promo);
                          setViewModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-red-400 hover:bg-gray-700 hover:border-red-500"
                        onClick={() => handleDelete(promo._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-400 py-6"
                  >
                    Không có chương trình khuyến mãi nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <CreatePromotionModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchPromotions}
      />

      {selectedPromotion && (
        <ViewPromotionModal
          promotion={selectedPromotion}
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          onUpdated={fetchPromotions}
        />
      )}
    </div>
  );
}
