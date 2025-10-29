export type PromotionScope = "global" | "byDealer";
export type PromotionType = "cashback" | "discount"; // có thể mở rộng nếu có thêm loại khác
export type PromotionStatus = "active" | "inactive";

/** ✅ Response body của từng promotion */
export interface Promotion {
  _id: string;
  name: string;
  scope: PromotionScope;
  dealers: string[] | Dealer[]; // có thể là danh sách ID hoặc object chi tiết
  variants: string[];
  type: PromotionType;
  value: number;
  stackable: boolean;
  validFrom: string; // ISO string
  validTo: string; // ISO string
  status: PromotionStatus;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

/** ✅ Response khi lấy danh sách promotion */
export type PromotionListResponse = Promotion[];

/** ✅ Response chi tiết 1 promotion */
export interface PromotionResponse extends Promotion {}

/* ✅ Request body khi tạo mới Promotion */
export interface CreatePromotionRequest {
  name: string;
  scope: PromotionScope;
  dealers?: string[]; // danh sách dealer IDs
  variants?: string[]; // danh sách variant IDs
  type: PromotionType;
  value: number;
  stackable: boolean;
  validFrom: string; // ISO string
  validTo: string; // ISO string
  status: PromotionStatus;
}

/* ✅ Request body khi cập nhật Promotion */
export interface UpdatePromotionRequest {
  name?: string;
  scope?: PromotionScope;
  dealers?: string[];
  variants?: string[];
  type?: PromotionType;
  value?: number;
  stackable?: boolean;
  validFrom?: string;
  validTo?: string;
  status?: PromotionStatus;
}

/** Optional: nếu muốn dùng object dealer chi tiết */
export interface Dealer {
  _id: string;
  name: string;
  address?: string;
}
