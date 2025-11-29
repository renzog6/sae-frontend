// filepath: sae-frontend/app/tires/rotations/page.tsx
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
import { useTireRotations } from "@/lib/hooks/useTires";
import { DataTable } from "@/components/data-table";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { getTireRotationColumns } from "./columns";

export default function TireRotationsPage() {
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

  const { useGetAll } = useTireRotations();
  const {
    data: rotationsData,
    isLoading,
    error,
  } = useGetAll({
    page,
    limit,
    q: debouncedQuery || undefined,
  });

  const rotations = Array.isArray(rotationsData)
    ? rotationsData
    : (rotationsData as any)?.data ?? [];
  const totalPages = (rotationsData as any)?.meta?.totalPages ?? 1;
  const totalItems = (rotationsData as any)?.meta?.total ?? 0;

  const columns = useMemo(() => getTireRotationColumns(), []);

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Rotaciones de Neumáticos</CardTitle>
          </div>
          <CardDescription>
            Historial completo de rotaciones realizadas a los neumáticos
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
            <p>Cargando rotaciones...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable columns={columns} data={rotations} />
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
