import { Dealer } from "./dealer";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "DealerMangager" | "EVMStaff" | " DealerStaff" | string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive";
  profile: {
    name: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  refreshToken: string;
  token: string;
  user: UserProfile;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  role: "Admin" | "DealerManager" | "DealerStaff" | "EVMStaff";
  dealer?: Dealer; // optional vì Admin có thể không thuộc dealer
  profile: {
    name: string;
    phone: string;
  };
}
