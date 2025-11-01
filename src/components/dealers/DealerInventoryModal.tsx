"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DealerInventory } from "@/types/dealer";

interface DealerInventoryModalProps {
  dealerId: string;
  isOpen: boolean;
  onClose: () => void;
  fetchInventory: (id: string) => Promise<void>;
  inventoryData: DealerInventory[];
  loading: boolean;
}

export const DealerInventoryModal = ({
  dealerId,
  isOpen,
  onClose,
  fetchInventory,
  inventoryData,
  loading,
}: DealerInventoryModalProps) => {
  useEffect(() => {
    if (isOpen) {
      fetchInventory(dealerId).catch((err) => {
        console.error(err);
        toast.error("Không thể tải inventory dealer.");
      });
    }
  }, [isOpen, dealerId, fetchInventory]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-gray-900 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-sky-400">
            Tồn kho của đại lý
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-400">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Đang tải tồn kho...
            </div>
          ) : inventoryData.length === 0 ? (
            <div className="text-center text-gray-400 py-6">
              Đại lý chưa có tồn kho
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {inventoryData.map((inv) => (
                <div
                  key={inv._id}
                  className="bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between gap-4 transition-all"
                >
                  {/* Thông tin cơ bản */}
                  <div className="flex-1 space-y-1">
                    <p className="text-gray-300 font-medium">
                      <span className="text-sky-400 font-semibold">
                        Biến thể:
                      </span>{" "}
                      {inv.variant.trim}
                    </p>
                    <p className="text-gray-300 font-medium">
                      <span className="text-sky-400 font-semibold">Color:</span>{" "}
                      {inv.color.name}
                    </p>
                    <p className="text-gray-300 font-medium flex items-center gap-2">
                      <span className="text-sky-400 font-semibold">
                        Số lượng:
                      </span>
                      <span className="bg-emerald-600 text-gray-100 px-2 py-0.5 rounded-full text-sm">
                        {inv.quantity}
                      </span>
                    </p>
                    <p className="text-gray-300 font-medium flex items-center gap-2">
                      <span className="text-sky-400 font-semibold">
                        Đặt trước:
                      </span>
                      <span className="bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full text-sm">
                        {inv.reserved}
                      </span>
                    </p>
                  </div>

                  {/* Thông tin chi tiết */}
                  <div className="flex-1 space-y-1">
                    <p className="text-gray-300 font-medium">
                      <span className="text-sky-400 font-semibold">
                        Danh sách VIN:
                      </span>
                    </p>
                    <div className="max-h-20 overflow-y-auto text-gray-100 bg-gray-800 p-2 rounded-md text-sm border border-gray-700">
                      {inv.vinList.length > 0 ? inv.vinList.join(", ") : "-"}
                    </div>

                    <p className="text-gray-300 font-medium">
                      <span className="text-sky-400 font-semibold">
                        Địa chỉ:
                      </span>{" "}
                      {inv.location}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="text-sky-400 font-semibold">
                        Ngày tạo:
                      </span>{" "}
                      {new Date(inv.createdAt).toLocaleString()}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="text-sky-400 font-semibold">
                        Ngày cập nhật:
                      </span>{" "}
                      {new Date(inv.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:bg-gray-700 text-gray-600"
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
