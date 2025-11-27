// filepath: sae-frontend/app/settings/locations/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { City } from "@/lib/types/shared/location";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export function getCityColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (city: City) => void;
  onDelete: (city: City) => void;
}): ColumnDef<City>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<City> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "postalCode",
      header: "Código Postal",
      cell: ({ row }: { row: Row<City> }) => (
        <span>{row.original.postalCode || "-"}</span>
      ),
    },
    {
      accessorKey: "province",
      header: "Provincia",
      cell: ({ row }: { row: Row<City> }) => (
        <span>{row.original.province?.name || row.original.provinceId}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<City> }) => {
        const city = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(city)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(city)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
