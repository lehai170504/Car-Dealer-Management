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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCreateCustomer } from "@/hooks/useCreateCustomer";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateCustomerModal({ open, onClose, onSuccess }: Props) {
  const {
    fullName,
    setFullName,
    phone,
    setPhone,
    email,
    setEmail,
    address,
    setAddress,
    notes,
    setNotes,
    segment,
    setSegment,
    loading,
    handleSubmit,
  } = useCreateCustomer();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-800 text-gray-50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Thêm Khách hàng mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="Họ tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
          <Input
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
          <Input
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />
          <Textarea
            placeholder="Ghi chú"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
          />

          {/* Segment Select */}
          <Select
            value={segment}
            onValueChange={(value: string) =>
              setSegment(value as "retail" | "wholesale")
            }
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-50 focus:border-sky-500 focus:ring-sky-500">
              <SelectValue placeholder="Chọn phân khúc" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-50 border-gray-600">
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="wholesale">Wholesale</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-600 hover:bg-gray-700"
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleSubmit(onSuccess, onClose)}
            disabled={loading}
            className="bg-sky-600 hover:bg-sky-700 text-white"
          >
            {loading ? "Đang tạo..." : "Tạo khách hàng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
