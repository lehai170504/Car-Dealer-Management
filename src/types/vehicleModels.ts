// src/types/vehicleModels.ts

/** Dữ liệu Vehicle Model (response từ API) */
export interface VehicleModel {
  _id: string;
  name: string;
  brand: string;
  segment: string;
  description?: string;
  active: boolean;
  __v?: number;
  createdAt: string;
  updatedAt: string;
}

/** Response khi lấy danh sách Vehicle Models */
export interface VehicleModelListResponse {
  items: VehicleModel[];
  total: number;
  page: number;
  limit: number;
}

/** Response cho 1 Vehicle Model */
export interface VehicleModelResponse extends VehicleModel {}

/** ✅ Request tạo Vehicle Model mới */
export interface CreateVehicleModelRequest {
  name: string;
  brand: string;
  segment: string;
  description?: string;
  active: boolean;
}

/** ✅ Request cập nhật Vehicle Model */
export interface UpdateVehicleModelRequest {
  name?: string;
  brand?: string;
  segment?: string;
  description?: string;
  active?: boolean;
}
