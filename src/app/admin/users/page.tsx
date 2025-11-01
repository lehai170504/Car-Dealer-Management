// src/app/admin/users/page.tsx
"use client";

import React from "react";
import { UserTable } from "@/components/users/UserTable";

export default function UsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
      <UserTable />
    </div>
  );
}
