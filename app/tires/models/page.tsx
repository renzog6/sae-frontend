// filepath: sae-frontend/app/tires/models/page.tsx
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
import type { TireModel } from "@/lib/types/domain/tire";
import { useTireModels } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { getTireModelColumns } from "./columns";
import { TireModelDialog } from "@/components/tire/tire-model-dialog";

export default function TireModelsPage() {
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

  const { useGetAll } = useTireModels();
  const {
    data: modelsResponse,
    isLoading,
    error,
  } = useGetAll({
    page,
    limit,
  });

  const models: TireModel[] = Array.isArray(modelsResponse)
    ? modelsResponse
    : (modelsResponse as any)?.data ?? [];
  const totalPages = (modelsResponse as any)?.meta?.totalPages ?? 1;
  const totalItems = (modelsResponse as any)?.meta?.total ?? 0;

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
          <CardDescription>Gestión de modelos de neumáticos</CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar por nombre..."
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
            <DataTable<TireModel, unknown> columns={columns} data={models} />
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

      <TireModelDialog
        accessToken={accessToken}
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
