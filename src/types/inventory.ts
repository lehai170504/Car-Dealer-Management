export interface DealerOwner {
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

export interface Inventory {
  _id: string;
  ownerType: "Dealer" | "Warehouse" | "Manufacturer";
  owner: DealerOwner;
  variant: InventoryVariant;
  color: InventoryColor;
  quantity: number;
  reserved: number;
  vinList: string[];
  location: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryCreateRequest {
  ownerType: "Dealer" | "Warehouse";
  owner: string;
  variant: string;
  color: string;
  quantity: number;
  reserved: number;
  vinList: string[];
  location: string;
}

export interface InventoryUpdateRequest {
  quantity: number;
  reserved: number;
  vinList: string[];
  location: string;
}

export type SimpleInventoryListResponse = Inventory[];
