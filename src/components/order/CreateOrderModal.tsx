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
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useState } from "react";
import type { OrderItem } from "@/types/orders";

interface CreateOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateOrderModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateOrderModalProps) {
  const createHook = useCreateOrder();

  // Form cho item
  const [itemVariant, setItemVariant] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemQty, setItemQty] = useState(1);
  const [itemUnitPrice, setItemUnitPrice] = useState(0);

  const addItem = () => {
    if (!itemVariant || !itemColor || itemQty <= 0 || itemUnitPrice <= 0)
      return;

    const newItem: OrderItem = {
      variant: itemVariant,
      color: itemColor,
      qty: itemQty,
      unitPrice: itemUnitPrice,
    };

    createHook.setItems([...createHook.items, newItem]);

    setItemVariant("");
    setItemColor("");
    setItemQty(1);
    setItemUnitPrice(0);
  };

  const inputClass =
    "bg-gray-800 text-gray-100 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader className="border-b border-gray-700 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Tạo Order mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Customer & Dealer */}
          <Input
            placeholder="Customer ID"
            value={createHook.customer}
            onChange={(e) => createHook.setCustomer(e.target.value)}
            className={inputClass}
          />
          <Input
            placeholder="Dealer ID"
            value={createHook.dealer}
            onChange={(e) => createHook.setDealer(e.target.value)}
            className={inputClass}
          />

          {/* Items */}
          <div className="space-y-2 border border-gray-700 p-2 rounded">
            <div className="flex gap-2">
              <Input
                placeholder="Variant ID"
                value={itemVariant}
                onChange={(e) => setItemVariant(e.target.value)}
                className={inputClass}
              />
              <Input
                placeholder="Color ID"
                value={itemColor}
                onChange={(e) => setItemColor(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Số lượng"
                value={itemQty}
                onChange={(e) => setItemQty(Number(e.target.value))}
                className={inputClass}
              />
              <Input
                type="number"
                placeholder="Đơn giá"
                value={itemUnitPrice}
                onChange={(e) => setItemUnitPrice(Number(e.target.value))}
                className={inputClass}
              />
            </div>
            <Button
              size="sm"
              className="bg-sky-600 hover:bg-sky-700"
              onClick={addItem}
            >
              Thêm sản phẩm
            </Button>

            {createHook.items.length > 0 && (
              <div className="text-sm text-gray-200 mt-2">
                <strong>Danh sách sản phẩm:</strong>
                <ul className="list-disc ml-4">
                  {createHook.items.map((i, idx) => (
                    <li key={idx}>
                      {i.variant} - {i.color} x{i.qty} @{" "}
                      {i.unitPrice.toLocaleString()} VND
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <Input
            placeholder="Phương thức thanh toán (cash, card, sepay...)"
            value={createHook.paymentMethod}
            onChange={(e) => createHook.setPaymentMethod(e.target.value as any)}
            className={inputClass}
          />

          {/* Deposit */}
          <Input
            type="number"
            placeholder="Deposit (tùy chọn)"
            value={createHook.deposit}
            onChange={(e) => createHook.setDeposit(Number(e.target.value))}
            className={inputClass}
          />
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2 border-t border-gray-700 pt-3">
          <Button
            className="bg-sky-600 hover:bg-sky-700"
            onClick={() =>
              createHook.handleSubmit(onSuccess, () => onOpenChange(false))
            }
            disabled={createHook.loading}
          >
            Tạo
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              createHook.resetForm();
            }}
            className="hover:bg-gray-700 text-neutral-600"
          >
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
