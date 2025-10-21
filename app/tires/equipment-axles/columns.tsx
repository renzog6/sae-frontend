// filepath: sae-frontend/app/tires/equipment-axles/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { EquipmentAxle } from "@/lib/types/tire";
import { axleTypeLabels } from "@/lib/constants";

export function getEquipmentAxleColumns(): ColumnDef<EquipmentAxle>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: { row: Row<EquipmentAxle> }) => (
        <span className="font-medium">#{row.original.id}</span>
      ),
    },
    {
      id: "equipment",
      header: "Equipo",
      cell: ({ row }: { row: Row<EquipmentAxle> }) => (
        <div>
          <div className="font-medium">
            {row.original.equipment?.name || "Sin nombre"}
          </div>
          <div className="text-sm text-muted-foreground">
            {row.original.equipment?.internalCode &&
              `Código: ${row.original.equipment.internalCode}`}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "order",
      header: "Orden",
      cell: ({ row }: { row: Row<EquipmentAxle> }) => (
        <span>Eje {row.original.order}</span>
      ),
    },
    {
      accessorKey: "axleType",
      header: "Tipo de Eje",
      cell: ({ row }: { row: Row<EquipmentAxle> }) => (
        <span>
          {axleTypeLabels[row.original.axleType] || row.original.axleType}
        </span>
      ),
    },
    {
      accessorKey: "wheelCount",
      header: "Ruedas",
      cell: ({ row }: { row: Row<EquipmentAxle> }) => (
        <span>{row.original.wheelCount} ruedas</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }: { row: Row<EquipmentAxle> }) => (
        <span>{row.original.description || "-"}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      cell: ({ row }: { row: Row<EquipmentAxle> }) => {
        const d = row.original.createdAt
          ? new Date(row.original.createdAt)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<EquipmentAxle> }) => {
        const axle = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={`/tires/equipment-axles/${axle.id}`}>
              <Button variant="outline" size="sm" title="Ver / Editar">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/tires/equipment-axles/${axle.id}/edit`}>
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
