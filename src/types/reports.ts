// src/types/reports.ts

export interface InventoryItem {
  _id: string;
  ownerType: "Dealer" | string;
  owner: {
    _id: string;
    name: string;
    address: string;
  };
  variant: {
    _id: string;
    trim: string;
    msrp: number;
  };
  color: {
    _id: string;
    name: string;
    code: string;
  } | null;
  quantity: number;
  reserved: number;
  vinList: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryReportResponse {
  success: boolean;
  summary: {
    totalItems: number;
    totalQuantity: number;
    lowStockItems: number;
    outOfStockItems: number;
  };
  dealerStats: Record<
    string,
    {
      totalItems: number;
      totalQuantity: number;
      lowStockItems: number;
      outOfStockItems: number;
    }
  >;
  lowStockItems: InventoryItem[];
  outOfStockItems: InventoryItem[];
  allInventory: InventoryItem[];
}

export interface DealerDebt {
  _id: string;
  name: string;
  totalDebt: number;
  outstandingOrders: number;
  lastPaymentDate?: string;
}

export interface DebtReportResponse {
  success: boolean;
  summary: {
    totalDealers: number;
    totalDebt: number;
    dealersWithDebt: number;
    averageDebt: number;
  };
  dealers: DealerDebt[];
}
