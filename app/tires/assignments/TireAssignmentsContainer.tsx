//filepath: sae-frontend/app/tires/assignments/TireAssignmentsContainer.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";

import type { Equipment } from "@/lib/types/equipment";
import type { EquipmentAxle, TirePositionConfig } from "@/lib/types/tire";

import { useEquipmentList } from "@/lib/hooks/useEquipment";
import {
  useEquipmentAxles,
  useTirePositionConfigs,
} from "@/lib/hooks/useTires";

import { TireActionsPanel } from "@/components/tire/tire-actions-panel";
import { AxleDiagram } from "@/components/tire/tire-axle-diagram";
import { EquipmentInfoCard } from "@/components/equipment/equipment-info-card";
import { EquipmentSelectorDialog } from "@/components/equipment/equipment-selector-dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function TireAssignmentsContainer() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // UI state
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(
    null
  );
  const [selectedPosition, setSelectedPosition] =
    useState<TirePositionConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Data fetching (hooks existentes)
  const {
    data: equipmentsData,
    isLoading: isLoadingEquipments,
    isError: isErrorEquipments,
  } = useEquipmentList(accessToken, {
    page: 1,
    limit: 100,
  });

  // Normalizamos el payload para manejar ambos shapes (array o {data:[]})
  const equipments: Equipment[] = useMemo(() => {
    if (!equipmentsData) return [];
    return Array.isArray(equipmentsData)
      ? equipmentsData
      : (equipmentsData as any).data ?? [];
  }, [equipmentsData]);

  const { data: axlesData, isLoading: isLoadingAxles } = useEquipmentAxles(
    accessToken,
    selectedEquipmentId ? { equipmentId: selectedEquipmentId } : undefined
  );

  const axles: EquipmentAxle[] = useMemo(() => {
    if (!axlesData) return [];
    return Array.isArray(axlesData) ? axlesData : (axlesData as any).data ?? [];
  }, [axlesData]);

  const { data: positionsData, isLoading: isLoadingPositions } =
    useTirePositionConfigs(
      accessToken,
      axles.length > 0 ? { axleId: axles[0]?.id } : undefined
    );

  const positions: TirePositionConfig[] = useMemo(() => {
    if (!positionsData) return [];
    return Array.isArray(positionsData)
      ? positionsData
      : (positionsData as any).data ?? [];
  }, [positionsData]);

  // selectedEquipment memoizado para evitar find en cada render
  const selectedEquipment = useMemo(
    () => equipments.find((e) => e.id === selectedEquipmentId) ?? null,
    [equipments, selectedEquipmentId]
  );

  // Filtrado simple para el selector
  const filteredEquipments = useMemo(() => {
    if (!searchTerm) return equipments;
    const q = searchTerm.toLowerCase();
    return equipments.filter((equipment) =>
      `${equipment.name ?? ""} ${equipment.model?.brand?.name ?? ""} ${
        equipment.model?.name ?? ""
      } ${equipment.year ?? ""} ${equipment.licensePlate ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [equipments, searchTerm]);

  // Callbacks
  const onSelectEquipment = useCallback((id: number | null) => {
    setSelectedEquipmentId(id);
    setSelectedPosition(null); // reset position when equipment changes
  }, []);

  const onSelectPosition = useCallback((pos: TirePositionConfig | null) => {
    setSelectedPosition(pos);
  }, []);

  // Loading UX: skeletons / empty states
  if (isLoadingEquipments) {
    return (
      <div className="w-full p-6 mx-auto max-w-7xl">
        <div className="space-y-4">
          <Skeleton className="w-1/3 h-12" />
          <Skeleton className="w-full h-80" />
        </div>
      </div>
    );
  }

  if (isErrorEquipments) {
    return (
      <div className="w-full p-6 mx-auto max-w-7xl">
        <div className="p-4 text-red-700 rounded-md bg-red-50">
          Error cargando equipos. Reintenta o contacta al administrador.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 mx-auto space-y-6 max-w-7xl">
      {/* Main layout */}
      {selectedEquipment ? (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <EquipmentInfoCard
              selectedEquipment={selectedEquipment}
              axles={axles}
              positions={positions}
              equipments={equipments}
              selectedEquipmentId={selectedEquipmentId}
              setSelectedEquipmentId={onSelectEquipment}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          <div className="col-span-6">
            <AxleDiagram
              axles={axles}
              positions={positions}
              selectedPosition={selectedPosition}
              setSelectedPosition={onSelectPosition}
              isLoading={isLoadingAxles || isLoadingPositions}
            />
          </div>

          <div className="col-span-3">
            <TireActionsPanel
              selectedPosition={selectedPosition}
              selectedEquipment={selectedEquipment}
              equipments={equipments}
              selectedEquipmentId={selectedEquipmentId}
              setSelectedEquipmentId={onSelectEquipment}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>
      ) : (
        <div className="py-12 text-center border rounded-md text-muted-foreground">
          <p className="mb-4">
            Selecciona un equipo para visualizar su configuración de ejes
          </p>
          <EquipmentSelectorDialog
            equipments={equipments}
            selectedEquipmentId={selectedEquipmentId}
            setSelectedEquipmentId={onSelectEquipment}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          >
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Seleccionar Equipo
            </Button>
          </EquipmentSelectorDialog>
        </div>
      )}
    </div>
  );
}
