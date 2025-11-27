// filepath: sae-frontend/app/employees/list/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Employee } from "@/lib/types/domain/employee";
import { formatTenure } from "@/lib/utils/date";

export function getEmployeeColumns(): ColumnDef<Employee>[] {
  return [
    {
      accessorKey: "employeeCode",
      header: "Legajo",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span className="font-medium">{row.original.employeeCode || "-"}</span>
      ),
    },
    {
      id: "fullName",
      header: "Apellido y Nombre",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span>
          {`${row.original.person?.lastName ?? ""} ${
            row.original.person?.firstName ?? ""
          }`.trim() || "-"}
        </span>
      ),
    },
    {
      id: "cuil",
      header: "CUIL",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span>{row.original.person?.cuil || "-"}</span>
      ),
    },
    {
      accessorKey: "hireDate",
      header: "Ingreso",
      cell: ({ row }: { row: Row<Employee> }) => {
        const d = row.original.hireDate
          ? new Date(row.original.hireDate)
          : null;
        return <span>{d ? d.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      id: "tenure",
      header: "Antigüedad",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span>{formatTenure(row.original.hireDate)}</span>
      ),
    },
    {
      id: "category",
      header: "Categoría",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span>{row.original.category?.name || "-"}</span>
      ),
    },
    {
      id: "position",
      header: "Puesto",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span>{row.original.position?.name || "-"}</span>
      ),
    },
    {
      accessorKey: "information",
      header: "Info",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span>{row.original.information || "-"}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<Employee> }) => {
        const employee = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={`/employees/${employee.id}`}>
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
