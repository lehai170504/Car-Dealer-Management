"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dealer, DealerContact, DealerStatus } from "@/types/dealer";
import { useUpdateDealer } from "@/hooks/useUpdateDealer";
import { FormattedNumberInput } from "../commons/FormattedNumberInput";
import { useAuth } from "@/context/AuthContext";

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
  const { user } = useAuth();
  const canEdit = user?.role === "Admin" || user?.role === "DealerManager";

  const {
    editMode,
    setEditMode,
    formData,
    handleChange,
    setContactField,
    isUpdateLoading,
    handleUpdate,
    cancelEdit,
  } = useUpdateDealer(dealer);

  // Nếu user không có quyền, luôn để editMode = false
  const effectiveEditMode = canEdit && editMode;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-sky-400">
            Thông tin Đại lý
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Thông tin cơ bản */}
          <Input
            placeholder="Tên đại lý"
            value={formData.name || ""}
            disabled={!effectiveEditMode}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <Input
            placeholder="Mã đại lý"
            value={formData.code || ""}
            disabled={!effectiveEditMode}
            onChange={(e) => handleChange("code", e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <Input
            placeholder="Khu vực"
            value={formData.region || ""}
            disabled={!effectiveEditMode}
            onChange={(e) => handleChange("region", e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <Input
            placeholder="Địa chỉ"
            value={formData.address || ""}
            disabled={!effectiveEditMode}
            onChange={(e) => handleChange("address", e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
          />

          {/* Liên hệ */}
          {formData.contacts?.map((contact: DealerContact, index: number) => (
            <div key={contact._id} className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Tên liên hệ"
                value={contact.name || ""}
                disabled={!effectiveEditMode}
                onChange={(e) => setContactField(index, "name", e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              />
              <Input
                placeholder="SĐT"
                value={contact.phone || ""}
                disabled={!effectiveEditMode}
                onChange={(e) =>
                  setContactField(index, "phone", e.target.value)
                }
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              />
              <Input
                placeholder="Email"
                type="email"
                value={contact.email || ""}
                disabled={!effectiveEditMode}
                onChange={(e) =>
                  setContactField(index, "email", e.target.value)
                }
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400"
              />
            </div>
          ))}

          {/* Credit Limit & Status */}
          <div className="grid grid-cols-2 gap-4">
            <FormattedNumberInput
              label="Credit Limit (VNĐ)"
              value={formData.creditLimit || 0}
              onChange={(val) => handleChange("creditLimit", val)}
              className="bg-gray-700 border border-gray-600 text-gray-100 placeholder:text-gray-400 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Credit Limit (VNĐ)"
              labelClassName="text-gray-300 font-medium"
              disabled={!effectiveEditMode}
            />

            <div className="space-y-1">
              <label className="block text-gray-300 font-medium mb-1">
                Trạng thái
              </label>
              <select
                value={formData.status || "active"}
                disabled={!effectiveEditMode}
                onChange={(e) =>
                  handleChange("status", e.target.value as DealerStatus)
                }
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 px-3 py-2 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-60"
              >
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Ngưng hoạt động</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <DialogFooter className="space-x-2">
          {
            effectiveEditMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={cancelEdit}
                  className="border-gray-600 text-gray-600 hover:bg-gray-700/40"
                >
                  Hủy
                </Button>
                <Button
                  onClick={() => handleUpdate(onUpdated, onClose)}
                  disabled={isUpdateLoading}
                  className="bg-sky-600 hover:bg-sky-700 text-white"
                >
                  {isUpdateLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </>
            ) : canEdit ? (
              <Button
                onClick={() => setEditMode(true)}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                Chỉnh sửa
              </Button>
            ) : null /* user không có quyền, không hiện nút gì */
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
