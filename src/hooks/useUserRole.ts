// src/hooks/useUserRole.ts

// Loại vai trò có thể có
type UserRole = "EVM_ADMIN" | "DEALER_MANAGER" | "DEALER_STAFF";

export function useUserRole(): UserRole {
  return "EVM_ADMIN";
}
