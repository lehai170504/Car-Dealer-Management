// src/components/evm/CreateDealerModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface CreateDealerModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateDealerModal({ open, onClose }: CreateDealerModalProps) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [contract, setContract] = useState("");
  const [salesTarget, setSalesTarget] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = () => {
    const newDealer = {
      id: `DL${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name,
      region,
      contract,
      salesTarget: Number(salesTarget),
      currentSales: 0,
      status,
    };
    console.log("Thêm đại lý mới:", newDealer);

    // TODO: sau này dispatch Redux API call
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-100 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Thêm Đại lý mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tên đại lý */}
          <div>
            <label className="block mb-1 text-sm">Tên Đại lý</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên đại lý"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Khu vực */}
          <div>
            <label className="block mb-1 text-sm">Khu vực</label>
            <Input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Miền Bắc, Miền Nam..."
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Hợp đồng */}
          <div>
            <label className="block mb-1 text-sm">Hợp đồng</label>
            <Input
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              placeholder="2025-2027"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Mục tiêu */}
          <div>
            <label className="block mb-1 text-sm">Mục tiêu (Xe)</label>
            <Input
              type="number"
              value={salesTarget}
              onChange={(e) => setSalesTarget(e.target.value)}
              placeholder="Nhập số xe mục tiêu"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block mb-1 text-sm">Trạng thái</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2"
            >
              <option value="Active">Đang hoạt động</option>
              <option value="Pending">Chờ duyệt</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-500 text-gray-300"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
