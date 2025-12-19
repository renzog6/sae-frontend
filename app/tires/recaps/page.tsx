// filepath: sae-frontend/app/tires/recaps/page.tsx
"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTireRecaps } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { getTireRecapColumns } from "./columns";

export default function TireRecapsPage() {
  const { useGetAll } = useTireRecaps();
  const { data: recapsData, isLoading, error } = useGetAll();

  const recaps = Array.isArray(recapsData)
    ? recapsData
    : (recapsData as any)?.data ?? [];

  const columns = useMemo(() => getTireRecapColumns(), []);

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: recaps,
    columns,
    searchableColumns: ["serialNumber", "size"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Recapados de Neumáticos</CardTitle>
          </div>
          <CardDescription>
            {filteredCount} recapado{filteredCount !== 1 ? "s" : ""} de
            neumáticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando recapados...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              searchPlaceholder="Buscar recapados..."
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
