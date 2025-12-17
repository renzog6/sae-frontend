// filepath: sae-frontend/app/tires/recaps/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTireRecaps } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { getTireRecapColumns } from "./columns";

export default function TireRecapsPage() {
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

  const { useGetAll } = useTireRecaps();
  const {
    data: recapsData,
    isLoading,
    error,
  } = useGetAll({
    page,
    limit,
    q: debouncedQuery || undefined,
  });

  const recaps = Array.isArray(recapsData)
    ? recapsData
    : (recapsData as any)?.data ?? [];
  const totalPages = (recapsData as any)?.meta?.totalPages ?? 1;
  const totalItems = (recapsData as any)?.meta?.total ?? 0;

  const columns = useMemo(() => getTireRecapColumns(), []);

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Recapados de Neumáticos</CardTitle>
          </div>
          <CardDescription>
            Historial completo de recapados realizados a los neumáticos
          </CardDescription>

          {/* Filters Row */}
          <div className="flex flex-col gap-4 mt-4 sm:flex-row">
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar por número de serie o medida..."
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
            <p>Cargando recapados...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable columns={columns} data={recaps} />
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
    </div>
  );
}
