// filepath: sae-frontend/app/equipments/models/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { EquipmentModel } from "@/lib/types/domain/equipment";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";

export function getEquipmentModelColumns({
  onEdit,
}: {
  onEdit: (model: EquipmentModel) => void;
}): ColumnDef<EquipmentModel>[] {
  return [
    {
      accessorKey: "code",
      header: "Código",
      cell: ({ row }) => <span>{row.original.code || "-"}</span>,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => <span>{row.original.type?.name || "-"}</span>,
    },
    {
      accessorKey: "brand",
      header: "Marca",
      cell: ({ row }) => <span>{row.original.brand?.name || "-"}</span>,
    },
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "year",
      header: "Año",
      cell: ({ row }) => <span>{row.original.year || "-"}</span>,
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => <span>{row.original.description || "-"}</span>,
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }) => {
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
