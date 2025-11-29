// filepath: sae-frontend/app/tires/sizes/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { TireSize } from "@/lib/types/domain/tire";
import { useTireSizes } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { getTireSizeColumns } from "./columns";
import { TireSizeDialog } from "@/components/tire/tire-size-dialog";
import { TireSizeAliasDialog } from "@/components/tire/tire-size-alias-dialog";

export default function TireSizesPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [query, setQuery] = useState("");

  // Debounce query
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, limit]);

  const { useGetAll } = useTireSizes();
  const {
    data: sizesResponse,
    isLoading,
    error,
  } = useGetAll({
    page,
    limit,
    query: debouncedQuery,
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

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar por medida..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              {/* Page size selector is now in PaginationBar */}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable<TireSize, unknown> columns={columns} data={sizes} />
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
        accessToken={accessToken}
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
          accessToken={accessToken}
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
