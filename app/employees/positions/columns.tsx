// filepath: sae-frontend/app/employees/positions/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { EmployeePosition } from "@/types/employee";
import { Button } from "@/components/ui/button";

export function getEmployeePositionColumns({
  onEdit,
}: {
  onEdit: (position: EmployeePosition) => void;
}): ColumnDef<EmployeePosition>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<EmployeePosition> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "code",
      header: "Código",
      cell: ({ row }: { row: Row<EmployeePosition> }) => <span>{row.original.code || "-"}</span>,
    },
    {
      accessorKey: "information",
      header: "Información",
      cell: ({ row }: { row: Row<EmployeePosition> }) => <span>{row.original.information || "-"}</span>,
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<EmployeePosition> }) => {
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
