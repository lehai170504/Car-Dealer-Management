import { Dealer } from "./dealer";

// Trạng thái contract
export type ContractStatus = "draft" | "active" | "signed" | "cancelled";

// Thông tin contract
export interface Contract {
  _id: string;
  order: string; // ID order liên quan
  contractNo: string;
  signedDate?: string; // ISO string, chỉ có khi signed
  files: string[]; // danh sách file đính kèm
  terms: string;
  status: ContractStatus;
  __v: number;
  createdAt: string;
  updatedAt: string;
  targets: string;
}

// Response khi lấy chi tiết contract
export type ContractResponse = Contract;

/* ✅ Request body khi tạo mới Contract */
export interface CreateContractRequest {
  dealer: Dealer; // ID đại lý
  startDate: string; // ISO string hoặc "YYYY-MM-DD"
  endDate: string; // ISO string hoặc "YYYY-MM-DD"
  targets: string; // mục tiêu hợp đồng
  discountPolicyRef: string; // tham chiếu chính sách giảm giá
  status: ContractStatus; // active, draft, ...
}

/* ✅ Request body khi cập nhật Contract */
export interface UpdateContractRequest {
  targets?: string;
  status?: ContractStatus;
}
