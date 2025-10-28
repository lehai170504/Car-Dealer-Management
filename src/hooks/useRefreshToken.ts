"use client";

import { useState } from "react";
import { refreshToken as refreshTokenAPI } from "@/services/auth/authService";
import type { LoginResponse, UserProfile } from "@/types/auth";
import axiosInstance from "@/utils/axiosInstance";

export function useRefreshToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async (): Promise<{
    token: string;
    user?: UserProfile;
  } | null> => {
    setLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await refreshTokenAPI();

      if (!response?.token) {
        console.warn("⚠️ Không có access token trong response:", response);
        return null;
      }

      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;

      return { token: response.token, user: response.user };
    } catch (err: unknown) {
      console.error("❌ Refresh token error:", err);

      const message =
        err instanceof Error ? err.message : "Failed to refresh token";
      setError(message);

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { refresh, loading, error };
}
