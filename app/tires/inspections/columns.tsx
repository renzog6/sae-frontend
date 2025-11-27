// filepath: sae-frontend/app/tires/inspections/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { TireInspection } from "@/lib/types/domain/tire";

export function getTireInspectionColumns(): ColumnDef<TireInspection>[] {
  return [
    {
      accessorKey: "tire.serialNumber",
      header: "N° Serie",
      cell: ({ row }: { row: Row<TireInspection> }) => (
        <span className="font-medium">
          #{row.original.tire?.serialNumber || "N/A"}
        </span>
      ),
    },
    {
      id: "brand",
      header: "Marca",
      cell: ({ row }: { row: Row<TireInspection> }) => (
        <span>{row.original.tire?.model?.brand?.name || "-"}</span>
      ),
    },
    {
      id: "model",
      header: "Modelo",
      cell: ({ row }: { row: Row<TireInspection> }) => (
        <span>{row.original.tire?.model?.name || "-"}</span>
      ),
    },
    {
      id: "size",
      header: "Medida",
      cell: ({ row }: { row: Row<TireInspection> }) => (
        <span>{row.original.tire?.model?.size?.mainCode || "-"}</span>
      ),
    },
    {
      accessorKey: "inspectionDate",
      header: "Fecha Inspección",
      cell: ({ row }: { row: Row<TireInspection> }) => {
        const d = row.original.inspectionDate
          ? new Date(row.original.inspectionDate)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      accessorKey: "pressure",
      header: "Presión (PSI)",
      cell: ({ row }: { row: Row<TireInspection> }) => {
        const pressure = row.original.pressure;

        // Handle Prisma Decimal objects
        let numericValue: number | null = null;
        if (pressure !== null && pressure !== undefined) {
          if (typeof pressure === "object" && pressure !== null) {
            // Prisma Decimal object with s, e, d properties
            const decimalObj = pressure as any;
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
              // For Decimal(5,2), exponent represents decimal places
              const decimalPlaces = Math.abs(Math.min(exponent, 0));
              const scale = Math.pow(10, decimalPlaces);

              numericValue = (mantissa / scale) * sign;
            }
          } else {
            numericValue = parseFloat(String(pressure));
          }
        }

        return (
          <span>
            {numericValue !== null && !isNaN(numericValue)
              ? `${numericValue.toFixed(1)} PSI`
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "treadDepth",
      header: "Profundidad (mm)",
      cell: ({ row }: { row: Row<TireInspection> }) => {
        const treadDepth = row.original.treadDepth;

        // Handle Prisma Decimal objects
        let numericValue: number | null = null;
        if (treadDepth !== null && treadDepth !== undefined) {
          if (typeof treadDepth === "object" && treadDepth !== null) {
            // Prisma Decimal object with s, e, d properties
            const decimalObj = treadDepth as any;
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
              // For Decimal(5,2), exponent represents decimal places
              const decimalPlaces = Math.abs(Math.min(exponent, 0));
              const scale = Math.pow(10, decimalPlaces);

              numericValue = (mantissa / scale) * sign;
            }
          } else {
            numericValue = parseFloat(String(treadDepth));
          }
        }

        return (
          <span>
            {numericValue !== null && !isNaN(numericValue)
              ? `${numericValue.toFixed(1)} mm`
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "observation",
      header: "Observaciones",
      cell: ({ row }: { row: Row<TireInspection> }) => (
        <span
          className="max-w-xs truncate"
          title={row.original.observation || ""}
        >
          {row.original.observation || "-"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      cell: ({ row }: { row: Row<TireInspection> }) => {
        const d = row.original.createdAt
          ? new Date(row.original.createdAt)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
  ];
}
