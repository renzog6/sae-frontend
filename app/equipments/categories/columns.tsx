// filepath: sae-frontend/app/equipments/categories/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { EquipmentCategory } from "@/lib/types/domain/equipment";
import { Button } from "@/components/ui/button";

export function getEquipmentCategoryColumns({
  onEdit,
}: {
  onEdit: (category: EquipmentCategory) => void;
}): ColumnDef<EquipmentCategory>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<EquipmentCategory> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "code",
      header: "Código",
      cell: ({ row }: { row: Row<EquipmentCategory> }) => (
        <span>{row.original.code || "-"}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }: { row: Row<EquipmentCategory> }) => (
        <span>{row.original.description || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<EquipmentCategory> }) => {
        const item = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
              Editar
            </Button>
            {/* Eliminar solo dentro del diálogo de edición */}
          </div>
        );
      },
    },
  ];
}
