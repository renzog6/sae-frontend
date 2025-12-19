// filepath: sae-frontend/app/tires/list/page.tsx
"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Tire } from "@/lib/types/domain/tire";
import { useTires } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getTireColumns } from "./columns";
import { ReportExportMenu } from "@/components/reports/report-export-menu";
import { ReportType } from "@/lib/types";
import { PaginationBar } from "@/components/data-table/pagination-bar";

export default function TiresPage() {
  const { useGetAll } = useTires();
  const { data: tiresData, isLoading, error } = useGetAll();

  const tires: Tire[] = Array.isArray(tiresData)
    ? tiresData
    : (tiresData as any)?.data ?? [];

  const columns = useMemo(() => getTireColumns(), []);

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: tires,
    columns,
    searchableColumns: ["serialNumber", "brand", "model"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

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
          <CardDescription>
            {filteredCount} neumático{filteredCount !== 1 ? "s" : ""}
          </CardDescription>

          {/* Report generation dropdown */}
          <ReportExportMenu
            reportType={ReportType.TIRE_LIST}
            filter={{ status: "active" }}
            title="Neumaticos"
          />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              searchPlaceholder="Buscar neumáticos..."
            />
          )}
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
