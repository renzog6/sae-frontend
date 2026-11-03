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
import { useState, useMemo, useEffect } from "react";

interface UseServerDataTableProps<TData> {
  queryKey: any[];
  queryFn: (params: {
    page: number;
    limit: number;
    filters?: Record<string, string>;
  }) => Promise<{ data: TData[]; meta: { total: number; totalPages: number } }>;
  columns: ColumnDef<TData>[];
  defaultPageSize?: number;
  debounceDelay?: number;
}

export function useServerDataTable<TData>({
  queryKey,
  queryFn,
  columns,
  defaultPageSize = 10,
  debounceDelay = 1000, // Default to 1000ms (1 second)
}: UseServerDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<ColumnFiltersState>([]);

  // Debounce column filters
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedColumnFilters(columnFilters);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [columnFilters, debounceDelay]);

  // Convertir filtros de columna a formato para API
  const filters = useMemo(() => {
    const filterObj: Record<string, string> = {};
    debouncedColumnFilters.forEach((filter) => {
      if (filter.value) {
        filterObj[filter.id] = String(filter.value);
      }
    });
    return filterObj;
  }, [debouncedColumnFilters]);

  // Construir parámetros para la query
  const queryParams = useMemo(
    () => ({
      page: pagination.pageIndex + 1, // API usa 1-based
      limit: pagination.pageSize,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    }),
    [pagination, filters]
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
    manualSorting: false, // Client-side sorting for current page
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
