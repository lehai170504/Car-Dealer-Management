import { InventoryTable } from "@/components/inventory/InventoryTable";

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-50 p-6 sm:p-10">
      {/* Tiêu đề trang */}
      <div className="mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-sky-500">
          Quản Lý Hàng Tồn Kho
        </h1>
        <p className="text-gray-400 mt-1">
          Xem, tìm kiếm, thêm, chỉnh sửa và xóa các bản ghi tồn kho xe điện.
        </p>
      </div>

      <InventoryTable />
    </div>
  );
}
