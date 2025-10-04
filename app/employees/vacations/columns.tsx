// filepath: sae-frontend/app/employees/vacations/columns.tsx
"use client";

import type { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Employee } from "@/types/employee";
import { VacationType } from "@/types/employee";
import { formatTenure } from "@/lib/utils/date";

function sumVacationDays(employee: Employee): number {
  const vacations = employee.vacations || [];
  let assigned = 0;
  let taken = 0;
  for (const v of vacations) {
    const d = Number(v?.days ?? 0) || 0;
    if (v?.type === VacationType.ASSIGNED) assigned += d;
    else if (v?.type === VacationType.TAKEN) taken += d;
  }
  return assigned - taken;
}

export function getVacationColumns(): ColumnDef<Employee>[] {
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
      id: "vacationDays",
      header: () => (
        <div className="flex flex-col items-center leading-tight">
          <div>Dias</div>
          <div className="text-xs text-muted-foreground">(Disponibles)</div>
        </div>
      ),
      cell: ({ row }: { row: Row<Employee> }) => (
        <div className="text-center">{sumVacationDays(row.original)}</div>
      ),
    },
    {
      id: "categoryPosition",
      header: "Categoría y Puesto",
      cell: ({ row }: { row: Row<Employee> }) => (
        <span>{`${row.original.category?.name ?? "-"} - ${
          row.original.position?.name ?? "-"
        }`}</span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }: { row: Row<Employee> }) => {
        const employee = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={`/employees/vacations/detail?id=${employee.id}`}>
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
