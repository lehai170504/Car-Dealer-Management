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
    // Xử lý lỗi: Nếu Admin không có quyền (403) hoặc lỗi validation
    console.error("Registration API error:", error);
    throw error;
  }
};

/**
 * Xử lý logic đăng xuất.
 */
export const logout = (): void => {
  // Xóa Token và thông tin người dùng
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const getCurrentUser = (): UserProfile | null => {
  const userJson = localStorage.getItem("user");
  if (userJson) {
    try {
      return JSON.parse(userJson) as UserProfile;
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
      return null;
    }
  }
  return null;
};

export const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.get<UserProfile>(`${endpoint}/me`);

    // Dựa trên hình ảnh, BE trả về trực tiếp đối tượng UserProfile
    return response.data;
  } catch (error) {
    // Xử lý lỗi: Thường là 401 Unauthorized nếu token hết hạn/không hợp lệ
    console.error("Get Profile API error:", error);
    throw error;
  }
};
