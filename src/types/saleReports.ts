export interface SalesReportResponse {
  success: boolean;
  period: {
    startDate: string | null;
    endDate: string | null;
  };
  summary: {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    confirmedOrders: number;
    deliveredOrders: number;
  };
  dealerStats: Record<
    string,
    {
      totalOrders: number;
      totalRevenue: number;
      pendingOrders: number;
      confirmedOrders: number;
      deliveredOrders: number;
      newOrders?: number | null;
    }
  >;
  orders: {
    _id: string;
    orderNo: string;
    dealer: {
      _id: string;
      name: string;
      address: string;
    };
    customer: {
      _id: string;
      fullName: string;
    };
    items: {
      variant: {
        _id: string;
        trim: string;
        msrp: number;
      };
      color: string;
      qty: number;
      unitPrice: number;
      vins: string[];
    }[];
    paymentMethod: "cash" | "finance" | string;
    deposit: number;
    status: "new" | "confirmed" | "delivered" | string;
    expectedDelivery: string;
    logs: any[];
    __v: number;
    createdAt: string;
    updatedAt: string;
  }[];
}
