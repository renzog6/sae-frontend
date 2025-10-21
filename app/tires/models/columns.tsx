// filepath: sae-frontend/app/tires/models/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { TireModel } from "@/lib/types/tire";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";

export function getTireModelColumns({
  onEdit,
}: {
  onEdit: (model: TireModel) => void;
}): ColumnDef<TireModel>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre del modelo",
      cell: ({ row }: { row: Row<TireModel> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "brand",
      header: "Marca",
      cell: ({ row }: { row: Row<TireModel> }) => (
        <span>{row.original.brand.name}</span>
      ),
    },
    {
      accessorKey: "size",
      header: "Medida",
      cell: ({ row }: { row: Row<TireModel> }) => (
        <span>{row.original.size.mainCode}</span>
      ),
    },
    {
      accessorKey: "loadIndex",
      header: "Índice carga",
      cell: ({ row }: { row: Row<TireModel> }) => (
        <span>{row.original.loadIndex || "-"}</span>
      ),
    },
    {
      accessorKey: "speedSymbol",
      header: "Velocidad",
      cell: ({ row }: { row: Row<TireModel> }) => (
        <span>{row.original.speedSymbol || "-"}</span>
      ),
    },
    {
      accessorKey: "plyRating",
      header: "Capas",
      cell: ({ row }: { row: Row<TireModel> }) => (
        <span>{row.original.plyRating || "-"}</span>
      ),
    },
    {
      accessorKey: "treadPattern",
      header: "Dibujo",
      cell: ({ row }: { row: Row<TireModel> }) => (
        <span>{row.original.treadPattern || "-"}</span>
      ),
    },
    {
      accessorKey: "information",
      header: "Información",
      cell: ({ row }: { row: Row<TireModel> }) => (
        <span className="text-sm text-gray-600">
          {row.original.information || "-"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<TireModel> }) => {
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
