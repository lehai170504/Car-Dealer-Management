// src/components/dealer/CreateSalesModal.tsx
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

interface CreateSalesModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateSalesModal({ open, onClose }: CreateSalesModalProps) {
  const [type, setType] = useState<"quote" | "order">("quote");
  const [customerName, setCustomerName] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<
    "Draft" | "Sent" | "Converted" | "Pending" | "Paid" | "Installment"
  >("Draft");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    const payload =
      type === "quote"
        ? {
            type,
            customerName,
            vehicleModel,
            totalPrice: amount,
            status,
            createdAt: date,
          }
        : {
            type,
            customerName,
            vehicleModel,
            totalAmount: amount,
            paymentStatus: status,
            orderDate: date,
          };

    console.log("Submit:", payload);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-100 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {type === "quote" ? "Tạo mới Báo giá" : "Tạo mới Đơn hàng"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Loại */}
          <div>
            <label className="block mb-1 text-sm">Loại</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "quote" | "order")}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2"
            >
              <option value="quote">Báo giá</option>
              <option value="order">Đơn hàng</option>
            </select>
          </div>

          {/* Tên khách hàng */}
          <div>
            <label className="block mb-1 text-sm">Tên khách hàng</label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nhập tên khách hàng"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>

          {/* Mẫu xe */}
          <div>
            <label className="block mb-1 text-sm">Mẫu xe</label>
            <Input
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              placeholder="VD: Model X Long Range"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>

          {/* Giá trị */}
          <div>
            <label className="block mb-1 text-sm">
              {type === "quote" ? "Giá trị báo giá" : "Tổng tiền"}
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Nhập số tiền"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block mb-1 text-sm">Trạng thái</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "Draft"
                    | "Sent"
                    | "Converted"
                    | "Pending"
                    | "Paid"
                    | "Installment"
                )
              }
              className="w-full bg-gray-700 border border-gray-600 rounded p-2"
            >
              {type === "quote" ? (
                <>
                  <option value="Draft">Bản nháp</option>
                  <option value="Sent">Đã gửi</option>
                  <option value="Converted">Đã chuyển đổi</option>
                </>
              ) : (
                <>
                  <option value="Pending">Chờ thanh toán</option>
                  <option value="Paid">Đã thanh toán</option>
                  <option value="Installment">Trả góp</option>
                </>
              )}
            </select>
          </div>

          {/* Ngày */}
          <div>
            <label className="block mb-1 text-sm">
              {type === "quote" ? "Ngày tạo" : "Ngày đặt hàng"}
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
