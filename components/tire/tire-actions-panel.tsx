//filepath: sae-frontend/components/equipment/TireActionsPanel.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  RotateCcw,
  Wrench,
  Settings,
  Minus,
  Eye,
  Truck,
} from "lucide-react";
import type { TirePositionConfig } from "@/lib/types/tire";
import type { Equipment } from "@/lib/types/equipment";

interface Props {
  selectedPosition: TirePositionConfig | null;
  selectedEquipment: Equipment | null;
  equipments: Equipment[];
  selectedEquipmentId: number | null;
  setSelectedEquipmentId: (id: number | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const TireActionsPanel: React.FC<Props> = ({ selectedPosition }) => {
  return (
    <div className="card h-fit">
      <div className="p-4">
        <h4 className="text-lg font-semibold">Acciones del Neumático</h4>
        <p className="text-sm text-muted-foreground">
          {selectedPosition
            ? `Posición: ${selectedPosition.positionKey}`
            : "Selecciona una posición"}
        </p>

        <div className="mt-4 space-y-4">
          {selectedPosition ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tipo:</span>
                  <Badge variant="secondary">
                    {selectedPosition.isDual ? "Dual" : "Simple"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Lado:</span>
                  <span className="text-sm">{selectedPosition.side}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Asignar Neumático
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" /> Rotar
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Wrench className="w-4 h-4 mr-2" /> Inspeccionar
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Settings className="w-4 h-4 mr-2" /> Recapado
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Minus className="w-4 h-4 mr-2" /> Desmontar
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Eye className="w-4 h-4 mr-2" /> Ver Historial
                </Button>
              </div>
            </>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Selecciona una posición en el diagrama</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
