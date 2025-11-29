// filepath: sae-frontend/app/tires/list/page.tsx
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
import type { Tire } from "@/lib/types/domain/tire";
import { TireStatus } from "@/lib/types/shared/enums";
import { useTires } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table";
import { getTireColumns } from "./columns";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";
import { PaginationBar } from "@/components/data-table/pagination-bar";

type StatusFilter = "ALL" | TireStatus;

export default function TiresPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("ALL");

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

  const { useGetAll } = useTires();
  const {
    data: tiresData,
    isLoading,
    error,
  } = useGetAll({
    page,
    limit,
    status: status === "ALL" ? undefined : status,
  });

  const tires: Tire[] = Array.isArray(tiresData)
    ? tiresData
    : (tiresData as any)?.data ?? [];
  const totalPages = (tiresData as any)?.meta?.totalPages ?? 1;
  const totalItems = (tiresData as any)?.meta?.total ?? 0;

  const columns = useMemo(() => getTireColumns(), []);

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Neumáticos</CardTitle>
            <Button asChild>
              <a href="/tires/new">Nuevo neumático</a>
            </Button>
          </div>
          <CardDescription>Gestión de neumáticos</CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar por número de serie, marca o modelo..."
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
                    {status === "ALL" ? "Todos" : status.replace("_", " ")}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setStatus("ALL")}>
                    <span className="mr-2">👥</span> Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatus(TireStatus.IN_STOCK)}
                  >
                    <span className="mr-2">📦</span> En Stock
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatus(TireStatus.IN_USE)}
                  >
                    <span className="mr-2">🚛</span> En Uso
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatus(TireStatus.UNDER_REPAIR)}
                  >
                    <span className="mr-2">🔧</span> En Reparación
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatus(TireStatus.RECAP)}>
                    <span className="mr-2">🔄</span> Recapado
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatus(TireStatus.DISCARDED)}
                  >
                    <span className="mr-2">🗑️</span> Descartado
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Report generation dropdown */}
              <ReportExportMenu
                reportType={ReportType.TIRE_LIST}
                filter={{ status: "active" }}
                title="Neumaticos"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable columns={columns} data={tires} />
          )}
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
