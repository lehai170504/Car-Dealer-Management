"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddAccountModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (account: {
    id: number;
    name: string;
    role: string;
    dealer: string;
    status: string;
    lastLogin: string;
  }) => void;
}

export function AddAccountModal({
  open,
  onClose,
  onAdd,
}: AddAccountModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [dealer, setDealer] = useState("");

  const handleSubmit = () => {
    if (!name || !role) return;
    const newAccount = {
      id: Date.now(), // tạm thời dùng timestamp
      name,
      role,
      dealer: dealer || "N/A",
      status: "Active",
      lastLogin: new Date().toISOString().slice(0, 10),
    };
    onAdd(newAccount);
    setName("");
    setRole("");
    setDealer("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle>Thêm Tài khoản mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Tên người dùng</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="role">Vai trò</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="VD: Dealer Staff, EVM Manager..."
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="dealer">Đại lý</Label>
            <Input
              id="dealer"
              value={dealer}
              onChange={(e) => setDealer(e.target.value)}
              placeholder="N/A nếu thuộc EVM HQ"
              className="bg-gray-800 text-white border-gray-600"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Lưu
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
