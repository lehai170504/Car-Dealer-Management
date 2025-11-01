"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "@/types/auth";
import {
  getProfile,
  logout as logoutAPI,
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

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedRefreshToken && storedUser) {
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);
          setUser(JSON.parse(storedUser));

          try {
            // Verify token by calling getProfile
            await getProfile();
          } catch {
            // Token expired → try refresh
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
        console.error("Auth init error:", error);
        await logoutUser();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Sync logout across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "accessToken" && !e.newValue) {
        setUser(null);
        setToken(null);
        setRefreshToken(null);
        window.location.href = "/auth/login";
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
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
      await logoutAPI();
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
