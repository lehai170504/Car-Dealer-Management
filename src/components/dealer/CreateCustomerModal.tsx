// src/components/dealer/CreateCustomerModal.tsx
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

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCustomerModal({
  open,
  onClose,
}: CreateCustomerModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"Tiềm năng" | "Đã mua" | "Chăm sóc">(
    "Tiềm năng"
  );
  const [source, setSource] = useState("");

  const handleSubmit = () => {
    const newCustomer = {
      id: `KH${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name,
      phone,
      email,
      status,
      source,
    };
    console.log("Thêm khách hàng:", newCustomer);

    // Sau này bạn có thể dispatch Redux API call ở đây
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-100 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Thêm Khách hàng mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tên khách hàng */}
          <div>
            <label className="block mb-1 text-sm">Tên khách hàng</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên khách hàng"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block mb-1 text-sm">Điện thoại</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block mb-1 text-sm">Trạng thái</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Tiềm năng" | "Đã mua" | "Chăm sóc")
              }
              className="w-full bg-gray-700 border border-gray-600 rounded p-2"
            >
              <option value="Tiềm năng">Tiềm năng</option>
              <option value="Đã mua">Đã mua</option>
              <option value="Chăm sóc">Chăm sóc</option>
            </select>
          </div>

          {/* Nguồn */}
          <div>
            <label className="block mb-1 text-sm">Nguồn</label>
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="VD: Website, Facebook Ads..."
              className="bg-gray-700 text-white border-gray-600"
            />
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
            className="bg-sky-600 hover:bg-sky-700 text-white"
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
