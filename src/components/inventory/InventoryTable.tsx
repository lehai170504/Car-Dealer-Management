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
import { CreateInventoryModal } from "./CreateInventoryModal";
import { ViewInventoryModal } from "./ViewInventoryModal";
import { Inventory } from "@/types/inventory";
import { useInventory } from "@/hooks/useInventory";
import { useAuth } from "@/context/AuthContext"; // ✅ thêm

type UserRole = "Admin" | "DealerManager" | "DealerStaff" | "EVMStaff";

export function InventoryTable() {
  const {
    filteredInventory,
    loading,
    error,
    search,
    setSearch,
    fetchInventory,
    handleDelete,
  } = useInventory();

  const { user } = useAuth(); // ✅ lấy user từ context
  const role = user?.role as UserRole | null;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Inventory | null>(null);

  const canModify = role === "DealerManager" || role === "Admin";
  const canViewOnly = role === "DealerStaff";

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo đại lý, mã màu, biến thể..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-green-500"
          />
        </div>

        {/* ✅ Chỉ hiển thị nút thêm nếu được phép chỉnh sửa */}
        {canModify && (
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4" /> Thêm Tồn kho
          </Button>
        )}
      </div>

      <div className="border border-gray-700 rounded-lg overflow-x-auto bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Đang tải dữ liệu tồn kho...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-6">{error}</div>
        ) : (
          <Table className="text-gray-50 min-w-full">
            <TableHeader className="bg-gray-700/90">
              <TableRow className="border-gray-700">
                <TableHead className="font-medium max-w-[150px] whitespace-nowrap">
                  Đại lý/Chủ sở hữu
                </TableHead>
                <TableHead className="font-medium whitespace-nowrap">
                  Biến thể
                </TableHead>
                <TableHead className="font-medium whitespace-nowrap">
                  Màu sắc
                </TableHead>
                <TableHead className="font-medium w-[80px] text-right">
                  SL
                </TableHead>
                <TableHead className="font-medium w-[80px] text-center">
                  Dự trữ
                </TableHead>
                <TableHead className="font-medium max-w-[150px] whitespace-nowrap">
                  Vị trí
                </TableHead>
                <TableHead className="text-right font-medium w-[100px]">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <TableRow
                    key={item._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="max-w-[150px] truncate">
                      {item.owner.name}
                    </TableCell>
                    <TableCell>{item.variant.trim}</TableCell>
                    <TableCell>
                      {item.color
                        ? `${item.color.name} (${item.color.code})`
                        : "Chưa có màu"}
                    </TableCell>
                    <TableCell className="font-semibold text-right w-[80px]">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-yellow-400 text-center w-[80px]">
                      {item.reserved}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {item.location || "Chưa cập nhật"}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2 w-[100px]">
                      {/* ✅ Ai cũng xem được */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-green-400 hover:bg-gray-700 hover:border-green-500"
                        onClick={() => {
                          setSelectedItem(item);
                          setViewModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {/* ❌ DealerStaff không được xóa */}
                      {canModify && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-600 text-red-400 hover:bg-gray-700 hover:border-red-500"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-400 py-6"
                  >
                    Không có bản ghi tồn kho nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* ✅ DealerManager hoặc Admin mới được thêm */}
      {canModify && (
        <CreateInventoryModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={fetchInventory}
        />
      )}

      {selectedItem && (
        <ViewInventoryModal
          inventory={selectedItem}
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          onUpdated={fetchInventory}
          canEdit={canModify} // DealerStaff chỉ xem
        />
      )}
    </div>
  );
}
