// config/sidebar.ts
import { Home, Car, Users, FileText, Package, Store } from "lucide-react";

export const dealerMenu = [
  { label: "Dashboard", icon: Home, href: "/dealer" },
  { label: "Danh mục xe", icon: Car, href: "/dealer/vehicles" },
  { label: "Bán hàng", icon: FileText, href: "/dealer/orders" },
  { label: "Khách hàng", icon: Users, href: "/dealer/customers" },
  { label: "Báo cáo", icon: Package, href: "/dealer/reports" },
];

export const evmMenu = [
  { label: "Dashboard", icon: Home, href: "/evm" },
  { label: "Quản lý xe", icon: Car, href: "/evm/vehicles" },
  { label: "Quản lý tồn kho", icon: Package, href: "/evm/inventory" },
  { label: "Quản lý đại lý", icon: Store, href: "/evm/dealers" },
  { label: "Báo cáo & phân tích", icon: FileText, href: "/evm/reports" },
];
