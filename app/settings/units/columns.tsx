// filepath: sae-frontend/app/settings/units/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { Unit } from "@/lib/types/shared/catalogs";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, RotateCcw } from "lucide-react";

export function getUnitColumns({
  onEdit,
  onDelete,
  onRestore,
}: {
  onEdit: (unit: Unit) => void;
  onDelete: (unit: Unit) => void;
  onRestore: (unit: Unit) => void;
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
      cell: ({ row }: { row: Row<Unit> }) => (
        <span>{row.original.abbreviation}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<Unit> }) => {
        const unit = row.original;
        const isDeleted = unit.deletedAt !== null;

        return (
          <div className="flex justify-end gap-2">
            {!isDeleted ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(unit)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(unit)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRestore(unit)}
                className="text-green-700 border-green-300 bg-green-50 hover:bg-green-100"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];
}
