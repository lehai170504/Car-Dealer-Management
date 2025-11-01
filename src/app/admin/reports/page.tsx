// src/pages/reports/ReportsPage.tsx
"use client";

import React from "react";
import { ReportViewer } from "@/components/reports/ReportViewer";

const ReportsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports Dashboard</h1>
      <ReportViewer />
    </div>
  );
};

export default ReportsPage;
