// src/hooks/useUserRole.ts

// Loại vai trò có thể có
type UserRole = 'EVM_ADMIN' | 'DEALER_MANAGER' | 'DEALER_STAFF';

/**
 * Hook giả định để lấy vai trò người dùng hiện tại.
 * Trong môi trường thực tế, dữ liệu này sẽ lấy từ context hoặc API.
 * * NOTE: Bạn hãy chỉnh sửa giá trị trả về để kiểm tra vai trò.
 */
export function useUserRole(): UserRole {
    // === CHỈNH SỬA VAI TRÒ Ở ĐÂY ĐỂ KIỂM TRA ===
    // Ví dụ: return 'EVM_ADMIN';
    // Ví dụ: return 'DEALER_MANAGER';
    
    // Giả định trả về vai trò Hãng xe (EVM)
    return 'EVM_ADMIN'; 
}