"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { Vehicle } from "@/types/vehicles";

interface CompareVehiclesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicles: Vehicle[];
}

export const CompareVehiclesModal: React.FC<CompareVehiclesModalProps> = ({
  open,
  onOpenChange,
  vehicles,
}) => {
  if (vehicles.length === 0) return null;

  const rows = [
    { label: "Battery", key: "battery" },
    { label: "Range (km)", key: "range" },
    { label: "Motor Power (hp)", key: "motorPower" },
    { label: "MSRP ($)", key: "msrp" },
    { label: "Active", key: "active" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 text-gray-100 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle>So sánh xe</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse border border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-700 p-2">Thuộc tính</th>
                {vehicles.map((v) => (
                  <th key={v._id} className="border border-gray-700 p-2">
                    {v.model?.name} - {v.trim}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td className="border border-gray-700 p-2 font-semibold">
                    {row.label}
                  </td>
                  {vehicles.map((v) => (
                    <td key={v._id} className="border border-gray-700 p-2">
                      {row.key === "active"
                        ? v.active
                          ? "Đang hoạt động"
                          : "Không hoạt động"
                        : (v as any)[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
