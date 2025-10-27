export type TestDriveStatus = "confirmed" | "done" | "cancelled";

export interface TestDriveResult {
  feedback?: string;
  interestRate?: number;
}

export interface TestDrive {
  _id: string;
  customer: string; // ID của khách hàng
  dealer: string; // ID của dealer
  variant: string; // ID của variant xe
  preferredTime: string; // ISO string
  status: TestDriveStatus;
  assignedStaff?: string; // optional, ID nhân viên phụ trách
  result?: TestDriveResult;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface TestDriveListResponse {
  items: TestDrive[];
  total: number;
  page: number;
  limit: number;
}

export interface TestDriveResponse extends TestDrive {}

/* ✅ Request body khi tạo mới Test Drive */
export interface CreateTestDriveRequest {
  customer: string; // ID khách hàng
  dealer: string; // ID đại lý
  variant: string; // ID variant xe
  preferredTime: string; // ISO string (VD: "2024-12-26T10:00:00Z")
  status: TestDriveStatus;
  assignedStaff?: string; // optional
}

/* ✅ Request body khi cập nhật Test Drive */
export interface UpdateTestDriveRequest {
  status?: TestDriveStatus; // có thể chỉ cập nhật trạng thái
  result?: TestDriveResult; // hoặc thêm kết quả phản hồi
}
