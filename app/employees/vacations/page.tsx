// filepath: sae-frontend/app/employees/vacations/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { getVacationColumns } from "./columns";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type StatusFilter = "ALL" | EmployeeStatus;

export default function EmployeeVacationsPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const columns = useMemo(() => getVacationColumns(), []);

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
    : ((employeesData as any)?.data ?? []);
  const totalPages = (employeesData as any)?.meta?.totalPages ?? 1;

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>Vacaciones</CardTitle>
            <div className="flex items-center gap-2 w-full max-w-3xl">
              <div className="relative flex-1">
                <Input
                  placeholder="Buscar por legajo o apellido y nombre..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pr-28"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2 py-1.5 text-sm border rounded-md bg-white hover:bg-zinc-50"
                        title="Filtrar por estado"
                      >
                        {status === "ALL" ? "Todos" : status}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => setStatus("ALL")}>Todos</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatus(EmployeeStatus.ACTIVE)}>ACTIVE</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatus(EmployeeStatus.SUSPENDED)}>SUSPENDED</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatus(EmployeeStatus.TERMINATED)}>TERMINATED</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* Page size selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-2 py-1.5 text-sm border rounded-md bg-white hover:bg-zinc-50"
                    title="Items por página"
                  >
                    {limit}/pag
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => { setPage(1); setLimit(10); }}>10</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setPage(1); setLimit(50); }}>50</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setPage(1); setLimit(100); }}>100</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <CardDescription>Gestión de vacaciones de empleados</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={employees} />
          {/* Pagination controls */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink isActive={p === page} onClick={() => setPage(p)}>{p}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
