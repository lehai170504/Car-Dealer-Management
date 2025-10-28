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
import { useVehicles } from "@/hooks/useVehicles";
import { CreateVehicleModal } from "./CreateVehicleModal";
import { VehicleDetailModal } from "./VehicleDetailModal";

export function VehiclesTable() {
  const hook = useVehicles();
  const [searchText, setSearchText] = useState(hook.search);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
    hook.setSearch(searchText);
  }, [searchText]);

  const renderActions = (item: any) => (
    <div className="flex gap-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        className="bg-gray-800 border-gray-600 hover:bg-gray-700"
        onClick={() => {
          setSelectedVehicle(item);
          setDetailModalOpen(true);
        }}
      >
        <Eye className="h-4 w-4 text-sky-400" />
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

  if (hook.loading)
    return (
      <div className="flex items-center justify-center py-12 text-sky-400/80">
        <Loader2 className="animate-spin mr-2" />
        Đang tải...
      </div>
    );
  if (hook.error) return <div className="text-red-400 py-6">{hook.error}</div>;

  return (
    <div className="space-y-4">
      {/* Header: Search + Create */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm Battery, Trim, Model..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 rounded-lg shadow-inner"
          />
        </div>
        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4" /> Thêm Xe Mới
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-700 rounded-lg bg-gray-800">
        <Table>
          <TableHeader className="bg-gray-700/80">
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Battery</TableHead>
              <TableHead>Trim</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hook.filteredVehicles.length > 0 ? (
              hook.filteredVehicles.map((v, idx) => (
                <TableRow
                  key={v._id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-semibold text-sky-300">
                    {v.model?.name || "—"}
                  </TableCell>
                  <TableCell>{v.model?.brand || "—"}</TableCell>
                  <TableCell>{v.battery}</TableCell>
                  <TableCell>{v.trim}</TableCell>
                  <TableCell className="text-right">
                    {renderActions(v)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-400 py-6"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <CreateVehicleModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={hook.fetchVehicles}
      />

      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          onUpdated={hook.fetchVehicles}
        />
      )}
    </div>
  );
}
