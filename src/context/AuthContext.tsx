"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "@/types/auth";
import {
  getProfile,
  logout,
  refreshToken as refreshTokenAPI,
} from "@/services/auth/authService";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loginUser: (user: UserProfile, token: string, refreshToken: string) => void;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (storedToken && storedRefreshToken) {
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);

          try {
            const profile = await getProfile();
            setUser(profile);
          } catch (error: any) {
            // Nếu token hết hạn → thử refresh
            console.warn("Access token expired, trying to refresh...");

            const refreshed = await refreshTokenAPI();
            setToken(refreshed.token);
            setRefreshToken(refreshed.refreshToken);
            setUser(refreshed.user);

            localStorage.setItem("accessToken", refreshed.token);
            localStorage.setItem("refreshToken", refreshed.refreshToken);
            localStorage.setItem("user", JSON.stringify(refreshed.user));
          }
        }
      } catch (error) {
        console.error("AuthContext initAuth error:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        setRefreshToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const loginUser = (
    user: UserProfile,
    token: string,
    refreshToken: string
  ) => {
    setUser(user);
    setToken(token);
    setRefreshToken(refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      setUser(null);
      setToken(null);
      setRefreshToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        isAuthenticated: !!user && !!token && !!refreshToken,
        loginUser,
        logoutUser,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
