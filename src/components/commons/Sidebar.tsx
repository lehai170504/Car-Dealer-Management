"use client";

import {
  Car,
  BarChart,
  Users,
  ShoppingCart,
  Zap,
  LogOut,
  Package,
} from "lucide-react";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/useLogout";

const cn = (...classes: (string | boolean | undefined)[]): string =>
  classes.filter(Boolean).join(" ");

type Role = "DealerManager" | "DealerStaff" | "EVMStaff" | "Admin";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

// Giả lập path hiện tại (có thể thay bằng usePathname sau)
const SIMULATED_PATH = "/evm/dashboard";

// ====================== MENU CHO TỪNG ROLE ======================
const dealerManagerMenu: NavItem[] = [
  {
    title: "Bán hàng",
    href: "/dealer/sales",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Quản lý Đại lí",
    href: "/admin/dealer",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Quản lý Hàng tồn kho",
    href: "/admin/inventory",
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: "Khách hàng",
    href: "/dealer/customers",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Báo cáo",
    href: "/dealer/reports",
    icon: <BarChart className="h-4 w-4" />,
  },
];

const dealerStaffMenu: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dealer/dashboard",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "Khách hàng",
    href: "/dealer/customers",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Hỗ trợ Bán hàng",
    href: "/dealer/sales",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
];

const evmStaffMenu: NavItem[] = [
  {
    title: "Sản phẩm & Phân phối",
    href: "/evm/catalog",
    icon: <Car className="h-4 w-4" />,
  },
  {
    title: "Báo cáo Tài chính",
    href: "/evm/reports",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "Quản lý đại lý",
    href: "/evm/dealer",
    icon: <Users className="h-4 w-4" />,
  },
];

const adminMenu: NavItem[] = [
  {
    title: "Quản lý Đại lí",
    href: "/admin/dealer",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Quản lý Người dùng",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Sản phẩm & Phân phối",
    href: "/admin/products",
    icon: <Car className="h-4 w-4" />,
  },
  {
    title: "Báo cáo",
    href: "/admin/reports",
    icon: <BarChart className="h-4 w-4" />,
  },
];

// ====================== COMPONENT SIDEBAR ======================
export function Sidebar({ role }: { role: Role }) {
  const { logoutUser, isLoading } = useLogout();

  let menuItems: NavItem[] = [];

  switch (role) {
    case "DealerManager":
      menuItems = dealerManagerMenu;
      break;
    case "DealerStaff":
      menuItems = dealerStaffMenu;
      break;
    case "EVMStaff":
      menuItems = evmStaffMenu;
      break;
    case "Admin":
      menuItems = adminMenu;
      break;
  }

  return (
    <div className="flex h-full w-64 flex-col space-y-6 bg-gray-900 text-gray-200 border-r border-gray-800 shadow-2xl p-4">
      {/* HEADER / LOGO */}
      <div className="flex items-center space-x-2 p-2 pt-4 border-b border-gray-700/50 pb-4">
        <Zap className="h-6 w-6 text-emerald-400" />
        <span className="text-2xl font-extrabold tracking-tight text-white">
          {role === "DealerManager"
            ? "DEALER PORTAL"
            : role === "DealerStaff"
            ? "DEALER STAFF"
            : role === "EVMStaff"
            ? "EVM PORTAL"
            : "ADMIN PANEL"}
        </span>
      </div>

      {/* NAVIGATION MENU */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => {
          const isActive = SIMULATED_PATH === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                "text-gray-400 hover:bg-gray-700 hover:text-white",
                isActive &&
                  "text-white bg-emerald-600 shadow-lg shadow-emerald-500/30 font-semibold"
              )}
            >
              <div
                className={
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }
              >
                {item.icon}
              </div>
              <span>{item.title}</span>
            </a>
          );
        })}
      </nav>

      {/* FOOTER / LOGOUT */}
      <div className="mt-auto pt-4 border-t border-gray-700/50">
        <Button
          onClick={logoutUser}
          disabled={isLoading}
          className={cn(
            "w-full flex items-center justify-center space-x-2 p-3 text-sm font-medium rounded-lg transition-colors",
            "text-red-400 hover:bg-red-900/50",
            isLoading && "opacity-70 cursor-not-allowed"
          )}
        >
          <LogOut className="h-4 w-4" />
          <span>{isLoading ? "Đang đăng xuất..." : "Đăng xuất"}</span>
        </Button>
      </div>
    </div>
  );
}
