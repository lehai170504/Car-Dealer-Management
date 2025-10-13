export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Dealer Mangager" | "EVM Staff" | " Dealer Staff" | string;
  createdAt: string;
  updatedAt: string;
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
