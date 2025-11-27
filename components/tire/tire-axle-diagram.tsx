// filepath: sae-frontend/components/tire/tire-axle-diagram.tsx
"use client";

import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import type { TirePositionConfig } from "@/lib/types/domain/tire";
import type { EquipmentAxle } from "@/lib/types/domain/equipment";
import { tireStatusColors } from "@/lib/utils/tires";
import { TireSide } from "@/lib/types/shared/enums";

interface Props {
  axles: EquipmentAxle[];
  positions: TirePositionConfig[];
  assignments?: any[];
  selectedPosition: TirePositionConfig | null;
  setSelectedPosition: (p: TirePositionConfig | null) => void;
  isLoading?: boolean;
  refreshTrigger?: number;
}

export const AxleDiagram: React.FC<Props> = ({
  axles,
  positions,
  assignments = [],
  selectedPosition,
  setSelectedPosition,
  isLoading = false,
  refreshTrigger,
}) => {
  // Agrupamos posiciones por eje
  const positionsByAxle = useMemo(() => {
    const grouped: Record<number, TirePositionConfig[]> = {};
    for (const pos of positions) {
      if (!grouped[pos.axleId]) grouped[pos.axleId] = [];
      grouped[pos.axleId].push(pos);
    }
    return grouped;
  }, [positions, refreshTrigger]);

  // Función para determinar si una posición está ocupada
  const getPositionStatus = useMemo(() => {
    return (positionId: number) => {
      const assignment = assignments.find(
        (a: any) => a.positionConfigId === positionId
      );
      return assignment ? "IN_USE" : "DEFAULT";
    };
  }, [assignments]);

  // Orden de posiciones: izquierda -> derecha, con duales agrupados
  const sortPositions = (arr: TirePositionConfig[]) => {
    const orderMap: Record<TireSide, number> = {
      LEFT: 1,
      OUTER: 2, // Para duales: outer left
      INNER: 3, // inner left
      RIGHT: 4,
    };
    return [...arr].sort(
      (a, b) => (orderMap[a.side] ?? 99) - (orderMap[b.side] ?? 99)
    );
  };

  // Agrupación por lados: left group | right group
  const groupBySide = (arr: TirePositionConfig[]) => {
    const leftGroup: TirePositionConfig[] = arr.filter(
      (p) => p.side === "LEFT" || p.side === "OUTER" || p.side === "INNER"
    ); // Asume left incluye duales
    const rightGroup: TirePositionConfig[] = arr.filter(
      (p) => p.side === "RIGHT" || p.side === "INNER" || p.side === "OUTER"
    ); // Ajusta según convención

    return { left: groupDuals(leftGroup), right: groupDuals(rightGroup) };
  };

  // Agrupación de duales (ahora horizontal)
  const groupDuals = (arr: TirePositionConfig[]) => {
    const groups: (TirePositionConfig | TirePositionConfig[])[] = [];
    const used = new Set<number>();

    for (const pos of arr) {
      if (used.has(pos.id)) continue;

      if (pos.isDual) {
        const pair = arr.find(
          (p) =>
            p.id !== pos.id &&
            p.isDual &&
            !used.has(p.id) &&
            p.positionKey.substring(0, 3) === pos.positionKey.substring(0, 3) &&
            p.positionKey !== pos.positionKey
        );

        if (pair) {
          groups.push([pos, pair]); // Grupo como array para render dual
          used.add(pos.id);
          used.add(pair.id);
          continue;
        }
      }

      groups.push(pos);
      used.add(pos.id);
    }

    return groups;
  };

  if (isLoading) {
    return (
      <div className="p-6 border rounded-md">
        <div className="space-y-4 animate-pulse">
          <div className="w-1/3 h-6 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (axles.length === 0) {
    return (
      <div className="py-12 text-center border rounded-md text-muted-foreground">
        <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No hay ejes configurados para este equipo</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {axles.map((axle) => {
        const axlePositions = sortPositions(positionsByAxle[axle.id] ?? []);
        const { left, right } = groupBySide(axlePositions);

        return (
          <div key={axle.id} className="relative p-4 border rounded-lg">
            {/* Línea horizontal simulando el eje */}
            <div className="absolute left-0 right-0 z-0 h-1 -translate-y-1/2 bg-gray-200 top-1/2" />

            {/* Cabecera */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                Eje {axle.order} - {axle.axleType}
              </h3>
              <Badge variant="outline">{axle.wheelCount} ruedas</Badge>
            </div>

            {/* Diagrama horizontal */}
            <div className="relative z-10 flex items-center justify-between">
              {/* Lado izquierdo */}
              <div className="flex gap-1">
                {" "}
                {/* Gap pequeño para duales */}
                {left.map((item, idx) =>
                  renderPosition(
                    item,
                    selectedPosition,
                    setSelectedPosition,
                    getPositionStatus,
                    idx
                  )
                )}
              </div>

              {/* Lado derecho (con separación mayor) */}
              <div className="flex gap-1">
                {right.map((item, idx) =>
                  renderPosition(
                    item,
                    selectedPosition,
                    setSelectedPosition,
                    getPositionStatus,
                    idx
                  )
                )}
              </div>
            </div>

            {axle.description && (
              <p className="mt-3 text-sm text-muted-foreground">
                {axle.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Función helper para renderizar posición o dual
const renderPosition = (
  item: TirePositionConfig | TirePositionConfig[],
  selectedPosition: TirePositionConfig | null,
  setSelectedPosition: (p: TirePositionConfig | null) => void,
  getPositionStatus: (positionId: number) => string,
  idx: number
) => {
  if (Array.isArray(item)) {
    // Dual: horizontal, círculos más cercanos
    return (
      <div key={`dual-${idx}`} className="flex gap-0.5 items-center">
        {" "}
        {/* Gap mínimo para duales */}
        {item.map((pos) => {
          const isSelected = selectedPosition?.id === pos.id;
          const status = getPositionStatus(pos.id);
          const colorClass =
            tireStatusColors[status] || tireStatusColors["DEFAULT"];
          return (
            <button
              key={pos.id}
              onClick={() => setSelectedPosition(pos)}
              title={`${pos.positionKey} (${pos.side})`}
              className={`flex items-center justify-center w-10 h-10 transition-colors border-2 rounded-full cursor-pointer border-dashed
                ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-blue-400"
                    : "hover:border-blue-500"
                }`}
            >
              <div className={`w-6 h-6 rounded-full ${colorClass}`} />
            </button>
          );
        })}
      </div>
    );
  } else {
    // Single
    const pos = item;
    const isSelected = selectedPosition?.id === pos.id;
    const status = getPositionStatus(pos.id);
    const colorClass = tireStatusColors[status] || tireStatusColors["DEFAULT"];
    return (
      <button
        key={pos.id}
        onClick={() => setSelectedPosition(pos)}
        title={`${pos.positionKey} (${pos.side})`}
        className={`flex items-center justify-center w-12 h-12 transition-colors border-2 rounded-full cursor-pointer border-dashed
          ${
            isSelected
              ? "ring-2 ring-offset-2 ring-blue-400"
              : "hover:border-blue-500"
          }`}
      >
        <div className={`w-8 h-8 rounded-full ${colorClass}`} />
      </button>
    );
  }
};
