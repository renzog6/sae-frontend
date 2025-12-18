// filepath: sae-frontend/app/tires/sizes/page.tsx
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
import type { TireSize } from "@/lib/types/domain/tire";
import { useTireSizes } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { getTireSizeColumns } from "./columns";
import { TireSizeDialog } from "@/components/tire/tire-size-dialog";
import { TireSizeAliasDialog } from "@/components/tire/tire-size-alias-dialog";

export default function TireSizesPage() {
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { useGetAll } = useTireSizes();
  const {
    data: sizesResponse,
    isLoading,
    error,
  } = useGetAll({
    page,
    limit,
    query: "",
  });

  // Invalidate queries when alias is created/updated/deleted
  const invalidateQueries = () => {
    // This will be called after alias operations
  };

  const sizes: TireSize[] = Array.isArray(sizesResponse)
    ? sizesResponse
    : (sizesResponse as any)?.data ?? [];
  const totalPages = (sizesResponse as any)?.meta?.totalPages ?? 1;
  const totalItems = (sizesResponse as any)?.meta?.total ?? 0;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<TireSize | null>(null);

  const [aliasDialogOpen, setAliasDialogOpen] = useState(false);
  const [selectedForAlias, setSelectedForAlias] = useState<TireSize | null>(
    null
  );

  const columns = useMemo(
    () =>
      getTireSizeColumns({
        onEdit: (item) => {
          setSelected(item);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onAddAlias: (item) => {
          setSelectedForAlias(item);
          setAliasDialogOpen(true);
        },
      }),
    []
  );

  // TanStack Table
  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: sizes,
    columns,
    searchableColumns: ["name", "code"],
  });

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Tamaños de neumáticos</CardTitle>
            <Button
              onClick={() => {
                setDialogMode("create");
                setSelected(null);
                setDialogOpen(true);
              }}
            >
              Nuevo tamaño
            </Button>
          </div>
          <CardDescription>Gestión de tamaños de neumáticos</CardDescription>
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
              searchPlaceholder="🔍 Buscar por medida..."
            />
          )}
          {/* Pagination controls */}
          <PaginationBar
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setPage(1);
              setLimit(newLimit);
            }}
          />
        </CardContent>
      </Card>

      <TireSizeDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
        mode={dialogMode}
        size={selected}
      />

      {selectedForAlias && (
        <TireSizeAliasDialog
          open={aliasDialogOpen}
          onOpenChange={(o: boolean) => {
            setAliasDialogOpen(o);
            if (!o) {
              setSelectedForAlias(null);
              // Refresh the data after alias operations
              window.location.reload();
            }
          }}
          mode="create"
          tireSize={selectedForAlias}
          alias={null}
        />
      )}
    </div>
  );
}
