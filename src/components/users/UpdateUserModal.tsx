"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/types/users";
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

  const [name, setName] = useState(user.profile.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<User["role"]>(user.role);
  const [status, setStatus] = useState<User["status"]>(user.status);
  const [dealerId, setDealerId] = useState<string | undefined>(
    user.dealer?._id
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user.profile.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    setDealerId(user.dealer?._id);
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const selectedDealer = dealers.find((d) => d._id === dealerId);

      await updateUser(user._id, {
        profile: { name },
        email,
        role,
        status,
        dealer: selectedDealer, // Dealer | undefined
      });

      toast.success("Cập nhật người dùng thành công!");
      onUpdated?.();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên người dùng"
              className="bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div className="grid gap-1">
            <Label htmlFor="role">Vai trò</Label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as User["role"])}
            >
              <SelectTrigger
                id="role"
                className="bg-gray-800 text-gray-100 border-gray-700"
              >
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="EVMStaff">EVMStaff</SelectItem>
                <SelectItem value="DealerManager">DealerManager</SelectItem>
                <SelectItem value="DealerStaff">DealerStaff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dealer select only for DealerManager/DealerStaff */}
          {(role === "DealerManager" || role === "DealerStaff") && (
            <div className="grid gap-1">
              <Label htmlFor="dealer">Dealer</Label>
              <Select value={dealerId} onValueChange={(v) => setDealerId(v)}>
                <SelectTrigger
                  id="dealer"
                  className="bg-gray-800 text-gray-100 border-gray-700"
                >
                  <SelectValue placeholder="Chọn Dealer" />
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
              onValueChange={(v) => setStatus(v as User["status"])}
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
          <Button variant="outline" onClick={onClose} disabled={loading}>
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
