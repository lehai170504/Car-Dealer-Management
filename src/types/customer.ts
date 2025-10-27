export type Segment = "retail" | "wholesale";

export interface Customer {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  segment: Segment; // chỉ cho phép 2 giá trị
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerCredentials {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  segment?: Segment; // optional khi tạo mới
}

export interface CustomerListResponse {
  items: Customer[];
  total: number;
  page: number;
  limit: number;
}

// Response khi lấy chi tiết 1 khách hàng
export interface CustomerResponse extends Customer {}
