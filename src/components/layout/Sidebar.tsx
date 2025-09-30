"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { dealerMenu, evmMenu } from "@/config/sidebar";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function AppSidebar() {
  // 1. Định nghĩa type rõ ràng
  type Role = "DealerStaff" | "DealerManager" | "EvmAdmin" | string;

  // 2. Hardcode role nhưng kiểu là Role
  const role: Role = "DealerManager";

  // 3. Chọn menu theo role
  const menu =
    role === "DealerStaff" || role === "DealerManager" ? dealerMenu : evmMenu;

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="font-bold text-lg">
          {role === "DealerStaff" || role === "DealerManager"
            ? "EV Dealer"
            : "EV Management"}
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menu.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex items-center gap-2 w-full text-left">
                <LogOut className="h-5 w-5" />
                <span>Đăng xuất</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
