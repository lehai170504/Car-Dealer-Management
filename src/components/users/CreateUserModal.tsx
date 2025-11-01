"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useCreateUser } from "@/hooks/useCreateUser";
import { CreateUserRequest } from "@/types/users";
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

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const { createUser, dealers, loadingDealers, isLoading } = useCreateUser();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<CreateUserRequest["role"]>("DealerStaff");
  const [dealerId, setDealerId] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const selectedDealer = dealers.find((d) => d._id === dealerId);

      const payload: CreateUserRequest = {
        email,
        password,
        role,
        dealer: selectedDealer,
        profile: { name, phone },
      };

      await createUser(payload);
      toast.success("Tạo người dùng thành công!");
      onCreated?.();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Tạo người dùng thất bại");
    }
  };

  const showDealerSelect = role === "DealerManager" || role === "DealerStaff";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-gray-100">
        <DialogHeader>
          <DialogTitle>Thêm người dùng mới</DialogTitle>
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

          {/* Phone */}
          <div className="grid gap-1">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
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

          {/* Password */}
          <div className="grid gap-1">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div className="grid gap-1">
            <Label htmlFor="role">Vai trò</Label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as CreateUserRequest["role"])}
            >
              <SelectTrigger
                id="role"
                className="bg-gray-800 text-gray-100 border-gray-700"
              >
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-100">
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="DealerManager">DealerManager</SelectItem>
                <SelectItem value="DealerStaff">DealerStaff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dealer (conditional) */}
          {showDealerSelect && (
            <div className="grid gap-1">
              <Label htmlFor="dealer">Đại lý</Label>
              <Select
                value={dealerId}
                onValueChange={(v) => setDealerId(v)}
                disabled={loadingDealers}
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
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            className="text-gray-500"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-sky-600 text-white hover:bg-sky-700"
          >
            {isLoading ? "Đang tạo..." : "Tạo người dùng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
