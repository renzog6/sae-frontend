// filepath: sae-frontend/app/employees/vacations/page.tsx
"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Employee } from "@/lib/types/domain/employee";
import { useEmployeesList } from "@/lib/hooks/useEmployees";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
import { getVacationColumns } from "./columns";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";

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
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">Vacaciones</CardTitle>
              </div>
              <CardDescription>
                {filteredCount} empleado{filteredCount !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            {/* Report generation dropdown */}
            <ReportExportMenu
              reportType={ReportType.EMPLOYEE_VACATION_BALANCE}
              filter={{ status: "active" }}
              title="Empleados"
            />
          </div>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
