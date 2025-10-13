"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Eye, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateCustomerModal } from "@/components/dealer/CreateCustomerModal";
import { ViewCustomerModal } from "@/components/dealer/ViewCustomerModal";
import { customerService } from "@/services/customer/customerService";
import Swal from "sweetalert2";
import { Customer } from "@/types/customer";

export function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Lỗi khi tải danh sách khách hàng:", err);
      setError(err.message || "Không thể tải danh sách khách hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Xóa khách hàng?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await customerService.deleteCustomer(id);
      Swal.fire("Đã xóa!", "Khách hàng đã bị xóa thành công.", "success");
      fetchCustomers();
    } catch (err) {
      Swal.fire("Lỗi", "Không thể xóa khách hàng", "error");
    }
  };

  // Lọc client-side
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {/* Search */}
        <div className="relative w-1/3 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm theo tên, SĐT..."
            className="pl-10 bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-500 focus:border-sky-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Thêm mới */}
        <Button
          className="bg-sky-600 hover:bg-sky-700"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm Khách hàng mới
        </Button>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <div className="flex items-center justify-center py-10 text-gray-400">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Đang tải dữ liệu khách hàng...
        </div>
      ) : error ? (
        <div className="text-red-400 text-center py-6">{error}</div>
      ) : (
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <Table className="bg-gray-800 text-gray-50">
            <TableHeader className="bg-gray-700/80">
              <TableRow className="border-gray-700 hover:bg-gray-700/80">
                <TableHead className="text-gray-200">Tên Khách hàng</TableHead>
                <TableHead className="text-gray-200">Điện thoại</TableHead>
                <TableHead className="text-gray-200">Email</TableHead>
                <TableHead className="text-gray-200">Địa chỉ</TableHead>
                <TableHead className="text-gray-200">Phản hồi</TableHead>
                <TableHead className="text-right text-gray-200">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer._id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-100">
                      {customer.name}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {customer.email}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {customer.address}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {customer.feedback || "—"}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-sky-400 hover:bg-gray-700 hover:border-sky-500"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setViewModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-600 text-red-400 hover:bg-gray-700 hover:border-red-500"
                        onClick={() => handleDelete(customer._id!)}
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
                    Không có khách hàng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal thêm khách hàng */}
      <CreateCustomerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCustomers}
      />

      {/* Modal xem/chỉnh sửa */}
      {selectedCustomer && (
        <ViewCustomerModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          customer={selectedCustomer}
          onUpdated={fetchCustomers}
        />
      )}
    </div>
  );
}
