// hooks/useUserProfile.ts
import { useState, useEffect } from "react";
import { UserProfile } from "@/types/auth";
import { getProfile } from "@/services/auth/authService";

interface UseUserProfileResult {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  userName: string;
  setUserName: (name: string) => void;
  refreshProfile: () => Promise<void>;
}

export const useUserProfile = (): UseUserProfileResult => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState("");

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const profileData = await getProfile();
      if (profileData) {
        setUserProfile(profileData);
        setUserName(profileData.profile?.name || "");
      } else {
        setUserProfile(null);
        setError("Không tìm thấy thông tin người dùng.");
      }
    } catch (err: any) {
      console.error("Lỗi khi tải profile:", err);
      setUserProfile(null);
      setError(err.message || "Đã xảy ra lỗi không xác định.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    userProfile,
    isLoading,
    error,
    userName,
    setUserName,
    refreshProfile: fetchProfile,
  };
};
