"use client";

import { useState, useEffect } from "react";
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
import { Loader2, Eye, Search, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { useContracts } from "@/hooks/useContracts";
import { ContractDetailModal } from "./ContractDetailModal";
import { CreateContractModal } from "./CreateContractModal";

const statusMap: Record<string, string> = {
  draft: "Nháp",
  active: "Hoạt động",
  signed: "Đã ký",
  cancelled: "Đã hủy",
};

const getBadgeClass = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-gray-600 text-gray-200 border-gray-600";
    case "active":
      return "bg-sky-600 text-white border-sky-600";
    case "signed":
      return "bg-emerald-600 text-white border-emerald-600";
    case "cancelled":
      return "bg-red-600 text-white border-red-600";
    default:
      return "bg-gray-700 text-gray-200";
  }
};

export function ContractTable() {
  const {
    filteredContracts,
    loading,
    error,
    page,
    setPage,
    limit,
    total,
    search,
    setSearch,
    fetchContracts,
    handleDelete,
  } = useContracts();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  // 🔁 Gọi lại API khi chuyển trang
  useEffect(() => {
    fetchContracts(page);
  }, [page, fetchContracts]);

  return (
    <div className="space-y-6 p-4">
      {/* Header: Search + Create */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo mã hợp đồng hoặc order..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
        </div>

        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Tạo hợp đồng mới
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang tải
            contracts...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-6">{error}</div>
        ) : (
          <Table className="text-gray-50">
            <TableHeader className="bg-gray-700/90">
              <TableRow className="border-gray-700">
                <TableHead className="text-center font-medium w-[50px]">
                  STT
                </TableHead>
                <TableHead className="font-medium">Mã Contract</TableHead>
                <TableHead className="font-medium">Order liên quan</TableHead>
                <TableHead className="font-medium">Ngày tạo</TableHead>
                <TableHead className="font-medium">Trạng thái</TableHead>
                <TableHead className="text-right font-medium">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredContracts.length > 0 ? (
                filteredContracts.map((c, index) => (
                  <TableRow
                    key={c._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>{c.contractNo}</TableCell>
                    <TableCell className="text-gray-300">{c.order}</TableCell>
                    <TableCell>
                      {new Date(c.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`px-2 py-1 rounded ${getBadgeClass(
                          c.status
                        )}`}
                      >
                        {statusMap[c.status] || c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-sky-400 hover:bg-gray-700 bg-gray-600 hover:border-sky-500"
                        onClick={() => {
                          setSelectedContract(c);
                          setDetailModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-red-400 bg-gray-600 hover:bg-gray-700 hover:border-red-500"
                        onClick={() => handleDelete(c._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-400 py-6"
                  >
                    Không có hợp đồng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={page}
            totalCount={total}
            pageSize={limit}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Modals */}
      <CreateContractModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={fetchContracts}
      />

      {selectedContract && (
        <ContractDetailModal
          contract={selectedContract}
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          onUpdated={fetchContracts}
        />
      )}
    </div>
  );
}
