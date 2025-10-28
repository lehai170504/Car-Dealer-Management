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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Search, Eye, Trash2, Loader2 } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

import { useVehicleModels } from "@/hooks/useVehicleModels";
import { useVehicleColors } from "@/hooks/useVehicleColors";
import { useVehicles } from "@/hooks/useVehicles";

export function VehicleGroupAccordionTable() {
  // --- Hooks
  const vehicleModelsHook = useVehicleModels();
  const vehicleColorsHook = useVehicleColors();
  const vehiclesHook = useVehicles();

  // --- Collapse state (shadcn Accordion handles open/close)
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // --- Helper: Search input
  const renderSearch = (
    search: string,
    setSearch: any,
    placeholder: string
  ) => (
    <div className="relative w-full sm:w-1/3 mb-2">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
      />
    </div>
  );

  // --- Render Table
  const renderTable = (
    items: any[],
    columns: {
      header: string;
      render: (item: any, idx: number) => React.ReactNode;
    }[],
    loading: boolean,
    error: string | null
  ) => {
    if (loading)
      return (
        <div className="flex items-center justify-center py-12 text-gray-400">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang tải...
        </div>
      );
    if (error)
      return <div className="text-red-400 text-center py-6">{error}</div>;
    if (!items || items.length === 0)
      return (
        <div className="text-gray-400 text-center py-6">Không có dữ liệu</div>
      );

    return (
      <Table className="text-gray-50">
        <TableHeader className="bg-gray-700/90">
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow
              key={item._id || idx}
              className="border-gray-700 hover:bg-gray-700/50"
            >
              {columns.map((col, cidx) => (
                <TableCell key={cidx}>
                  {/* Chắc chắn truyền idx vào render */}
                  {col.render(item, idx)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={(val) => setOpenSections(val as string[])}
      >
        {/* === VEHICLE MODELS === */}
        <AccordionItem value="models">
          <AccordionTrigger
            onClick={() => toggleSection("models")}
            className="text-gray-50 font-semibold"
          >
            Vehicle Models ({vehicleModelsHook.total})
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            {renderSearch(
              vehicleModelsHook.search,
              vehicleModelsHook.setSearch,
              "Tìm kiếm Model, Brand, Segment"
            )}
            {renderTable(
              vehicleModelsHook.filteredVehicleModels,
              [
                { header: "STT", render: (_, idx) => idx + 1 },
                { header: "Name", render: (m) => m.name },
                { header: "Brand", render: (m) => m.brand },
                { header: "Segment", render: (m) => m.segment },
                { header: "Active", render: (m) => (m.active ? "Yes" : "No") },
                {
                  header: "Actions",
                  render: (m) => (
                    <div className="flex gap-2 justify-end">
                      <Button size="icon" variant="outline" onClick={() => {}}>
                        <Eye className="h-4 w-4 text-sky-400" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => vehicleModelsHook.handleDelete(m._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  ),
                },
              ],
              vehicleModelsHook.loading,
              vehicleModelsHook.error
            )}
            {vehicleModelsHook.total > vehicleModelsHook.limit && (
              <Pagination
                currentPage={vehicleModelsHook.page}
                totalCount={vehicleModelsHook.total}
                pageSize={vehicleModelsHook.limit}
                onPageChange={vehicleModelsHook.setPage}
              />
            )}
          </AccordionContent>
        </AccordionItem>

        {/* === VEHICLE COLORS === */}
        <AccordionItem value="colors">
          <AccordionTrigger
            onClick={() => toggleSection("colors")}
            className="text-gray-50 font-semibold"
          >
            Vehicle Colors ({vehicleColorsHook.total})
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            {renderSearch(
              vehicleColorsHook.search,
              vehicleColorsHook.setSearch,
              "Tìm kiếm tên, code, hex"
            )}
            {renderTable(
              vehicleColorsHook.filteredVehicleColors,
              [
                { header: "STT", render: (_, idx) => idx + 1 },
                { header: "Name", render: (c) => c.name },
                { header: "Code", render: (c) => c.code },
                {
                  header: "Hex",
                  render: (c) => (
                    <div
                      className="w-6 h-6 border rounded"
                      style={{ backgroundColor: c.hex }}
                    />
                  ),
                },
                {
                  header: "Extra Price",
                  render: (c) => c.extraPrice.toLocaleString() + "₫",
                },
                { header: "Active", render: (c) => (c.active ? "Yes" : "No") },
                {
                  header: "Actions",
                  render: (c) => (
                    <div className="flex gap-2 justify-end">
                      <Button size="icon" variant="outline" onClick={() => {}}>
                        <Eye className="h-4 w-4 text-sky-400" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => vehicleColorsHook.handleDelete(c._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  ),
                },
              ],
              vehicleColorsHook.loading,
              vehicleColorsHook.error
            )}
            {vehicleColorsHook.total > vehicleColorsHook.limit && (
              <Pagination
                currentPage={vehicleColorsHook.page}
                totalCount={vehicleColorsHook.total}
                pageSize={vehicleColorsHook.limit}
                onPageChange={vehicleColorsHook.setPage}
              />
            )}
          </AccordionContent>
        </AccordionItem>

        {/* === VEHICLES === */}
        <AccordionItem value="vehicles">
          <AccordionTrigger
            onClick={() => toggleSection("vehicles")}
            className="text-gray-50 font-semibold"
          >
            Vehicles
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            {renderSearch(
              vehiclesHook.search,
              vehiclesHook.setSearch,
              "Tìm kiếm vehicle"
            )}
            {renderTable(
              vehiclesHook.filteredVehicles,
              [
                { header: "STT", render: (_, idx) => idx + 1 },
                { header: "Model", render: (v) => v.model?.name || "—" },
                { header: "Brand", render: (v) => v.model?.brand || "—" },
                { header: "Battery", render: (v) => v.battery },
                { header: "Trim", render: (v) => v.trim },
                {
                  header: "Actions",
                  render: (v) => (
                    <div className="flex gap-2 justify-end">
                      <Button size="icon" variant="outline" onClick={() => {}}>
                        <Eye className="h-4 w-4 text-sky-400" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => vehiclesHook.handleDelete(v._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  ),
                },
              ],
              vehiclesHook.loading,
              vehiclesHook.error
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
