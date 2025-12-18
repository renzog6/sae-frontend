// filepath: sae-frontend/app/tires/inspections/page.tsx
"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTireInspections } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { getTireInspectionColumns } from "./columns";

export default function TireInspectionsPage() {
  const { useGetAll } = useTireInspections();
  const { data: inspectionsData, isLoading, error } = useGetAll();

  const inspections = Array.isArray(inspectionsData)
    ? inspectionsData
    : (inspectionsData as any)?.data ?? [];

  const columns = useMemo(() => getTireInspectionColumns(), []);

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: inspections,
    columns,
    searchableColumns: ["serialNumber", "size"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">
              Inspecciones de Neumáticos
            </CardTitle>
          </div>
          <CardDescription>
            {filteredCount} inspeccion{filteredCount !== 1 ? "es" : ""} de
            neumáticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando inspecciones...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              searchPlaceholder="Buscar inspecciones..."
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
