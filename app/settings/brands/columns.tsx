// filepath: sae-frontend/app/settings/brands/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { Brand } from "@/lib/types/shared/catalogs";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export function getBrandColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
}): ColumnDef<Brand>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<Brand> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "code",
      header: "Código",
      cell: ({ row }: { row: Row<Brand> }) => <span>{row.original.code}</span>,
    },
    {
      accessorKey: "information",
      header: "Información",
      cell: ({ row }: { row: Row<Brand> }) => (
        <span>{row.original.information || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<Brand> }) => {
        const brand = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(brand)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(brand)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
