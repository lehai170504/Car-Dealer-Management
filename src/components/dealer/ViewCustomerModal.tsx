"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { customerService } from "@/services/customer/customerService";
import Swal from "sweetalert2";
import { Customer } from "@/types/customer";

interface ViewCustomerModalProps {
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
}: ViewCustomerModalProps) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Customer>(customer);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof Customer, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await customerService.updateCustomer(customer._id!, formData);
      Swal.fire(
        "Thành công",
        "Cập nhật thông tin khách hàng thành công",
        "success"
      );
      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err) {
      Swal.fire("Lỗi", "Không thể cập nhật khách hàng", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-50 border border-gray-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editMode ? "Chỉnh sửa khách hàng" : "Thông tin khách hàng"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label className="block mb-1 text-gray-400 capitalize">
                {field}
              </label>
              <Input
                disabled={!editMode}
                value={formData[field as keyof Customer] || ""}
                onChange={(e) =>
                  handleChange(field as keyof Customer, e.target.value)
                }
                className={`bg-gray-700 border-gray-600 ${
                  editMode ? "text-white" : "text-gray-300"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {!editMode ? (
            <>
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>
              <Button
                onClick={() => setEditMode(true)}
                className="bg-sky-600 hover:bg-sky-700"
              >
                Chỉnh sửa
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Hủy
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
