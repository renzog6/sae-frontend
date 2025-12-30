// filepath: sae-frontend/app/employees/vacations/page.tsx
"use client";

import { useMemo } from "react";
import type { Employee } from "@/lib/types/domain/employee";
import { DataTable } from "@/components/data-table/data-table-v2";
import { useServerDataTable } from "@/components/hooks/useServerDataTable";
import { EmployeesService } from "@/lib/api/employees/employees.service";
import { getVacationColumns } from "./columns";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";

export default function EmployeeVacationsPage() {
  const columns = useMemo(() => getVacationColumns(), []);

  // Query function for server-side data table
  const queryFn = async (params: {
    page: number;
    limit: number;
    filters?: Record<string, string>;
  }) => {
    const queryParams: any = {
      page: params.page,
      limit: params.limit,
    };

    // Map column filters to query params
    if (params.filters) {
      if (params.filters.employeeCode) queryParams.q = params.filters.employeeCode;
      if (params.filters.fullName) queryParams.q = params.filters.fullName;
    }

    return EmployeesService.getAll(queryParams);
  };

  const { table, isLoading, error, totalItems } = useServerDataTable({
    queryKey: ["employees-vacations"],
    queryFn,
    columns,
    defaultPageSize: 10,
  });

  return (
    <EntityListLayout
      title="Vacaciones"
      description="Gestión de vacaciones de empleados"
      actions={
        <ReportExportMenu
          reportType={ReportType.EMPLOYEE_VACATION_BALANCE}
          filter={{ status: "active" }}
          title="Empleados"
        />
      }
    >
      <EntityErrorState error={error} />

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Cargando empleados...</p>
        </div>
      ) : (
        <DataTable<Employee> table={table} totalItems={totalItems} />
      )}
    </EntityListLayout>
  );
}
