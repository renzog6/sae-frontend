// filepath: sae-frontend/app/tires/position-configs/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { TirePositionConfig } from "@/lib/types/tire";
import { tireSideLabels } from "@/lib/constants";

export function getTirePositionConfigColumns(): ColumnDef<TirePositionConfig>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: { row: Row<TirePositionConfig> }) => (
        <span className="font-medium">#{row.original.id}</span>
      ),
    },
    {
      id: "axle",
      header: "Eje",
      cell: ({ row }: { row: Row<TirePositionConfig> }) => (
        <div>
          <div className="font-medium">
            Eje {row.original.axle?.order || "?"}
          </div>
          <div className="text-sm text-muted-foreground">
            {row.original.axle?.equipment?.name &&
              `Equipo: ${row.original.axle.equipment.name}`}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "positionKey",
      header: "Posición",
      cell: ({ row }: { row: Row<TirePositionConfig> }) => (
        <span className="font-mono font-medium">
          {row.original.positionKey}
        </span>
      ),
    },
    {
      accessorKey: "side",
      header: "Lado",
      cell: ({ row }: { row: Row<TirePositionConfig> }) => (
        <span>{tireSideLabels[row.original.side] || row.original.side}</span>
      ),
    },
    {
      accessorKey: "isDual",
      header: "Dual",
      cell: ({ row }: { row: Row<TirePositionConfig> }) => (
        <span>{row.original.isDual ? "Sí" : "No"}</span>
      ),
    },
    {
      id: "equipment",
      header: "Equipo",
      cell: ({ row }: { row: Row<TirePositionConfig> }) => (
        <div>
          <div className="font-medium">
            {row.original.axle?.equipment?.name || "Sin equipo"}
          </div>
          <div className="text-sm text-muted-foreground">
            {row.original.axle?.equipment?.internalCode &&
              `Código: ${row.original.axle.equipment.internalCode}`}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      cell: ({ row }: { row: Row<TirePositionConfig> }) => {
        const d = row.original.createdAt
          ? new Date(row.original.createdAt)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<TirePositionConfig> }) => {
        const config = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={`/tires/position-configs/${config.id}`}>
              <Button variant="outline" size="sm" title="Ver / Editar">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/tires/position-configs/${config.id}/edit`}>
              <Button variant="outline" size="sm" title="Editar">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              title="Eliminar"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
