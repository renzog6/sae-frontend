// filepath: sae-frontend/app/companies/business-subcategories/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { BusinessSubcategory } from "@/lib/types/company";
import { Button } from "@/components/ui/button";

export function getBusinessSubcategoryColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (subcategory: BusinessSubcategory) => void;
  onDelete: (subcategory: BusinessSubcategory) => void;
}): ColumnDef<BusinessSubcategory>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<BusinessSubcategory> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "businessCategoryId",
      header: "Categoría ID",
      cell: ({ row }: { row: Row<BusinessSubcategory> }) => (
        <span>{row.original.businessCategoryId}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }: { row: Row<BusinessSubcategory> }) => (
        <span>{row.original.description || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<BusinessSubcategory> }) => {
        const subcategory = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(subcategory)}
            >
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(subcategory)}
            >
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];
}
