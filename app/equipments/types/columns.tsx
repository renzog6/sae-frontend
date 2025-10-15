// filepath: sae-frontend/app/equipments/types/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { EquipmentType } from "@/types/equipment";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";

export function getEquipmentTypeColumns({
  onEdit,
}: {
  onEdit: (type: EquipmentType) => void;
}): ColumnDef<EquipmentType>[] {
  return [
    {
      accessorKey: "code",
      header: "Código",
      cell: ({ row }: { row: Row<EquipmentType> }) => (
        <span>{row.original.code || "-"}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<EquipmentType> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "category",
      header: "Categoría",
      cell: ({ row }: { row: Row<EquipmentType> }) => (
        <span>{row.original.category?.name || "-"}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }: { row: Row<EquipmentType> }) => (
        <span>{row.original.description || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<EquipmentType> }) => {
        const item = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(item)}
              className="bg-amber-100 hover:bg-amber-200"
            >
              <FilePenLine className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
