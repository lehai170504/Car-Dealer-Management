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
import { useCreateCustomer } from "@/hooks/useCreateCustomer"; 

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; 
}

export function CreateCustomerModal({
  open,
  onClose,
  onSuccess,
}: CreateCustomerModalProps) {
  const {
    name, setName,
    phone, setPhone,
    email, setEmail,
    address, setAddress,
    feedback, setFeedback,
    loading, 
    handleSubmit, 
    resetForm, 
  } = useCreateCustomer();

  // Hàm đóng modal và reset form
  const handleCloseModal = () => {
    resetForm(); 
    onClose();
  };

  const handleSubmitWrapper = () => {
    handleSubmit(onSuccess || (() => {}), handleCloseModal); 
  };
  

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
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
              disabled={loading} 
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
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="bg-gray-700 text-white border-gray-600"
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCloseModal}
            className="border-gray-500 text-gray-300"
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmitWrapper} 
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
