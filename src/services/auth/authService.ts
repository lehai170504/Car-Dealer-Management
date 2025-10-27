import axiosInstance from "@/utils/axiosInstance";
import {
  LoginCredentials,
  LoginResponse,
  UserProfile,
  RegisterCredentials,
} from "@/types/auth";

const endpoint = "/auth";

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    // Khai báo kiểu dữ liệu cho response để đảm bảo type-safety
    const response = await axiosInstance.post<LoginResponse>(
      `${endpoint}/login`,
      credentials
    );

    const { token, user } = response.data;

    // Lưu trữ Token và User Info vào LocalStorage
    localStorage.setItem("accessToken", token);
    // Lưu user dưới dạng chuỗi JSON
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    // Ném lỗi để component xử lý
    throw error;
  }
};

export const register = async (
  credentials: RegisterCredentials
): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.post(
      `${endpoint}/register`,
      credentials
    );
    const newUser = response.data.user;

    return newUser as UserProfile;
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post(`${endpoint}/logout`);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  } catch (error: any) {
    console.error("Logout API error:", error);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
};

export const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.get<UserProfile>(`${endpoint}/me`);
    return response.data;
  } catch (error) {
    // Xử lý lỗi: Thường là 401 Unauthorized nếu token hết hạn/không hợp lệ
    console.error("Get Profile API error:", error);
    throw error;
  }
};

export const refreshToken = async (): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post(`${endpoint}/refresh`);

    const { token, user } = response.data;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error("Refresh Token API error:", error);
    throw error;
  }
};
