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
  token: string;
  user: UserProfile;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Dealer Manager" | "Dealer Staff" | string;
}
