// filepath: sae-frontend/app/tires/sizes/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { TireSize } from "@/types/tire";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";

export function getTireSizeColumns({
  onEdit,
}: {
  onEdit: (size: TireSize) => void;
}): ColumnDef<TireSize>[] {
  return [
    {
      accessorKey: "mainCode",
      header: "Código principal",
      cell: ({ row }: { row: Row<TireSize> }) => (
        <span className="font-medium">{row.original.mainCode}</span>
      ),
    },
    {
      accessorKey: "width",
      header: "Ancho",
      cell: ({ row }: { row: Row<TireSize> }) => (
        <span>{row.original.width || "-"}</span>
      ),
    },
    {
      accessorKey: "aspectRatio",
      header: "Aspecto",
      cell: ({ row }: { row: Row<TireSize> }) => (
        <span>{row.original.aspectRatio || "-"}</span>
      ),
    },
    {
      accessorKey: "rimDiameter",
      header: "Llanta",
      cell: ({ row }: { row: Row<TireSize> }) => (
        <span>
          {row.original.rimDiameter ? `${row.original.rimDiameter}"` : "-"}
        </span>
      ),
    },
    {
      accessorKey: "construction",
      header: "Tipo",
      cell: ({ row }: { row: Row<TireSize> }) => (
        <span>{row.original.construction || "-"}</span>
      ),
    },
    {
      accessorKey: "loadIndex",
      header: "Índice carga",
      cell: ({ row }: { row: Row<TireSize> }) => (
        <span>{row.original.loadIndex || "-"}</span>
      ),
    },
    {
      accessorKey: "speedSymbol",
      header: "Velocidad",
      cell: ({ row }: { row: Row<TireSize> }) => (
        <span>{row.original.speedSymbol || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<TireSize> }) => {
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
