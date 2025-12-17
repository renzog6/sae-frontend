// filepath: sae-frontend/app/employees/vacations/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { getVacationColumns } from "./columns";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";

type StatusFilter = "ALL" | EmployeeStatus;

export default function EmployeeVacationsPage() {
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const columns = useMemo(() => getVacationColumns(), []);

  // Filters state
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>(EmployeeStatus.ACTIVE);
  const [sortBy, setSortBy] = useState("person.lastName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const getStatusLabel = (status: StatusFilter) => {
    return status === "ALL" ? "Todos" : employeeStatusLabels[status];
  };

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

  const { data: employeesData } = useEmployeesList({
    page,
    limit,
    q: debouncedQuery || undefined,
    sortBy,
    sortOrder,
  });

  const employees: Employee[] = Array.isArray(employeesData)
    ? employeesData
    : (employeesData as any)?.data ?? [];
  const totalPages = (employeesData as any)?.meta?.totalPages ?? 1;
  const totalItems = (employeesData as any)?.meta?.total ?? 0;

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
                Gestión de vacaciones de empleados
              </CardDescription>
            </div>
            {/* Report generation dropdown */}
            <ReportExportMenu
              reportType={ReportType.EMPLOYEE_VACATION_BALANCE}
              filter={{ status: "active" }}
              title="Empleados"
            />
          </div>
          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar por legajo o apellido y nombre..."
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
                    {getStatusLabel(status)}
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
            totalItems={totalItems}
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
