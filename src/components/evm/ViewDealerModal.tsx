"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dealer } from "@/types/dealer";
import { useUpdateDealer } from "@/hooks/useUpdateDealer";
import { Pencil, X, Check } from "lucide-react";

interface ViewDealerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealer: Dealer;
  onUpdated: () => void;
}

export function ViewDealerModal({
  isOpen,
  onClose,
  dealer,
  onUpdated,
}: ViewDealerModalProps) {
  const {
    editMode,
    setEditMode,
    formData,
    handleChange,
    isUpdateLoading,
    handleUpdate,
  } = useUpdateDealer(dealer);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700 text-gray-100 max-w-lg rounded-2xl shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-emerald-400 flex items-center justify-between">
            <span>Thông tin Đại lý</span>
            {!editMode ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditMode(true)}
                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/30 transition"
              >
                <Pencil className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditMode(false)}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/30 transition"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Tên đại lý */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Tên đại lý
            </label>
            <Input
              value={formData.name || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`bg-gray-800 border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 transition ${
                !editMode ? "opacity-80 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Khu vực */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Khu vực</label>
            <Input
              value={formData.location || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("location", e.target.value)}
              className={`bg-gray-800 border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 transition ${
                !editMode ? "opacity-80 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Thông tin liên hệ
            </label>
            <Input
              value={formData.contactInfo || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("contactInfo", e.target.value)}
              className={`bg-gray-800 border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 transition ${
                !editMode ? "opacity-80 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Mục tiêu */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Mục tiêu (Xe)
            </label>
            <Input
              type="number"
              value={formData.salesTarget ?? ""}
              disabled={!editMode}
              onChange={(e) => handleChange("salesTarget", e.target.value)}
              className={`bg-gray-800 border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 transition ${
                !editMode ? "opacity-80 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Công nợ */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Công nợ (VNĐ)
            </label>
            <Input
              type="number"
              value={formData.debt ?? ""}
              disabled={!editMode}
              onChange={(e) => handleChange("debt", e.target.value)}
              className={`bg-gray-800 border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 transition ${
                !editMode ? "opacity-80 cursor-not-allowed" : ""
              }`}
            />
          </div>
        </div>

        {/* Hành động */}
        <div className="flex justify-end gap-3 mt-8 border-t border-gray-700 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-700/40 transition"
          >
            Đóng
          </Button>

          {editMode && (
            <Button
              onClick={() => handleUpdate(onUpdated, onClose)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 transition"
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? (
                "Đang lưu..."
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Lưu thay đổi
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
