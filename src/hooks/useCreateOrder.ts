// src/hooks/useCreateOrder.ts
import { useState } from "react";
import Swal from "sweetalert2";
import { orderService } from "@/services/orders/ordersService";
import type {
  CreateOrderRequest,
  PaymentMethod,
  OrderItem,
} from "@/types/orders";

/**
 * Hook quản lý form tạo mới Order
 */
export const useCreateOrder = () => {
  const [customer, setCustomer] = useState(""); // ID khách hàng
  const [dealer, setDealer] = useState(""); // ID đại lý
  const [items, setItems] = useState<OrderItem[]>([]); // Danh sách sản phẩm trong order
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [deposit, setDeposit] = useState<number>(0);

  const [loading, setLoading] = useState(false);

  // Reset toàn bộ form
  const resetForm = () => {
    setCustomer("");
    setDealer("");
    setItems([]);
    setPaymentMethod("cash");
    setDeposit(0);
  };

  // Submit form tạo order
  const handleSubmit = async (onSuccess: () => void, onClose: () => void) => {
    // Validation cơ bản
    if (!customer || !dealer || items.length === 0) {
      Swal.fire(
        "Thiếu thông tin",
        "Vui lòng nhập đầy đủ thông tin khách hàng, đại lý và sản phẩm!",
        "warning"
      );
      return;
    }

    // Kiểm tra item có qty > 0 và unitPrice > 0
    const invalidItem = items.find(
      (i) => i.qty <= 0 || i.unitPrice <= 0 || !i.variant || !i.color
    );
    if (invalidItem) {
      Swal.fire(
        "Thông tin sản phẩm không hợp lệ",
        "Vui lòng kiểm tra số lượng, đơn giá và màu/variant của từng sản phẩm!",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: CreateOrderRequest = {
        customer,
        items: items.map((i) => ({
          variant: i.variant,
          color: i.color,
          qty: i.qty,
          unitPrice: i.unitPrice,
        })),
        paymentMethod,
        deposit: deposit > 0 ? deposit : undefined,
      };

      await orderService.createOrder(payload);

      Swal.fire("Thành công!", "Đã tạo order mới.", "success");

      resetForm();
      onClose();
      onSuccess();
    } catch (error: any) {
      console.error("❌ Error creating order:", error);
      Swal.fire(
        "Lỗi",
        error?.message || "Không thể tạo order. Vui lòng thử lại.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    customer,
    setCustomer,
    dealer,
    setDealer,
    items,
    setItems,
    paymentMethod,
    setPaymentMethod,
    deposit,
    setDeposit,
    loading,
    handleSubmit,
    resetForm,
  };
};
