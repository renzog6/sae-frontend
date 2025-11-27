// filepath: sae-frontend/app/tires/list/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Tire } from "@/lib/types/domain/tire";

export function getTireColumns(): ColumnDef<Tire>[] {
  return [
    {
      accessorKey: "serialNumber",
      header: "N° Serie",
      cell: ({ row }: { row: Row<Tire> }) => (
        <span className="font-medium">{row.original.serialNumber}</span>
      ),
    },
    {
      id: "brand",
      header: "Marca",
      cell: ({ row }: { row: Row<Tire> }) => (
        <span>{row.original.model?.brand?.name || "-"}</span>
      ),
    },
    {
      id: "model",
      header: "Modelo",
      cell: ({ row }: { row: Row<Tire> }) => (
        <span>{row.original.model?.name || "-"}</span>
      ),
    },
    {
      id: "size",
      header: "Medida",
      cell: ({ row }: { row: Row<Tire> }) => (
        <span>{row.original.model?.size?.mainCode || "-"}</span>
      ),
    },
    {
      accessorKey: "position",
      header: "Posición",
      cell: ({ row }: { row: Row<Tire> }) => (
        <span>{row.original.position || "-"}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }: { row: Row<Tire> }) => {
        const status = row.original.status;
        const statusLabels: Record<string, string> = {
          IN_STOCK: "En Stock",
          IN_USE: "En Uso",
          UNDER_REPAIR: "En Reparación",
          RECAP: "Recapado",
          DISCARDED: "Descartado",
        };
        return <span>{statusLabels[status] || status}</span>;
      },
    },
    {
      accessorKey: "totalKm",
      header: "Km Totales",
      cell: ({ row }: { row: Row<Tire> }) => (
        <span>{row.original.totalKm || "-"}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      cell: ({ row }: { row: Row<Tire> }) => {
        const d = row.original.createdAt
          ? new Date(row.original.createdAt)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<Tire> }) => {
        const tire = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={`/tires/${tire.id}`}>
              <Button variant="outline" size="sm" title="Ver / Editar">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];
}
