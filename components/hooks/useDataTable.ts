// filepath: /sae-frontend/components/data-table/use-data-table.ts
"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseDataTableProps<TData> {
  data: TData[];
  columns: any[];
  searchableColumns?: string[];
}

export function useDataTable<TData>({
  data,
  columns,
  searchableColumns = [],
  pageCount,
  rowCount,
  manualPagination = false,
  manualFiltering = false,
}: UseDataTableProps<TData> & {
  pageCount?: number;
  rowCount?: number;
  manualPagination?: boolean;
  manualFiltering?: boolean;
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    manualPagination,
    manualFiltering,

    globalFilterFn: "includesString",
  });

  return {
    table,
    globalFilter,
    setGlobalFilter,
  };
}
