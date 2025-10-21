// filepath: sae-frontend/app/companies/list/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { Company } from "@/lib/types/company";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

export function getCompanyColumns(): ColumnDef<Company>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }: { row: Row<Company> }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "cuit",
      header: "CUIT",
      cell: ({ row }: { row: Row<Company> }) => (
        <span>{row.original.cuit}</span>
      ),
    },
    {
      accessorKey: "businessName",
      header: "Razón social",
      cell: ({ row }: { row: Row<Company> }) => (
        <span>{row.original.businessName || "-"}</span>
      ),
    },
    {
      accessorKey: "businessCategory.name",
      header: "Rubro",
      cell: ({ row }: { row: Row<Company> }) => (
        <span>{row.original.businessCategory?.name || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<Company> }) => {
        const company = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={`/companies/${company.id}`}>
              <Button variant="outline" size="sm" title="Ver detalle">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];
}
