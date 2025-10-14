"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { useUpdateCustomer } from "@/hooks/useUpdateCustomer";

interface ViewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onUpdated: () => void;
}

export function ViewCustomerModal({
  isOpen,
  onClose,
  customer: initialCustomer, // Đổi tên để truyền vào hook
  onUpdated,
}: ViewCustomerModalProps) {
  // === SỬ DỤNG CUSTOM HOOK ===
  const {
    editMode,
    setEditMode,
    formData,
    loading,
    handleChange,
    handleUpdate,
    cancelEdit,
  }
  // Truyền dữ liệu ban đầu cho hook
  = useUpdateCustomer(initialCustomer); 
  // =========================

  // Wrapper gọi hook, truyền callback onUpdated và onClose
  const handleFinalUpdate = () => {
    handleUpdate(onUpdated, onClose);
  };
  
  // Xử lý đóng modal: đảm bảo reset editMode nếu đang chỉnh sửa
  const handleClose = () => {
    cancelEdit();
    onClose();
  }

  const fields = [
    { key: "name", label: "Họ tên" },
    { key: "phone", label: "Điện thoại" },
    { key: "email", label: "Email" },
    { key: "address", label: "Địa chỉ" },
    { key: "feedback", label: "Ghi chú / Phản hồi" },
  ] as const;


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 text-gray-50 border border-gray-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editMode ? "Chỉnh sửa khách hàng" : "Thông tin khách hàng"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block mb-1 text-gray-400 capitalize">
                {field.label}
              </label>
              <Input
                disabled={!editMode}
                value={(formData[field.key as keyof Customer] || "") as string}
                onChange={(e) =>
                  handleChange(field.key as keyof Customer, e.target.value)
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
              <Button variant="outline" onClick={handleClose}>
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
              <Button 
                variant="outline" 
                onClick={cancelEdit} // Dùng hàm hủy từ hook
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                onClick={handleFinalUpdate} // Gọi hàm từ hook
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
