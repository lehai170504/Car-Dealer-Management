"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateDealer } from "@/hooks/useCreateDealer";

interface CreateDealerModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // ✅ callback reload list
}

export function CreateDealerModal({
  open,
  onClose,
  onSuccess,
}: CreateDealerModalProps) {
  const {
    newDealerForm,
    setNewDealerField,
    isCreateLoading,
    handleCreateSubmit,
    resetCreateForm,
  } = useCreateDealer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleCreateSubmit(onClose, onSuccess);
    if (success) {
      resetCreateForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-800 text-gray-100 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-400">
            Thêm Đại lý Mới
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên đại lý */}
          <div>
            <Label className="text-gray-300">Tên Đại lý</Label>
            <Input
              value={newDealerForm.name}
              onChange={(e) => setNewDealerField("name", e.target.value)}
              placeholder="Nhập tên đại lý..."
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Địa điểm */}
          <div>
            <Label className="text-gray-300">Khu vực / Địa điểm</Label>
            <Input
              value={newDealerForm.location}
              onChange={(e) => setNewDealerField("location", e.target.value)}
              placeholder="Nhập khu vực hoặc địa chỉ..."
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Liên hệ */}
          <div>
            <Label className="text-gray-300">Thông tin liên hệ</Label>
            <Input
              value={newDealerForm.contactInfo}
              onChange={(e) =>
                setNewDealerField("contactInfo", e.target.value)
              }
              placeholder="Email, SĐT hoặc người liên hệ..."
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
            />
          </div>

          {/* Mục tiêu & Công nợ */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Mục tiêu doanh số (Xe)</Label>
              <Input
                type="number"
                value={newDealerForm.salesTarget}
                onChange={(e) =>
                  setNewDealerField("salesTarget", e.target.value)
                }
                placeholder="VD: 100"
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              />
            </div>

            <div>
              <Label className="text-gray-300">Công nợ ban đầu (VNĐ)</Label>
              <Input
                type="number"
                value={newDealerForm.debt}
                onChange={(e) => setNewDealerField("debt", e.target.value)}
                placeholder="VD: 0"
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Hành động */}
          <div className="flex justify-end space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetCreateForm();
                onClose();
              }}
              className="border-gray-500 text-gray-500 hover:bg-gray-700/60"
            >
              Hủy
            </Button>

            <Button
              type="submit"
              disabled={isCreateLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30"
            >
              {isCreateLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang thêm...
                </>
              ) : (
                "Thêm Đại lý"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
