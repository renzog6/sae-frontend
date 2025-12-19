// filepath: sae-frontend/app/tires/models/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TireModel } from "@/lib/types/domain/tire";
import { useTireModels } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { getTireModelColumns } from "./columns";
import { TireModelDialog } from "@/components/tire/tire-model-dialog";

export default function TireModelsPage() {
  const { useGetAll } = useTireModels();
  const { data: modelsResponse, isLoading, error } = useGetAll();

  const models: TireModel[] = Array.isArray(modelsResponse)
    ? modelsResponse
    : (modelsResponse as any)?.data ?? [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<TireModel | null>(null);

  const columns = useMemo(
    () =>
      getTireModelColumns({
        onEdit: (item) => {
          setSelected(item);
          setDialogMode("edit");
          setDialogOpen(true);
        },
      }),
    []
  );

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: models,
    columns,
    searchableColumns: ["name"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Modelos de neumáticos</CardTitle>
            <Button
              onClick={() => {
                setDialogMode("create");
                setSelected(null);
                setDialogOpen(true);
              }}
            >
              Nuevo modelo
            </Button>
          </div>
          <CardDescription>
            {filteredCount} modelo{filteredCount !== 1 ? "s" : ""} de neumático
            {filteredCount !== 1 ? "s" : ""}
          </CardDescription>
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
              searchPlaceholder="Buscar modelos..."
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

      <TireModelDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
        mode={dialogMode}
        model={selected}
      />
    </div>
  );
}
