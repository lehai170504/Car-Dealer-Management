// src/types/vehicleColors.ts

/** Dữ liệu Vehicle Color (response từ API) */
export interface VehicleColor {
  _id: string;
  name: string;
  code: string;
  hex: string;
  extraPrice: number;
  active: boolean;
  __v?: number;
  createdAt: string;
  updatedAt: string;
}

/** Response khi lấy danh sách Vehicle Colors */
export interface VehicleColorListResponse {
  items: VehicleColor[];
  total: number;
  page: number;
  limit: number;
}

/** Response cho 1 Vehicle Color */
export interface VehicleColorResponse extends VehicleColor {}

/** ✅ Request tạo Vehicle Color mới */
export interface CreateVehicleColorRequest {
  name: string;
  code: string;
  hex: string;
  extraPrice: number;
  active: boolean;
}

/** ✅ Request cập nhật Vehicle Color */
export interface UpdateVehicleColorRequest {
  name?: string;
  code?: string;
  hex?: string;
  extraPrice?: number;
  active?: boolean;
}
