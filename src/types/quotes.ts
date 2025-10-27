export interface QuoteItem {
  variant: string; // ID của variant xe
  color: string; // ID của màu
  qty: number;
  unitPrice: number;
  promotionApplied?: string[];
}

export interface QuoteFees {
  registration: number;
  plate: number;
  delivery: number;
}

export type QuoteStatus = "draft" | "sent" | "completed" | "cancelled";

export interface QuoteCredentials {
  customer: string; // ID customer
  items: QuoteItem[];
  subtotal: number;
  discount: number;
  promotionTotal?: number;
  total: number;
  validUntil: string; // ISO date string
  notes?: string;
  fees?: QuoteFees;
  status: QuoteStatus; // optional khi tạo mới
}

// Quote trả về từ backend
export interface Quote extends QuoteCredentials {
  _id: string;
  dealer: string; // ID dealer
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Request khi update quote
export interface QuoteUpdateRequest {
  status?: QuoteStatus;
  subtotal?: number;
  discount?: number;
  total?: number;
  validUntil?: string; // ISO date string
  notes?: string;
  fees?: QuoteFees;
}

// Response khi lấy danh sách quotes
export interface QuoteListResponse {
  items: Quote[];
  total: number;
  page: number;
  limit: number;
}
