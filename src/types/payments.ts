// src/types/payments.ts

/** Loại thanh toán */
export type PaymentType = "deposit" | "balance" | "refund";

/** Phương thức thanh toán */
export type PaymentMethod = "bank" | "cash" | "finance";

/** Trạng thái thanh toán */
export type PaymentStatus = "pending" | "confirmed" | "failed" | "cancelled";

/** Cấu trúc một Payment */
export interface Payment {
  _id: string;
  order: string; // ID đơn hàng liên kết
  type: PaymentType;
  amount: number;
  method: PaymentMethod;
  transactionRef: string;
  paidAt: string; // ISO string
  status: PaymentStatus;
  notes?: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

/** Danh sách Payment (phân trang) */
export interface PaymentListResponse {
  items: Payment[];
  total: number;
  page: number;
  limit: number;
}

/** Response cho 1 payment */
export interface PaymentResponse extends Payment {}

/** ✅ Request khi tạo mới thanh toán */
export interface CreatePaymentRequest {
  order: string; // ID order
  type: PaymentType;
  amount: number;
  method: PaymentMethod;
  transactionRef: string;
  paidAt: string; // ISO string
  status?: PaymentStatus;
  notes?: string;
}

/** ✅ Request khi cập nhật thanh toán */
export interface UpdatePaymentRequest {
  status?: PaymentStatus;
  transactionRef?: string;
  notes?: string;
}
