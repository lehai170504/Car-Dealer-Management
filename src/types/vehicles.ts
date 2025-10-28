// src/types/vehicles.ts

/** Dữ liệu Vehicle Model */
export interface VehicleModel {
  _id: string;
  name: string;
  brand: string;
  segment: string;
  description?: string;
  active: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

/** Dữ liệu Vehicle Variant (response từ API) */
export interface Vehicle {
  _id: string;
  model: VehicleModel | null; // Có thể null như trong response
  trim: string;
  battery: string;
  range: number;
  motorPower: number;
  features: string[];
  msrp: number;
  images: string[];
  active: boolean;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

/** Response khi lấy danh sách Vehicles */
export interface VehicleListResponse {
  success: boolean;
  count: number;
  data: Vehicle[];
}

/** Response cho 1 Vehicle */
export interface VehicleResponse extends Vehicle {}

/** ✅ Request tạo Vehicle mới */
export interface CreateVehicleRequest {
  model: string; // ID model
  trim: string;
  battery: string;
  range: number;
  motorPower: number;
  features: string[];
  msrp: number;
  images: string[];
  active: boolean;
}

/** ✅ Request cập nhật Vehicle */
export interface UpdateVehicleRequest {
  trim?: string;
  battery?: string;
  range?: number;
  motorPower?: number;
  features?: string[];
  msrp?: number;
  images?: string[];
  active?: boolean;
}
