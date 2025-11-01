"use client";

import React, { useState, useEffect } from "react";
import { User, UpdateUserRequest } from "@/types/users";
import { useUsers } from "@/hooks/useUsers";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdated,
}) => {
  const { updateUser, dealers } = useUsers();

  const [formData, setFormData] = useState<UpdateUserRequest>({
    profile: { name: user.profile.name, phone: user.profile.phone },
    role: user.role,
    status: user.status,
    dealer: user.dealer,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      profile: { name: user.profile.name, phone: user.profile.phone },
      role: user.role,
      status: user.status,
      dealer: user.dealer,
    });
  }, [user]);

  const handleChange = (
    key: "role" | "status" | "dealerId" | "name" | "phone",
    value: any
  ) => {
    if (key === "dealerId") {
      const selectedDealer = dealers.find((d) => d._id === value);
      setFormData((prev) => ({ ...prev, dealer: selectedDealer }));
    } else if (key === "role" || key === "status") {
      setFormData((prev) => ({ ...prev, [key]: value }));
    } else if (key === "name" || key === "phone") {
      setFormData((prev) => ({
        ...prev,
        profile: { ...prev.profile, [key]: value },
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Tạo payload mới chỉ gồm các field thay đổi hoặc giữ nguyên dữ liệu cũ có giá trị
      const updatedPayload: UpdateUserRequest = {
        profile: {
          name:
            formData.profile.name !== user.profile.name
              ? formData.profile.name
              : user.profile.name,
          phone:
            formData.profile.phone !== user.profile.phone
              ? formData.profile.phone
              : user.profile.phone,
        },
        role: formData.role || user.role,
        status: formData.status || user.status,
        dealer:
          formData.role === "Admin" || formData.role === "EVMStaff"
            ? undefined // admin/EVMStaff không cần dealer
            : formData.dealer || user.dealer,
      };

      await updateUser(user._id, updatedPayload);
      toast.success("Cập nhật người dùng thành công!");
      onUpdated?.();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  const { profile, role, status, dealer } = formData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100">
        <DialogHeader>
          <DialogTitle>Cập nhật người dùng</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid gap-1">
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nhập tên người dùng"
              className="bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="grid gap-1">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Nhập số điện thoại"
              className="bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div className="grid gap-1">
            <Label htmlFor="role">Vai trò</Label>
            <Select
              value={role}
              onValueChange={(v) => handleChange("role", v as User["role"])}
            >
              <SelectTrigger
                id="role"
                className="bg-gray-800 text-gray-100 border-gray-700"
              >
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="EVMStaff">EVM Staff</SelectItem>
                <SelectItem value="DealerManager">Dealer Manager</SelectItem>
                <SelectItem value="DealerStaff">Dealer Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dealer select chỉ hiện khi role là DealerManager/DealerStaff */}
          {(role === "DealerManager" || role === "DealerStaff") && (
            <div className="grid gap-1">
              <Label htmlFor="dealer">Đại lý</Label>
              <Select
                value={dealer?._id}
                onValueChange={(v) => handleChange("dealerId", v)}
              >
                <SelectTrigger
                  id="dealer"
                  className="bg-gray-800 text-gray-100 border-gray-700"
                >
                  <SelectValue placeholder="Chọn đại lý" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-100">
                  {dealers.map((d) => (
                    <SelectItem key={d._id} value={d._id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Status */}
          <div className="grid gap-1">
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              value={status}
              onValueChange={(v) => handleChange("status", v as User["status"])}
            >
              <SelectTrigger
                id="status"
                className="bg-gray-800 text-gray-100 border-gray-700"
              >
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Ngưng hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            className="text-gray-600"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-sky-600 text-white hover:bg-sky-700"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
