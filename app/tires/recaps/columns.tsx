// filepath: sae-frontend/app/tires/recaps/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { TireRecap } from "@/lib/types/domain/tire";

export function getTireRecapColumns(): ColumnDef<TireRecap>[] {
  return [
    {
      accessorKey: "tire.serialNumber",
      header: "N° Serie",
      cell: ({ row }: { row: Row<TireRecap> }) => (
        <span className="font-medium">
          #{row.original.tire?.serialNumber || "N/A"}
        </span>
      ),
    },
    {
      id: "brand",
      header: "Marca",
      cell: ({ row }: { row: Row<TireRecap> }) => (
        <span>{row.original.tire?.model?.brand?.name || "-"}</span>
      ),
    },
    {
      id: "model",
      header: "Modelo",
      cell: ({ row }: { row: Row<TireRecap> }) => (
        <span>{row.original.tire?.model?.name || "-"}</span>
      ),
    },
    {
      id: "size",
      header: "Medida",
      cell: ({ row }: { row: Row<TireRecap> }) => (
        <span>{row.original.tire?.model?.size?.mainCode || "-"}</span>
      ),
    },
    {
      accessorKey: "recapDate",
      header: "Fecha Recapado",
      cell: ({ row }: { row: Row<TireRecap> }) => {
        const d = row.original.recapDate
          ? new Date(row.original.recapDate)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      accessorKey: "recapNumber",
      header: "N° Recapado",
      cell: ({ row }: { row: Row<TireRecap> }) => (
        <span>N°{row.original.recapNumber}</span>
      ),
    },
    {
      accessorKey: "recapType",
      header: "Tipo",
      cell: ({ row }: { row: Row<TireRecap> }) => (
        <span>{row.original.recapType || "-"}</span>
      ),
    },
    {
      accessorKey: "provider",
      header: "Proveedor",
      cell: ({ row }: { row: Row<TireRecap> }) => (
        <span>{row.original.provider || "-"}</span>
      ),
    },
    {
      accessorKey: "kmAtRecap",
      header: "Km al Recapado",
      cell: ({ row }: { row: Row<TireRecap> }) => (
        <span>
          {row.original.kmAtRecap ? `${row.original.kmAtRecap} km` : "-"}
        </span>
      ),
    },
    {
      accessorKey: "cost",
      header: "Costo",
      cell: ({ row }: { row: Row<TireRecap> }) => {
        const cost = row.original.cost;
        if (cost === null || cost === undefined) return <span>-</span>;

        // Handle Prisma Decimal objects
        let numericValue: number | null = null;
        if (typeof cost === "object" && cost !== null) {
          // Prisma Decimal object with s, e, d properties
          const decimalObj = cost as any;
          if (decimalObj.d && Array.isArray(decimalObj.d)) {
            // Convert Prisma Decimal to number
            const digits = decimalObj.d;
            const exponent = decimalObj.e || 0;
            const sign = decimalObj.s || 1;

            // Build the number from digits array
            let mantissa = 0;
            for (let i = 0; i < digits.length; i++) {
              mantissa = mantissa * 10 + digits[i];
            }

            // Apply decimal places based on exponent
            // For Decimal(10,2), exponent represents decimal places
            const decimalPlaces = Math.abs(Math.min(exponent, 0));
            const scale = Math.pow(10, decimalPlaces);

            numericValue = (mantissa / scale) * sign;
          }
        } else {
          numericValue = parseFloat(String(cost));
        }

        return (
          <span>
            {numericValue !== null && !isNaN(numericValue)
              ? `$${numericValue.toLocaleString()}`
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "notes",
      header: "Notas",
      cell: ({ row }: { row: Row<TireRecap> }) => (
        <span className="max-w-xs truncate" title={row.original.notes || ""}>
          {row.original.notes || "-"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      cell: ({ row }: { row: Row<TireRecap> }) => {
        const d = row.original.createdAt
          ? new Date(row.original.createdAt)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
  ];
}
