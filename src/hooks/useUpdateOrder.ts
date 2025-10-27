// src/hooks/useUpdateOrder.ts
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { orderService } from "@/services/orders/ordersService";
import type {
  Order,
  OrderStatus,
  PaymentMethod,
  UpdateOrderRequest,
} from "@/types/orders";

export const useUpdateOrder = (initialOrder: Order) => {
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState<{
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    deposit: number;
    actualDelivery?: string;
  }>({
    status: initialOrder.status,
    paymentMethod: initialOrder.paymentMethod,
    deposit: initialOrder.deposit || 0,
    actualDelivery: initialOrder.actualDelivery,
  });

  const [loading, setLoading] = useState(false);

  /** Đồng bộ dữ liệu khi initialOrder thay đổi */
  useEffect(() => {
    setFormData({
      status: initialOrder.status,
      paymentMethod: initialOrder.paymentMethod,
      deposit: initialOrder.deposit || 0,
      actualDelivery: initialOrder.actualDelivery,
    });
  }, [initialOrder]);

  /** Cập nhật giá trị trong formData */
  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /** Chuẩn bị payload update */
  const getUpdatePayload = (): UpdateOrderRequest => {
    const payload: UpdateOrderRequest = {
      status: formData.status,
      paymentMethod: formData.paymentMethod,
      deposit: formData.deposit > 0 ? formData.deposit : undefined,
    };

    if (formData.actualDelivery) {
      payload.actualDelivery = formData.actualDelivery;
    }

    return payload;
  };

  /** Gửi request cập nhật Order */
  const handleUpdate = async (onUpdated: () => void, onClose: () => void) => {
    try {
      setLoading(true);
      const payload = getUpdatePayload();
      await orderService.updateOrder(initialOrder._id, payload);

      Swal.fire("Thành công", "Cập nhật order thành công!", "success");

      setEditMode(false);
      onUpdated();
      onClose();
    } catch (err: any) {
      console.error(err);
      Swal.fire("Lỗi", err?.message || "Không thể cập nhật order", "error");
    } finally {
      setLoading(false);
    }
  };

  /** Hủy chỉnh sửa và reset form */
  const cancelEdit = () => {
    setEditMode(false);
    setFormData({
      status: initialOrder.status,
      paymentMethod: initialOrder.paymentMethod,
      deposit: initialOrder.deposit || 0,
      actualDelivery: initialOrder.actualDelivery,
    });
  };

  return {
    editMode,
    setEditMode,
    formData,
    loading,
    handleChange,
    handleUpdate,
    cancelEdit,
  };
};
