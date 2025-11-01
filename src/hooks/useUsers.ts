import { useState, useEffect, useCallback, useMemo } from "react";
import { UpdateUserRequest, User } from "@/types/users";
import { userService } from "@/services/users/userService";
import { updateUserSchema } from "@/validations/userSchema";
import { useDealers } from "./useDealers";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // ✅ Lấy dealers và trạng thái từ useDealers
  const { dealers, fetchDealers, loading: dealersLoading } = useDealers();

  /** 🟦 Lấy danh sách users */
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err?.message || "Lấy danh sách người dùng thất bại");
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🟦 Cập nhật user với validate */
  const updateUser = useCallback(
    async (id: string, payload: Partial<UpdateUserRequest>) => {
      setLoading(true);
      setError(null);
      try {
        await updateUserSchema.validate(payload, { abortEarly: false });
        const updatedUser = await userService.updateUser(id, payload);
        setUsers((prev) => prev.map((u) => (u._id === id ? updatedUser : u)));
        return updatedUser;
      } catch (err: any) {
        if (err.name === "ValidationError") {
          const messages = err.errors.join(", ");
          setError(messages);
          throw new Error(messages);
        }
        setError(err?.message || "Cập nhật thông tin người dùng thất bại");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /** 🟦 Xóa user */
  const deleteUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err: any) {
      setError(err?.message || "Xóa người dùng thất bại");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** 🟦 Lọc danh sách user theo search */
  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const lower = search.toLowerCase();
    return users.filter(
      (u) =>
        u.profile.name.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower) ||
        u.role.toLowerCase().includes(lower)
    );
  }, [users, search]);

  /** 🟩 Gọi API users + dealers khi mount */
  useEffect(() => {
    fetchUsers();
    fetchDealers();
  }, [fetchUsers, fetchDealers]);

  return {
    users,
    filteredUsers,
    dealers,
    loading: loading || dealersLoading,
    error,
    search,
    setSearch,
    fetchUsers,
    updateUser,
    deleteUser,
  };
};
