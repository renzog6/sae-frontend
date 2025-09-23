// filepath: sae-frontend/app/settings/units/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { Unit } from "@/types/catalog";
import { Button } from "@/components/ui/button";

export function getUnitColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (unit: Unit) => void;
  onDelete: (unit: Unit) => void;
}): ColumnDef<Unit>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<Unit> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "abbreviation",
      header: "Abreviatura",
      cell: ({ row }: { row: Row<Unit> }) => <span>{row.original.abbreviation}</span>,
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<Unit> }) => {
        const unit = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(unit)}>
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(unit)}>
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];
}
