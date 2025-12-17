// filepath: sae-frontend/app/employees/list/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { DataTable } from "@/components/data-table";
import { useGenerateReport } from "@/lib/hooks/useReports";
import { ReportType } from "@/lib/types/domain/report";

import { getEmployeeColumns } from "./columns";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { PaginationBar } from "@/components/data-table/pagination-bar";

type StatusFilter = "ALL" | EmployeeStatus;

export default function EmployeesPage() {
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>(EmployeeStatus.ACTIVE);
  // ✅ MODIFICADO: Estado para ordenamiento con nuevos valores por defecto
  const [sortBy, setSortBy] = useState("person.lastName"); // ✅ CAMBIADO: Apellido por defecto
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // ✅ CAMBIADO: Ascendente por defecto

  // Debounce query
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, status, limit, sortBy, sortOrder]);

  const { data: employeesResponse } = useEmployeesList({
    page,
    limit,
    q: debouncedQuery || undefined,
    sortBy,
    sortOrder,
  });

  const generateReportMutation = useGenerateReport();

  const employees: Employee[] = employeesResponse?.data ?? [];
  const totalPages = employeesResponse?.meta?.totalPages ?? 1;

  const columns = useMemo(() => getEmployeeColumns(), []);

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
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar por legajo, apellido y nombre o CUIL..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
              />
            </div>
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
          <DataTable columns={columns} data={employees} />
          <PaginationBar
            page={page}
            totalPages={totalPages}
            totalItems={employeesResponse?.meta?.total ?? 0}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
