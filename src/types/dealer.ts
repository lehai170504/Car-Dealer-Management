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
}

export interface DealerCredentials {
  name: string;
  code: string;
  region: string;
  address: string;
  contacts: DealerContact[];
  creditLimit: number;
  status?: DealerStatus;
}

export interface DealerListResponse {
  items: Dealer[];
  total: number;
  page: number;
  limit: number;
}

export interface DealerResponse extends Dealer {}
