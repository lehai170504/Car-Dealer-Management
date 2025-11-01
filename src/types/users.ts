import { Dealer } from "./dealer";

export interface UserProfile {
  name: string;
}

export type UserRole = "Admin" | "EVMStaff" | "DealerManager" | "DealerStaff";

export interface User {
  _id: string;
  profile: UserProfile;
  email: string;
  role: UserRole;
  dealer?: Dealer; // chỉ có DealerManager hoặc DealerStaff mới có
  status: "active" | "inactive";
  __v: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
