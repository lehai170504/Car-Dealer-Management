export type OrderStatus = "new" | "confirmed" | "delivered" | "cancelled";
export type PaymentMethod = "cash" | "finance";

export interface OrderItem {
  variant: string; // ID variant xe
  color: string; // ID color
  qty: number;
  unitPrice: number;
  vins?: string[]; // danh sách VINs (optional)
}

export interface Order {
  _id: string;
  orderNo: string;
  dealer: string; // ID đại lý
  customer: string; // ID khách hàng
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  deposit: number;
  status: OrderStatus;
  expectedDelivery?: string; // ISO string, optional
  actualDelivery?: string; // ISO string, optional
  logs: any[]; // có thể tạo type chi tiết nếu biết structure
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderListResponse {
  items: Order[];
  total: number;
  page: number;
  limit: number;
}

export interface OrderResponse extends Order {}

/* ✅ Request body khi tạo mới Order */
export interface CreateOrderRequest {
  customer: string;
  items: {
    variant: string;
    color: string;
    qty: number;
    unitPrice: number;
  }[];
  paymentMethod: PaymentMethod;
  deposit?: number;
}

/* ✅ Request body khi cập nhật Order */
export interface UpdateOrderRequest {
  status?: OrderStatus;
  paymentMethod?: PaymentMethod;
  deposit?: number;
  actualDelivery?: string; // ISO string
}
