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
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCustomer } from "@/hooks/useUpdateCustomer";
import { Customer } from "@/types/customer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onUpdated: () => void;
}

export function ViewCustomerModal({
  isOpen,
  onClose,
  customer,
  onUpdated,
}: Props) {
  const {
    editMode,
    setEditMode,
    formData,
    handleChange,
    handleUpdate,
    cancelEdit,
    loading,
  } = useUpdateCustomer(customer);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-800 text-gray-50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Chi tiết khách hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="Họ tên"
            value={formData.fullName}
            disabled={!editMode}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
          <Input
            placeholder="Số điện thoại"
            value={formData.phone}
            disabled={!editMode}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
          <Input
            placeholder="Email"
            value={formData.email}
            disabled={!editMode}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
          <Input
            placeholder="Địa chỉ"
            value={formData.address}
            disabled={!editMode}
            onChange={(e) => handleChange("address", e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
          <Textarea
            placeholder="Ghi chú"
            value={formData.notes}
            disabled={!editMode}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
        </div>

        <DialogFooter className="space-x-2">
          {editMode ? (
            <>
              <Button
                variant="outline"
                onClick={cancelEdit}
                className="border-gray-600 text-gray-600 hover:bg-gray-700"
              >
                Hủy
              </Button>
              <Button
                onClick={() => handleUpdate(onUpdated, onClose)}
                disabled={loading}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEditMode(true)}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              Chỉnh sửa
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
