//filepath: sae-frontend/components/equipment/EquipmentSelector.tsx
"use client";

import React, { useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Truck } from "lucide-react";
import type { Equipment } from "@/lib/types/equipment";

interface Props {
  equipments: Equipment[];
  selectedEquipmentId: number | null;
  setSelectedEquipmentId: (id: number | null) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

export const EquipmentSelector: React.FC<Props> = ({
  equipments,
  selectedEquipmentId,
  setSelectedEquipmentId,
  searchTerm,
  setSearchTerm,
}) => {
  const items = useMemo(() => equipments, [equipments]);

  return (
    <div className="card">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Truck className="w-5 h-5" />
          <div>
            <h3 className="text-lg font-semibold">Seleccionar Equipo</h3>
            <p className="text-sm text-muted-foreground">
              Busca y selecciona el equipo
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Select
              value={selectedEquipmentId ? String(selectedEquipmentId) : ""}
              onValueChange={(v) =>
                setSelectedEquipmentId(v ? parseInt(v) : null)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar equipo..." />
              </SelectTrigger>

              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Buscar equipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                </div>

                <ScrollArea className="h-64">
                  {items.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground">
                      No hay equipos
                    </div>
                  ) : (
                    items.map((equipment) => (
                      <SelectItem
                        key={equipment.id}
                        value={String(equipment.id)}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">
                            <p className="font-medium">
                              {equipment.name || "Sin nombre"}
                            </p>
                            {equipment.model?.brand?.name ?? "—"}{" "}
                            {equipment.model?.name ?? ""} {equipment.year ?? ""}{" "}
                            {equipment.licensePlate
                              ? `- ${equipment.licensePlate}`
                              : ""}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
