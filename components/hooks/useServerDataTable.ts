// filepath: sae-frontend/components/hooks/useServerDataTable.ts
"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";

interface UseServerDataTableProps<TData> {
  queryKey: string[];
  queryFn: (params: {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filters?: Record<string, string>; // Para filtros por columna
  }) => Promise<{ data: TData[]; meta: { total: number; totalPages: number } }>;
  columns: ColumnDef<TData>[];
  defaultPageSize?: number;
}

export function useServerDataTable<TData>({
  queryKey,
  queryFn,
  columns,
  defaultPageSize = 10,
}: UseServerDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Convertir filtros de columna a formato para API
  const filters = useMemo(() => {
    const filterObj: Record<string, string> = {};
    columnFilters.forEach((filter) => {
      if (filter.value) {
        filterObj[filter.id] = String(filter.value);
      }
    });
    return filterObj;
  }, [columnFilters]);

  // Construir parámetros para la query
  const queryParams = useMemo(
    () => ({
      page: pagination.pageIndex + 1, // API usa 1-based
      limit: pagination.pageSize,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc ? ("desc" as const) : ("asc" as const),
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    }),
    [pagination, sorting, filters]
  );

  // Query con TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKey, queryParams],
    queryFn: () => queryFn(queryParams),
  });

  // Configurar TanStack Table
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualSorting: true, // Server-side sorting
    manualPagination: true, // Server-side pagination
    manualFiltering: true, // Server-side filtering
    pageCount: data?.meta?.totalPages ?? 0,
  });

  return {
    table,
    isLoading,
    error,
    totalItems: data?.meta?.total ?? 0,
  };
}
