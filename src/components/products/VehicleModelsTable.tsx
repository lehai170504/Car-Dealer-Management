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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Eye, Trash2, Search } from "lucide-react";
import { useVehicleModels } from "@/hooks/useVehicleModels";
import { CreateVehicleModelModal } from "./CreateVehicleModelModal";
import { VehicleModelDetailModal } from "./VehicleModelDetailModal";

export function VehicleModelsTable() {
  const hook = useVehicleModels();

  const [searchText, setSearchText] = useState(hook.search);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);

  /** 🔍 Debounce search */
  useEffect(() => {
    const delay = setTimeout(() => hook.setSearch(searchText), 300);
    return () => clearTimeout(delay);
  }, [searchText, hook]);

  /** 🧭 Hiển thị hành động */
  const renderActions = (item: any) => (
    <div className="flex gap-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        className="bg-gray-800 border-gray-600 hover:bg-gray-700"
        onClick={() => {
          setSelectedModel(item);
          setDetailModalOpen(true);
        }}
      >
        <Eye className="h-4 w-4 text-emerald-400" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="bg-gray-800 border-gray-600 hover:bg-red-900/40"
        onClick={() => hook.handleDelete(item._id)}
      >
        <Trash2 className="h-4 w-4 text-red-400" />
      </Button>
    </div>
  );

  /** 🔄 Loading state */
  if (hook.loading)
    return (
      <div className="flex items-center justify-center py-12 text-emerald-400/80">
        <Loader2 className="animate-spin mr-2" />
        Đang tải dữ liệu...
      </div>
    );

  /** ❌ Error state */
  if (hook.error)
    return (
      <div className="text-red-400 text-center py-8">
        {hook.error || "Đã xảy ra lỗi."}
      </div>
    );

  return (
    <div className="space-y-4">
      {/* ==== Header: Search + Create ==== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm Model, Brand, Segment..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 rounded-lg shadow-inner"
          />
        </div>

        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Thêm Model
        </Button>
      </div>

      {/* ==== Table ==== */}
      <div className="overflow-x-auto border border-gray-700 rounded-lg bg-gray-800">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {hook.filteredVehicleModels.length > 0 ? (
              hook.filteredVehicleModels.map((m, idx) => (
                <TableRow
                  key={m._id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{m.name}</TableCell>
                  <TableCell>{m.brand}</TableCell>
                  <TableCell>{m.segment}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => hook.handleToggleStatus(m._id, !m.active)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        m.active
                          ? "bg-green-200 text-emerald-800 hover:bg-emerald-300"
                          : "bg-red-200 text-red-800 hover:bg-red-300"
                      }`}
                    >
                      {m.active ? "Đang hoạt động" : "Ngừng hoạt động"}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    {renderActions(m)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-400 py-6"
                >
                  Không có dữ liệu phù hợp
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ==== Modals ==== */}
      <CreateVehicleModelModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={hook.fetchVehicleModels}
      />

      {selectedModel && (
        <VehicleModelDetailModal
          model={selectedModel}
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          onUpdated={hook.fetchVehicleModels}
        />
      )}
    </div>
  );
}
