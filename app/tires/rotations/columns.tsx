// filepath: sae-frontend/app/tires/rotations/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { TireRotation } from "@/lib/types/domain/tire";

export function getTireRotationColumns(): ColumnDef<TireRotation>[] {
  return [
    {
      accessorKey: "tire.serialNumber",
      header: "N° Serie",
      cell: ({ row }: { row: Row<TireRotation> }) => (
        <span className="font-medium">
          #{row.original.tire?.serialNumber || "N/A"}
        </span>
      ),
    },
    {
      id: "brand",
      header: "Marca",
      cell: ({ row }: { row: Row<TireRotation> }) => (
        <span>{row.original.tire?.model?.brand?.name || "-"}</span>
      ),
    },
    {
      id: "model",
      header: "Modelo",
      cell: ({ row }: { row: Row<TireRotation> }) => (
        <span>{row.original.tire?.model?.name || "-"}</span>
      ),
    },
    {
      id: "size",
      header: "Medida",
      cell: ({ row }: { row: Row<TireRotation> }) => (
        <span>{row.original.tire?.model?.size?.mainCode || "-"}</span>
      ),
    },
    {
      accessorKey: "rotationDate",
      header: "Fecha Rotación",
      cell: ({ row }: { row: Row<TireRotation> }) => {
        const d = row.original.rotationDate
          ? new Date(row.original.rotationDate)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      accessorKey: "fromPosition",
      header: "Posición Anterior",
      cell: ({ row }: { row: Row<TireRotation> }) => (
        <span>{row.original.fromPosition || "-"}</span>
      ),
    },
    {
      accessorKey: "toPosition",
      header: "Nueva Posición",
      cell: ({ row }: { row: Row<TireRotation> }) => (
        <span>{row.original.toPosition || "-"}</span>
      ),
    },
    {
      accessorKey: "kmAtRotation",
      header: "Km al Rotar",
      cell: ({ row }: { row: Row<TireRotation> }) => (
        <span>
          {row.original.kmAtRotation ? `${row.original.kmAtRotation} km` : "-"}
        </span>
      ),
    },
    {
      accessorKey: "fromEquipmentId",
      header: "Equipo Anterior",
      cell: ({ row }: { row: Row<TireRotation> }) => (
        <span>
          {row.original.fromEquipmentId
            ? `EQ-${row.original.fromEquipmentId}`
            : "-"}
        </span>
      ),
    },
    {
      accessorKey: "toEquipmentId",
      header: "Nuevo Equipo",
      cell: ({ row }: { row: Row<TireRotation> }) => (
        <span>
          {row.original.toEquipmentId
            ? `EQ-${row.original.toEquipmentId}`
            : "-"}
        </span>
      ),
    },
    {
      id: "createdAt",
      header: "Creado",
      cell: ({ row }: { row: Row<TireRotation> }) => {
        const d = row.original.rotationDate
          ? new Date(row.original.rotationDate)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
  ];
}
