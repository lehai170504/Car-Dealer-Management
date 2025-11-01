"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Plus, Pencil, Box } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types/users";
import { useUsers } from "@/hooks/useUsers";
import { UpdateUserModal } from "./UpdateUserModal";

export function UserTable() {
  const {
    filteredUsers,
    loading,
    error,
    search,
    setSearch,
    fetchUsers,
    deleteUser,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  // Bảo vệ filteredUsers để không bị undefined
  const safeUsers = filteredUsers || [];

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Xóa người dùng? Hành động này không thể hoàn tác!"
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      toast.success("Người dùng đã được xóa thành công");
    } catch (err: any) {
      toast.error(err.message || "Xóa người dùng thất bại");
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo tên, email, vai trò..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2"
          onClick={() => {
            setSelectedUser(null);
            setUpdateModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> Thêm Người Dùng
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <Box className="mr-2 h-5 w-5 animate-spin" />
            Đang tải dữ liệu người dùng...
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-6">{error}</div>
        ) : (
          <Table className="text-gray-50">
            <TableHeader className="bg-gray-700/90">
              <TableRow className="border-gray-700">
                <TableHead className="text-center font-medium w-[50px]">
                  STT
                </TableHead>
                <TableHead className="font-medium">Tên</TableHead>
                <TableHead className="font-medium">Email</TableHead>
                <TableHead className="font-medium">Vai trò</TableHead>
                <TableHead className="text-center font-medium">
                  Trạng thái
                </TableHead>
                <TableHead className="text-right font-medium">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {safeUsers.length > 0 ? (
                safeUsers.map((user, index) => (
                  <TableRow
                    key={user._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell>{user.profile.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          user.status === "active"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-500 text-gray-100"
                        }`}
                      >
                        {user.status === "active"
                          ? "Hoạt động"
                          : "Ngưng hoạt động"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-yellow-400 hover:bg-gray-700 hover:border-yellow-500 bg-gray-600"
                        onClick={() => {
                          setSelectedUser(user);
                          setUpdateModalOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-red-400 hover:bg-gray-700 bg-gray-600 hover:border-red-500"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-400 py-6"
                  >
                    Không có người dùng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Update User Modal */}
      {selectedUser && updateModalOpen && (
        <UpdateUserModal
          user={selectedUser}
          isOpen={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          onUpdated={fetchUsers}
        />
      )}
    </div>
  );
}
