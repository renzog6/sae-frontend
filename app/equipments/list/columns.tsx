// filepath: sae-frontend/app/equipments/list/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { Equipment } from "@/lib/types/domain/equipment";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function getEquipmentColumns({
  onView,
}: {
  onView: (equipment: Equipment) => void;
}): ColumnDef<Equipment>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.name || "-"}</span>
      ),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.type?.name || "-"}</span>
      ),
    },
    {
      accessorKey: "year",
      header: "Año",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.year || "-"}</span>
      ),
    },
    {
      accessorKey: "model.brand",
      header: "Marca",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.model?.brand?.name || "-"}</span>
      ),
    },
    {
      accessorKey: "model",
      header: "Modelo",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.model?.name || "-"}</span>
      ),
    },
    {
      accessorKey: "chassis",
      header: "Chasis",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.chassis || "-"}</span>
      ),
    },
    {
      accessorKey: "engine",
      header: "Motor",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.engine || "-"}</span>
      ),
    },
    {
      accessorKey: "licensePlate",
      header: "Patente",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.licensePlate || "-"}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.description || "-"}</span>
      ),
    },
    {
      accessorKey: "observation",
      header: "Observación",
      cell: ({ row }: { row: Row<Equipment> }) => (
        <span>{row.original.observation || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<Equipment> }) => {
        const item = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onView(item)}>
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
