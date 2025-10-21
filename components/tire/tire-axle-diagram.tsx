"use client";

import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import type { EquipmentAxle, TirePositionConfig } from "@/lib/types/tire";
import { tireStatusColors } from "@/lib/utils/tires";

interface Props {
  axles: EquipmentAxle[];
  positions: TirePositionConfig[];
  selectedPosition: TirePositionConfig | null;
  setSelectedPosition: (p: TirePositionConfig | null) => void;
  isLoading?: boolean;
}

export const AxleDiagram: React.FC<Props> = ({
  axles,
  positions,
  selectedPosition,
  setSelectedPosition,
  isLoading = false,
}) => {
  // Agrupamos las posiciones por eje
  const positionsByAxle = useMemo(() => {
    const grouped: Record<number, TirePositionConfig[]> = {};
    for (const pos of positions) {
      if (!grouped[pos.axleId]) grouped[pos.axleId] = [];
      grouped[pos.axleId].push(pos);
    }
    return grouped;
  }, [positions]);

  // Orden visual: izquierda primero, luego derecha
  const sortPositions = (arr: TirePositionConfig[]) => {
    const order = { LEFT: 1, INNER: 2, OUTER: 3, RIGHT: 4 };
    return [...arr].sort(
      (a, b) => (order[a.side] ?? 99) - (order[b.side] ?? 99)
    );
  };

  // Agrupación de duales (INNER+OUTER)
  const groupDuals = (arr: TirePositionConfig[]) => {
    const groups: (TirePositionConfig | TirePositionConfig[])[] = [];
    const used = new Set<number>();

    for (const pos of arr) {
      if (used.has(pos.id)) continue;

      if (pos.isDual) {
        // Buscar su pareja dual (mismo eje, mismo lado)
        const pair = arr.find(
          (p) =>
            p.id !== pos.id &&
            p.isDual &&
            p.side !== pos.side && // uno INNER, otro OUTER
            p.positionKey.startsWith(pos.positionKey.substring(0, 2)) // ej: E1DI + E1DD
        );

        if (pair) {
          groups.push([pos, pair]);
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
        const groupedPositions = groupDuals(axlePositions);

        return (
          <div key={axle.id} className="p-4 border rounded-lg">
            {/* Cabecera del eje */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                Eje {axle.order} - {axle.axleType}
              </h3>
              <Badge variant="outline">{axle.wheelCount} ruedas</Badge>
            </div>

            {/* Diagrama del eje */}
            <div className="flex flex-wrap justify-center gap-4">
              {groupedPositions.map((item, idx) => {
                if (Array.isArray(item)) {
                  // Duales (INNER + OUTER)
                  return (
                    <div
                      key={`dual-${idx}`}
                      className="flex flex-col items-center space-y-1"
                    >
                      <div className="flex flex-col">
                        {item.map((pos) => {
                          const isSelected = selectedPosition?.id === pos.id;
                          const colorClass = tireStatusColors["DEFAULT"];
                          return (
                            <button
                              key={pos.id}
                              onClick={() => setSelectedPosition(pos)}
                              title={`${pos.positionKey} (${pos.side})`}
                              className={`flex items-center justify-center w-12 h-12 mb-1 transition-colors border-2 rounded-lg cursor-pointer border-dashed
                                ${
                                  isSelected
                                    ? "ring-2 ring-offset-2 ring-blue-400"
                                    : "hover:border-blue-500"
                                }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full ${colorClass}`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Dual
                      </span>
                    </div>
                  );
                } else {
                  // Simple
                  const pos = item;
                  const isSelected = selectedPosition?.id === pos.id;
                  const colorClass = tireStatusColors["DEFAULT"];
                  return (
                    <button
                      key={pos.id}
                      onClick={() => setSelectedPosition(pos)}
                      title={`${pos.positionKey} (${pos.side})`}
                      className={`flex items-center justify-center w-12 h-12 transition-colors border-2 rounded-lg cursor-pointer border-dashed
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
              })}

              {groupedPositions.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Sin posiciones definidas
                </p>
              )}
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
