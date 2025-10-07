// filepath: sae-frontend/app/employees/list/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
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
import type { Employee } from "@/types/employee";
import { EmployeeStatus } from "@/types/employee";
import { useEmployeesList } from "@/lib/hooks/useEmployees";
import { DataTable } from "@/components/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getEmployeeColumns } from "./columns";

type StatusFilter = "ALL" | EmployeeStatus;

export default function EmployeesPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>(EmployeeStatus.ACTIVE);

  // Debounce query
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, status, limit]);

  const { data: employeesData } = useEmployeesList(accessToken, {
    page,
    limit,
    q: debouncedQuery || undefined,
    status: status === "ALL" ? undefined : status,
  });

  const employees: Employee[] = Array.isArray(employeesData)
    ? employeesData
    : (employeesData as any)?.data ?? [];
  const totalPages = (employeesData as any)?.meta?.totalPages ?? 1;

  const columns = useMemo(() => getEmployeeColumns(), []);

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Empleados</CardTitle>
          </div>
          <CardDescription>Gestión de empleados</CardDescription>

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
                    {status === "ALL"
                      ? "Todos"
                      : status === EmployeeStatus.ACTIVE
                      ? "Activo"
                      : status === EmployeeStatus.SUSPENDED
                      ? "Suspendido"
                      : "Terminado"}
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
                    <span className="mr-2">✅</span> Activo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatus(EmployeeStatus.SUSPENDED)}
                  >
                    <span className="mr-2">⏸️</span> Suspendido
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatus(EmployeeStatus.TERMINATED)}
                  >
                    <span className="mr-2">❌</span> Terminado
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Page size selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[120px] justify-between"
                  >
                    <span className="mr-2">📊</span> {limit}/pág
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => {
                      setPage(1);
                      setLimit(10);
                    }}
                  >
                    10
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setPage(1);
                      setLimit(50);
                    }}
                  >
                    50
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setPage(1);
                      setLimit(100);
                    }}
                  >
                    100
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={employees} />
          {/* Pagination controls */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === page}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
