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
import Swal from "sweetalert2";
import { customerService } from "@/services/customer/customerService";

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; // callback để reload danh sách
}

export function CreateCustomerModal({
  open,
  onClose,
  onSuccess,
}: CreateCustomerModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setFeedback("");
  };

  const handleSubmit = async () => {
    if (!name || !phone || !email) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đủ họ tên, SĐT, email!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name,
        phone,
        email,
        address,
        feedback,
      };

      await customerService.createCustomer(payload);
      Swal.fire("Thành công!", "Đã thêm khách hàng mới.", "success");

      resetForm();
      onClose();
      onSuccess?.(); // reload danh sách
    } catch (error: any) {
      console.error(error);
      Swal.fire("Lỗi", error?.message || "Không thể tạo khách hàng.", "error");
    } finally {
      setLoading(false);
    }
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
          {/* Họ tên */}
          <div>
            <label className="block mb-1 text-sm">Họ tên</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ tên khách hàng"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block mb-1 text-sm">Số điện thoại</label>
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

          {/* Địa chỉ */}
          <div>
            <label className="block mb-1 text-sm">Địa chỉ</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block mb-1 text-sm">Ghi chú / Phản hồi</label>
            <Input
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Nhập phản hồi (nếu có)"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-500 text-gray-300"
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-sky-600 hover:bg-sky-700 text-white"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
