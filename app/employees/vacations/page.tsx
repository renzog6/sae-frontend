// filepath: sae-frontend/app/employees/vacations/page.tsx
"use client";

import { useMemo } from "react";
import type { Employee } from "@/lib/types/domain/employee";
import { useEmployeesList } from "@/lib/hooks";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getVacationColumns } from "./columns";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";

export default function EmployeeVacationsPage() {
  const columns = useMemo(() => getVacationColumns(), []);

  const { data: employeesData } = useEmployeesList();

  const employees: Employee[] = Array.isArray(employeesData)
    ? employeesData
    : (employeesData as any)?.data ?? [];

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: employees,
    columns,
    searchableColumns: ["person.lastName", "person.firstName", "employeeCode"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <EntityListLayout
      title="Vacaciones"
      description={`Gestión de vacaciones de empleados - ${filteredCount} empleado${
        filteredCount !== 1 ? "s" : ""
      }`}
      actions={
        <ReportExportMenu
          reportType={ReportType.EMPLOYEE_VACATION_BALANCE}
          filter={{ status: "active" }}
          title="Empleados"
        />
      }
    >
      <EntityErrorState error={null} />

      <DataTable
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        searchPlaceholder="Buscar empleados..."
      />

      <PaginationBar
        page={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        totalItems={filteredCount}
        limit={table.getState().pagination.pageSize}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        onLimitChange={(limit) => table.setPageSize(limit)}
      />
    </EntityListLayout>
  );
}
