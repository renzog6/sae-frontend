// filepath: sae-frontend/components/data-table.tsx
"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type HeaderGroup,
  type Header,
  type Row,
  type Cell,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableColumn?: keyof TData; // backward-compatible single column
  searchableColumns?: (keyof TData)[]; // new: multiple columns
  searchPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchableColumn,
  searchableColumns,
  searchPlaceholder = "Buscar...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filter, setFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    globalFilterFn: "includesString",
  });

  const filteredRows = React.useMemo(() => {
    if (!filter) return data;
    const q = filter.toLowerCase();
    const keys: string[] =
      Array.isArray(searchableColumns) && searchableColumns.length
        ? (searchableColumns as string[])
        : searchableColumn
        ? [searchableColumn as string]
        : [];
    if (!keys.length) return data;
    return data.filter((row: any) =>
      keys.some((k) => {
        const value = String(row?.[k] ?? "").toLowerCase();
        return value.includes(q);
      })
    );
  }, [data, filter, searchableColumn, searchableColumns]);

  const tableForRender = useReactTable({
    data: filteredRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="space-y-4">
      {(searchableColumn ||
        (searchableColumns && searchableColumns.length)) && (
        <div className="flex items-center justify-between gap-2">
          <Input
            placeholder={searchPlaceholder}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {tableForRender
              .getHeaderGroups()
              .map((headerGroup: HeaderGroup<TData>) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header: Header<TData, unknown>) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
          </TableHeader>
          <TableBody>
            {tableForRender.getRowModel().rows?.length ? (
              tableForRender.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
