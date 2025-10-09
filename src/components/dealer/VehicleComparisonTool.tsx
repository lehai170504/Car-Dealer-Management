"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Dữ liệu mẫu (thông số kỹ thuật chung)
const specs = [
  {
    feature: "Giá (VNĐ)",
    "EV Model X LR": "950,000,000",
    "EV Model Y Standard": "720,000,000",
    "EV Model Y P": "850,000,000",
  },
  {
    feature: "Công suất tối đa",
    "EV Model X LR": "250 kW",
    "EV Model Y Standard": "180 kW",
    "EV Model Y P": "280 kW",
  },
  {
    feature: "Quãng đường (WLTP)",
    "EV Model X LR": "500 km",
    "EV Model Y Standard": "400 km",
    "EV Model Y P": "450 km",
  },
  {
    feature: "Tăng tốc 0-100 km/h",
    "EV Model X LR": "6.2 giây",
    "EV Model Y Standard": "8.5 giây",
    "EV Model Y P": "5.1 giây",
  },
  {
    feature: "Kích thước DxRxC (mm)",
    "EV Model X LR": "4800x1900x1650",
    "EV Model Y Standard": "4500x1850x1600",
    "EV Model Y P": "4500x1850x1600",
  },
];

export function VehicleComparisonTool() {
  const [comparedModels, setComparedModels] = useState([
    "EV Model X LR",
    "EV Model Y Standard",
    "EV Model Y P",
  ]);
  const [newModel, setNewModel] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddModel = () => {
    if (newModel && !comparedModels.includes(newModel)) {
      setComparedModels([...comparedModels, newModel]);
    }
    setNewModel("");
    setOpen(false);
  };

  const handleRemoveModel = (model: string) => {
    setComparedModels(comparedModels.filter((m) => m !== model));
  };

  return (
    <div className="space-y-4">
      {/* Nút Thêm xe và Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
            >
              <Plus className="mr-2 h-4 w-4" /> Thêm xe so sánh
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle>Thêm xe so sánh</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                placeholder="Nhập tên xe (VD: EV Model Z)"
                className="bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>
            <DialogFooter className="mt-4">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddModel}>Thêm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {comparedModels.map((model) => (
          <Badge
            key={model}
            className="bg-sky-600 text-white border-sky-600 text-base py-1 px-3 hover:bg-sky-700 transition-colors flex items-center"
          >
            {model}
            <X
              className="ml-2 h-3 w-3 cursor-pointer opacity-80 hover:opacity-100"
              onClick={() => handleRemoveModel(model)}
            />
          </Badge>
        ))}
      </div>

      {/* Bảng so sánh */}
      <div className="border border-gray-700 rounded-lg overflow-x-auto shadow-xl">
        <Table className="bg-gray-800 text-gray-50">
          <TableHeader>
            <TableRow className="bg-gray-700 hover:bg-gray-700/80 border-b border-gray-700">
              <TableHead className="w-[200px] sticky left-0 bg-gray-700 z-10 font-bold text-gray-200">
                Tính năng
              </TableHead>
              {comparedModels.map((model) => (
                <TableHead
                  key={model}
                  className="text-center font-bold text-sky-400 border-l border-gray-700/50"
                >
                  {model}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {specs.map((spec, index) => (
              <TableRow
                key={index}
                className="border-gray-700 data-[state=selected]:bg-gray-700/50 hover:bg-gray-700/50 transition-colors"
              >
                <TableCell className="font-medium sticky left-0 bg-gray-800 z-10 text-gray-100 border-r border-gray-700">
                  {spec.feature}
                </TableCell>
                {comparedModels.map((model) => (
                  <TableCell
                    key={model}
                    className="text-center border-l border-gray-700/50 text-gray-300"
                  >
                    {(spec as any)[model] ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
