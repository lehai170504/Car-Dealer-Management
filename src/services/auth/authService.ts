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

    const { token, user, refreshToken } = response.data;

    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("refreshToken", refreshToken);

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
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedRefreshToken) {
      throw new Error("Không tìm thấy refresh token. Vui lòng đăng nhập lại.");
    }

    const response = await axiosInstance.post<LoginResponse>(
      `${endpoint}/refresh`,
      { refreshToken: storedRefreshToken }
    );

    const { token, refreshToken: newRefreshToken, user } = response.data;

    // 🔹 Cập nhật lại localStorage
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error("Refresh Token API error:", error);
    // Nếu refresh token không hợp lệ → logout
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    throw error;
  }
};
