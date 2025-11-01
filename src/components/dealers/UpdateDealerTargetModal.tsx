"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateDealerTarget } from "@/hooks/useUpdateDealerTarget ";

interface UpdateDealerTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealerId: string;
  initialTarget?: number;
  onUpdated: () => void; // callback reload dữ liệu
}

export const UpdateDealerTargetModal = ({
  isOpen,
  onClose,
  dealerId,
  initialTarget = 0,
  onUpdated,
}: UpdateDealerTargetModalProps) => {
  const [target, setTarget] = useState<number>(initialTarget);
  const { updateTarget, isLoading } = useUpdateDealerTarget();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (target < 0) {
      toast.error("Sales target không được nhỏ hơn 0");
      return;
    }

    try {
      await updateTarget(dealerId, { salesTarget: target });
      toast.success("Cập nhật target thành công!");
      onUpdated(); // callback reload dữ liệu
      onClose(); // đóng modal
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Không thể cập nhật target");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-sky-400">
            Cập nhật Target Dealer
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <label className="block text-gray-300 mb-1">
              Sales Target (VNĐ)
            </label>
            <Input
              type="number"
              min={0}
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              placeholder="Nhập sales target..."
              className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <DialogFooter className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-500 text-gray-600 hover:bg-gray-700/40"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-sky-600 hover:bg-sky-700 text-white flex items-center"
            >
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Lưu Target
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
