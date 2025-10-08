'use client';

// Đã loại bỏ import Link từ "next/link" để tương thích với môi trường Canvas.
import { Car, BarChart, Users, ShoppingCart, Settings, Zap } from "lucide-react";

// Hàm tiện ích đơn giản để hợp nhất class (thay thế cn từ "@/lib/utils")
const cn = (...classes: (string | boolean | undefined)[]): string => {
    return classes.filter(Boolean).join(' ');
};

// Định nghĩa cấu trúc Menu cho từng vai trò
interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

// Giả định: Sử dụng trạng thái giả định của path cho demo.
const SIMULATED_PATH = '/evm/dashboard'; 

const dealerMenu: NavItem[] = [
  { title: "Dashboard", href: "/dealer/dashboard", icon: <BarChart className="h-4 w-4" /> },
  { title: "Quản lý Xe", href: "/dealer/catalog", icon: <Car className="h-4 w-4" /> },
  { title: "Bán hàng", href: "/dealer/sales", icon: <ShoppingCart className="h-4 w-4" /> },
  { title: "Khách hàng", href: "/dealer/customers", icon: <Users className="h-4 w-4" /> },
  { title: "Báo cáo", href: "/dealer/reports", icon: <BarChart className="h-4 w-4" /> },
];

const evmMenu: NavItem[] = [
  { title: "Dashboard", href: "/evm/dashboard", icon: <BarChart className="h-4 w-4" /> },
  { title: "Sản phẩm & Phân phối", href: "/evm/products", icon: <Car className="h-4 w-4" /> },
  { title: "Quản lý Đại lý", href: "/evm/dealer", icon: <Settings className="h-4 w-4" /> },
  { title: "Báo cáo Tài chính", href: "/evm/finance", icon: <BarChart className="h-4 w-4" /> },
];


export function Sidebar({ role }: { role: 'dealer' | 'evm' }) {
  const menuItems = role === 'dealer' ? dealerMenu : evmMenu;

  return (
    // Sử dụng tông màu tối cho cảm giác chuyên nghiệp và công nghệ
    <div className="flex h-full w-64 flex-col space-y-6 bg-gray-900 text-gray-200 border-r border-gray-800 shadow-2xl p-4">
      
      {/* HEADER / LOGO BRANDING */}
      <div className="flex items-center space-x-2 p-2 pt-4 border-b border-gray-700/50 pb-4">
        <Zap className="h-6 w-6 text-emerald-400" />
        <span className="text-2xl font-extrabold tracking-tight text-white">
          {role === 'dealer' ? "DEALER PORTAL" : "EVM ADMIN"}
        </span>
      </div>
      
      {/* NAVIGATION MENU */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => {
            // Giả lập trạng thái active
            const isActive = SIMULATED_PATH === item.href; 
            
            return (
                // Thay thế Link bằng thẻ a
                <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                        "text-gray-400 hover:bg-gray-700 hover:text-white", // Default & Hover State
                        isActive && 
                        "text-white bg-emerald-600 shadow-lg shadow-emerald-500/30 font-semibold" // Active State (Màu xanh nổi bật)
                    )}
                >
                    {/* Icon với màu sắc khác nhau khi active */}
                    {isActive ? (
                        <div className="text-white">{item.icon}</div>
                    ) : (
                        <div className="text-gray-400 group-hover:text-white">{item.icon}</div>
                    )}
                    <span>{item.title}</span>
                </a>
            );
        })}
      </nav>

      {/* FOOTER / LOGOUT SECTION (Tùy chọn) */}
      <div className="mt-auto pt-4 border-t border-gray-700/50">
        <button 
            onClick={() => console.log("Logging out...")}
            className="w-full flex items-center justify-center space-x-2 p-3 text-sm font-medium rounded-lg text-red-400 hover:bg-red-900/50 transition-colors"
        >
            <Settings className="h-4 w-4" />
            <span>Cài đặt & Thoát</span>
        </button>
      </div>
    </div>
  );
}
