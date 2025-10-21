// filepath: sae-frontend/app/companies/business-categories/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { BusinessCategory } from "@/lib/types/company";
import { Button } from "@/components/ui/button";

export function getBusinessCategoryColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (category: BusinessCategory) => void;
  onDelete: (category: BusinessCategory) => void;
}): ColumnDef<BusinessCategory>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<BusinessCategory> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "code",
      header: "Código",
      cell: ({ row }: { row: Row<BusinessCategory> }) => (
        <span>{row.original.code || "-"}</span>
      ),
    },
    {
      accessorKey: "information",
      header: "Información",
      cell: ({ row }: { row: Row<BusinessCategory> }) => (
        <span>{row.original.information || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<BusinessCategory> }) => {
        const category = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(category)}
            >
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(category)}
            >
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];
}
