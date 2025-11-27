// filepath: sae-frontend/app/tires/sizes/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { TireSize } from "@/lib/types/domain/tire";
import { Button } from "@/components/ui/button";
import { FilePenLine, Plus } from "lucide-react";

export function getTireSizeColumns({
  onEdit,
  onAddAlias,
}: {
  onEdit: (size: TireSize) => void;
  onAddAlias: (size: TireSize) => void;
}): ColumnDef<TireSize>[] {
  return [
    {
      accessorKey: "mainCode",
      header: "Medida",
      cell: ({ row }: { row: Row<TireSize> }) => {
        const size = row.original;
        const aliases = size.aliases || [];
        const allCodes = [size.mainCode, ...aliases.map((a) => a.aliasCode)];

        return (
          <div className="flex flex-wrap gap-1">
            {allCodes.slice(0, 3).map((code, index) => (
              <span
                key={code}
                className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                  index === 0
                    ? "text-blue-800 bg-blue-100 font-medium"
                    : "text-gray-700 bg-gray-100"
                }`}
              >
                {code}
              </span>
            ))}
            {allCodes.length > 3 && (
              <span className="text-xs text-gray-500">
                +{allCodes.length - 3} más
              </span>
            )}
          </div>
        );
      },
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
      cell: ({ row }: { row: Row<TireSize> }) => {
        const rimDiameter = row.original.rimDiameter;
        // Handle Decimal type from Prisma (comes as object with 's', 'e', 'd' properties)
        let displayValue = "-";
        if (
          rimDiameter &&
          typeof rimDiameter === "object" &&
          "d" in rimDiameter
        ) {
          // Prisma Decimal type: extract the actual number
          const decimalObj = rimDiameter as any;
          const decimalArray = decimalObj.d as number[];
          if (decimalArray && decimalArray.length > 0) {
            displayValue = `${decimalArray[0]}"`;
          }
        } else if (typeof rimDiameter === "number") {
          displayValue = `${rimDiameter}"`;
        }
        return <span>{displayValue}</span>;
      },
    },
    {
      accessorKey: "construction",
      header: "Tipo",
      cell: ({ row }: { row: Row<TireSize> }) => (
        <span>{row.original.construction || "-"}</span>
      ),
    },
    {
      accessorKey: "information",
      header: "Información",
      cell: ({ row }: { row: Row<TireSize> }) => (
        <span className="text-sm text-gray-600">
          {row.original.information || "-"}
        </span>
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
              onClick={() => onAddAlias(item)}
              className="bg-blue-100 hover:bg-blue-200"
              title="Agregar medida alternativa"
            >
              <Plus className="w-4 h-4" />
            </Button>
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
