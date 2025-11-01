// src/types/inventoryReport.ts

export interface InventoryOwner {
  _id: string;
  name: string;
  address: string;
}

export interface InventoryVariant {
  _id: string;
  trim: string;
  msrp: number;
}

export interface InventoryColor {
  _id: string;
  name: string;
  code: string;
}

export interface InventoryItem {
  _id: string;
  ownerType: "Dealer" | "Warehouse" | string;
  owner: InventoryOwner;
  variant: InventoryVariant;
  color: InventoryColor;
  quantity: number;
  reserved: number;
  vinList: string[];
  __v?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LowStockItem {
  id: string;
  variant: string;
  color: string;
  owner: string;
  ownerType: "Dealer" | "Warehouse" | string;
  quantity: number;
}

export interface DealerInventoryStats {
  totalItems: number;
  totalQuantity: number;
  lowStockItems: number;
  outOfStockItems: number;
}

export interface InventoryReportSummary {
  totalItems: number;
  totalQuantity: number;
  lowStockItems: number;
  outOfStockItems: number;
}

export interface InventoryReportResponse {
  success: boolean;
  summary: InventoryReportSummary;
  dealerStats: Record<string, DealerInventoryStats>;
  lowStockItems: LowStockItem[];
  outOfStockItems: LowStockItem[];
  allInventory: InventoryItem[];
}
