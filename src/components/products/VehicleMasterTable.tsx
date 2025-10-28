"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Car, Palette, Box } from "lucide-react";
import { useState } from "react";

import { VehicleModelsTable } from "./VehicleModelsTable";
import { VehicleColorsTable } from "./VehicleColorsTable";
import { VehiclesTable } from "./VehiclesTable";
import { useVehicleModels } from "@/hooks/useVehicleModels";
import { useVehicleColors } from "@/hooks/useVehicleColors";

export function VehicleGroupTabsTable() {
  const [activeTab, setActiveTab] = useState("models");

  const vehicleModelsHook = useVehicleModels();
  const vehicleColorsHook = useVehicleColors();

  return (
    <div className="p-6 bg-gray-900 border rounded-2xl border-gray-700 shadow-lg min-h-screen text-gray-50 font-inter">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full sm:w-auto grid-cols-3 bg-gray-800 p-1 rounded-xl shadow-2xl mb-4">
          <TabsTrigger
            value="models"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white rounded-lg text-gray-300 hover:text-white"
          >
            <Car className="h-4 w-4 mr-2" /> Models ({vehicleModelsHook.total})
          </TabsTrigger>
          <TabsTrigger
            value="colors"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white rounded-lg text-gray-300 hover:text-white"
          >
            <Palette className="h-4 w-4 mr-2" /> Colors (
            {vehicleColorsHook.total})
          </TabsTrigger>
          <TabsTrigger
            value="vehicles"
            className="data-[state=active]:bg-sky-600 data-[state=active]:text-white rounded-lg text-gray-300 hover:text-white"
          >
            <Box className="h-4 w-4 mr-2" /> Vehicles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <VehicleModelsTable />
        </TabsContent>
        <TabsContent value="colors">
          <VehicleColorsTable />
        </TabsContent>
        <TabsContent value="vehicles">
          <VehiclesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
