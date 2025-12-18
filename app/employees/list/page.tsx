// filepath: sae-frontend/app/employees/list/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { Employee } from "@/lib/types/domain/employee";
import { EmployeeStatus } from "@/lib/types/domain/employee";
import { useEmployeesList } from "@/lib/hooks/useEmployees";
import { employeeStatusLabels } from "@/lib/constants";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
import { useGenerateReport } from "@/lib/hooks/useReports";
import { ReportType } from "@/lib/types/domain/report";

import { getEmployeeColumns } from "./columns";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { PaginationBar } from "@/components/data-table/pagination-bar";

type StatusFilter = "ALL" | EmployeeStatus;

export default function EmployeesPage() {
  const [status, setStatus] = useState<StatusFilter>(EmployeeStatus.ACTIVE);
  const [sortBy, setSortBy] = useState("person.lastName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data: employeesResponse } = useEmployeesList({
    page: 1,
    limit: 100, // Get all data for client-side filtering and pagination
    sortBy,
    sortOrder,
  });

  const generateReportMutation = useGenerateReport();

  const allEmployees: Employee[] = employeesResponse?.data ?? [];

  const columns = useMemo(() => getEmployeeColumns(), []);

  // Filter employees by status (client-side filtering)
  const filteredEmployees = useMemo(() => {
    if (status === "ALL") return allEmployees;
    return allEmployees.filter((emp) => emp.status === status);
  }, [allEmployees, status]);

  // Set up data table with search and pagination
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: filteredEmployees,
    columns,
    searchableColumns: [
      "employeeCode",
      "person.lastName",
      "person.firstName",
      "person.cuil",
    ],
  });

  // Calculate pagination from table state
  const totalFilteredItems = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-2xl">Empleados</CardTitle>
              {/* Report generation dropdown */}
              <ReportExportMenu
                reportType={ReportType.EMPLOYEE_LIST}
                filter={{ status: "active" }}
                title="Empleados"
              />
            </div>
          </div>
          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex gap-2">
              {/* Status filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[140px] justify-between"
                  >
                    <span className="mr-2">🏷️</span>
                    {status === "ALL" ? "Todos" : employeeStatusLabels[status]}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setStatus("ALL")}>
                    <span className="mr-2">👥</span> Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatus(EmployeeStatus.ACTIVE)}
                  >
                    <span className="mr-2">✅</span>{" "}
                    {employeeStatusLabels[EmployeeStatus.ACTIVE]}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatus(EmployeeStatus.SUSPENDED)}
                  >
                    <span className="mr-2">⏸️</span>{" "}
                    {employeeStatusLabels[EmployeeStatus.SUSPENDED]}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatus(EmployeeStatus.TERMINATED)}
                  >
                    <span className="mr-2">❌</span>{" "}
                    {employeeStatusLabels[EmployeeStatus.TERMINATED]}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* AGREGADO: Sort field selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[160px] justify-between"
                  >
                    <span className="mr-2">🔄</span>
                    {sortBy === "person.lastName"
                      ? "Apellido"
                      : sortBy === "employeeCode"
                      ? "Legajo"
                      : sortBy === "createdAt"
                      ? "Fecha Creación"
                      : sortBy}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setSortBy("person.lastName")}
                  >
                    <span className="mr-2">👤</span> Apellido
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("employeeCode")}>
                    <span className="mr-2">🏷️</span> Legajo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("createdAt")}>
                    <span className="mr-2">📅</span> Fecha Creación
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* AGREGADO: Sort order selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[120px] justify-between"
                  >
                    <span className="mr-2">⬆️⬇️</span>
                    {sortOrder === "desc" ? "Descendente" : "Ascendente"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setSortOrder("asc")}>
                    <span className="mr-2">⬆️</span> Ascendente
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("desc")}>
                    <span className="mr-2">⬇️</span> Descendente
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable<Employee>
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <PaginationBar
            page={table.getState().pagination.pageIndex + 1}
            totalPages={totalPages}
            totalItems={totalFilteredItems}
            limit={table.getState().pagination.pageSize}
            onPageChange={(newPage) => {
              table.setPagination({
                pageIndex: newPage - 1,
                pageSize: table.getState().pagination.pageSize,
              });
            }}
            onLimitChange={(newLimit) => {
              table.setPagination({ pageIndex: 0, pageSize: newLimit });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
