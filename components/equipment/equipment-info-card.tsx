//filepath: sae-frontend/components/equipment/EquipmentInfoCard.tsx
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import type { Equipment } from "@/lib/types/equipment";
import type { EquipmentAxle, TirePositionConfig } from "@/lib/types/tire";
import { EquipmentSelectorDialog } from "./equipment-selector-dialog";

interface Props {
  selectedEquipment: Equipment;
  axles: EquipmentAxle[];
  positions: TirePositionConfig[];
  equipments: Equipment[];
  selectedEquipmentId: number | null;
  setSelectedEquipmentId: (id: number | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const EquipmentInfoCard: React.FC<Props> = ({
  selectedEquipment,
  axles,
  positions,
  equipments,
  selectedEquipmentId,
  setSelectedEquipmentId,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="card h-fit">
      <div className="p-4">
        {/* Equipment selection button */}
        <EquipmentSelectorDialog
          equipments={equipments}
          selectedEquipmentId={selectedEquipmentId}
          setSelectedEquipmentId={setSelectedEquipmentId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        >
          <Button variant="outline" className="w-full" size="sm">
            <Search className="w-4 h-4 mr-2" />
            {selectedEquipment ? "Cambiar Equipo" : "Seleccionar Equipo"}
          </Button>
        </EquipmentSelectorDialog>
        <h4 className="text-lg font-semibold">Información del Equipo</h4>
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Nombre
            </label>
            <p className="font-medium">
              {selectedEquipment.name ?? "Sin nombre"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Marca
            </label>
            <p>{selectedEquipment.model?.brand?.name ?? "Sin marca"}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Modelo
            </label>
            <p>{selectedEquipment.model?.name ?? "Sin modelo"}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Año
            </label>
            <p>{selectedEquipment.year ?? "Sin año"}</p>
          </div>

          {selectedEquipment.licensePlate && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Patente
              </label>
              <p className="font-mono">{selectedEquipment.licensePlate}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Estado
            </label>
            <Badge
              variant={
                selectedEquipment.status === "ACTIVE" ? "default" : "secondary"
              }
            >
              {selectedEquipment.status === "ACTIVE" ? "Activo" : "Inactivo"}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Ejes configurados:</span>
              <span className="font-medium">{axles.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Posiciones totales:</span>
              <span className="font-medium">{positions.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
