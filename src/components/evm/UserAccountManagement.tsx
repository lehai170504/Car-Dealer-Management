"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, Unlock, Lock } from "lucide-react";
import { AddAccountModal } from "./AddAccountModal";

const initialAccounts = [
  {
    id: 101,
    name: "Phạm Tuấn Anh",
    role: "Dealer Manager",
    dealer: "DL001",
    status: "Active",
    lastLogin: "2025-10-05",
  },
  {
    id: 102,
    name: "Nguyễn Thị Hoa",
    role: "Dealer Staff",
    dealer: "DL002",
    status: "Active",
    lastLogin: "2025-10-06",
  },
  {
    id: 103,
    name: "Lê Văn Khải",
    role: "Dealer Staff",
    dealer: "DL001",
    status: "Inactive",
    lastLogin: "2025-08-20",
  },
];

export function EVM_UserAccountManagement() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAdminOrEVM = (role: string) => role.includes("EVM");

  const handleAddAccount = (account: any) => {
    setAccounts([...accounts, account]);
  };

  const toggleStatus = (id: number) => {
    setAccounts(
      accounts.map((acc) =>
        acc.id === id
          ? { ...acc, status: acc.status === "Active" ? "Inactive" : "Active" }
          : acc
      )
    );
  };

  return (
    <div className="space-y-4 text-gray-100 p-4">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Tạo Tài khoản mới
      </Button>

      {/* Modal */}
      <AddAccountModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddAccount}
      />

      <div className="border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-gray-800/90 border-b border-gray-700">
            <TableRow>
              <TableHead className="text-gray-300">ID</TableHead>
              <TableHead className="text-gray-300">Tên Người dùng</TableHead>
              <TableHead className="text-gray-300">Vai trò</TableHead>
              <TableHead className="text-gray-300">Đại lý</TableHead>
              <TableHead className="text-gray-300">
                Đăng nhập gần nhất
              </TableHead>
              <TableHead className="text-gray-300">Trạng thái</TableHead>
              <TableHead className="text-right text-gray-300">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-gray-800">
            {accounts.map((account) => (
              <TableRow
                key={account.id}
                className={`border-gray-700 ${
                  !isAdminOrEVM(account.role)
                    ? "bg-gray-900/50 hover:bg-gray-700/70"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <TableCell className="text-gray-400">{account.id}</TableCell>
                <TableCell className="font-medium text-gray-200">
                  {account.name}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      isAdminOrEVM(account.role)
                        ? "bg-purple-700/70 hover:bg-purple-800 text-white border-purple-800"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    }
                  >
                    {account.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-300">
                  {account.dealer === "N/A" ? "HQ - EVM" : account.dealer}
                </TableCell>
                <TableCell className="text-gray-400">
                  {account.lastLogin}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      account.status === "Active"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-red-600/50 text-red-300 border-red-700 hover:bg-red-600/70"
                    }
                  >
                    {account.status === "Active" ? "Hoạt động" : "Khóa"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => toggleStatus(account.id)}
                    className={
                      account.status === "Active"
                        ? "bg-red-600/50 hover:bg-red-700/70 text-red-300 border border-red-700"
                        : "bg-emerald-600/50 hover:bg-emerald-700/70 text-emerald-300 border border-emerald-700"
                    }
                  >
                    {account.status === "Active" ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Unlock className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
