import { Inventory } from "./inventory";

export type DealerStatus = "active" | "inactive";

export interface DealerContact {
  _id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Dealer {
  _id: string;
  name: string;
  code: string;
  region: string;
  address: string;
  contacts: DealerContact[];
  creditLimit: number;
  status: DealerStatus;
  createdAt: string;
  updatedAt: string;
  salesTarget?: number;
}

export interface CreateDealerRequest {
  name: string;
  code: string;
  region: string;
  address: string;
  contacts: DealerContact[];
  creditLimit: number;
  status?: DealerStatus;
}

export interface UpdateDealerRequest {
  name?: string;
  code?: string;
  region?: string;
  address?: string;
  contacts?: DealerContact[];
  creditLimit?: number;
  status?: DealerStatus;
}

export interface TargetDealerRequest {
  salesTarget: number;
}

export interface TargerDealerResponse {
  message: string;
  data: DealerResponse;
}

export interface DealerListResponse {
  success: boolean;
  count: number;
  data: Dealer[];
}

export interface DealerResponse extends Dealer {
  salesTarget?: number;
}

export interface DealerListInventory {
  success: boolean;
  count: number;
  data: DealerInventory[];
}

export type DealerInventory = Inventory;
