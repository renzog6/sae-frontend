// filepath: sae-frontend\components\data-table\data-table-v2.tsx 
"use client";

import * as React from "react";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Settings2,
  X,
  ArrowUp,
  ArrowDown,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TData> {
  table: TableType<TData>;
  showColumnFilters?: boolean;
  showSorting?: boolean;
  showVisibility?: boolean;
  totalItems?: number;
  isLoading?: boolean;
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  searchPlaceholder?: string;
}

export function DataTable<TData>({
  table,
  showColumnFilters = true,
  showSorting = true,
  showVisibility = true,
  totalItems,
  isLoading = false,
}: DataTableProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalCount = totalItems ?? table.getFilteredRowModel().rows.length;

  const from = totalCount === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className="flex flex-col w-full h-full bg-white border rounded shadow-sm relative">
      {/* Refetching Progress Bar */}
      {isLoading && table.getRowModel().rows.length > 0 && (
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20 overflow-hidden">
          <div className="h-full bg-blue-500 w-1/2 animate-loading-bar" />
        </div>
      )}

      {/* Table Container with scroll overflow */}
      <div className="flex-1 overflow-auto">
        <Table className="border-collapse table-fixed w-full">
          <TableHeader className="bg-zinc-50 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {/* Row 1: Column Titles */}
                <TableRow className="hover:bg-transparent border-b">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-10 px-2 py-1 text-xs font-bold text-zinc-700 border-r last:border-r-0 whitespace-nowrap text-center"
                      style={{
                        width: header.id === 'actions' ? '80px' : header.getSize()
                      }}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center gap-1 group",
                          header.column.getCanSort() && "cursor-pointer select-none"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {showSorting && header.column.getCanSort() && (
                          <div className="flex items-center">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="w-3 h-3 text-blue-600" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="w-3 h-3 text-blue-600" />
                            ) : (
                              <ChevronsUpDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>

                {/* Row 2: Column Filters */}
                {showColumnFilters && (
                  <TableRow className="hover:bg-transparent border-b">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={`${header.id}-filter`}
                        className="h-10 px-1 py-1 border-r last:border-r-0"
                        style={{ width: header.getSize() }}
                      >
                        {header.column.getCanFilter() ? (
                          <div className="relative flex items-center w-full">
                            <Input
                              placeholder=""
                              value={(header.column.getFilterValue() as string) ?? ""}
                              onChange={(e) =>
                                header.column.setFilterValue(e.target.value)
                              }
                              className="h-7 px-2 pr-7 text-xs bg-white border-zinc-200 focus-visible:ring-1 focus-visible:ring-zinc-400 rounded-sm"
                            />
                            {Boolean(header.column.getFilterValue()) ? (
                              <button
                                onClick={() => header.column.setFilterValue("")}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                            )}
                          </div>
                        ) : null}
                      </TableHead>
                    ))}
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading && table.getRowModel().rows.length === 0 ? (
              // Loading Skeleton State
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`} className="hover:bg-transparent border-b">
                  {table.getAllColumns().map((column, j) => (
                    <TableCell
                      key={`skeleton-cell-${i}-${j}`}
                      className="px-2 py-2.5 border-r last:border-r-0"
                    >
                      <Skeleton className="h-4 w-full opacity-50" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "hover:bg-zinc-50 border-b group",
                    // Ejemplo de resaltado (puedes ajustar según lógica de negocio si el usuario lo pide)
                    row.original && (row.original as any).status === 'Confirmed' && "bg-green-50/50"
                  )}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className="px-2 py-1.5 text-xs text-zinc-600 border-r last:border-r-0 truncate text-center"
                      style={{
                        width: cell.column.id === 'actions' ? '80px' : cell.column.getSize()
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {/* Indicador de fila (triángulo) en la primera celda */}
                        {index === 0 && (
                          <Play className="w-2.5 h-2.5 fill-black text-black shrink-0" />
                        )}
                        <span className="truncate">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleFlatColumns().length}
                  className="py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Filter className="w-8 h-8 text-zinc-200" />
                    <p className="text-zinc-500 text-sm">
                      No se encontraron resultados para los filtros aplicados.
                    </p>
                    {table.getState().columnFilters.length > 0 && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => table.resetColumnFilters()}
                        className="text-blue-600"
                      >
                        Limpiar todos los filtros
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Styled Pagination Footer (Image-like) */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-t select-none text-zinc-600">
        {/* Left: Spacer (was search) */}
        <div className="flex items-center gap-2 max-w-[300px] flex-1"></div>

        {/* Center: Pagination Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-500"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-500"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span>Página</span>
            <Input
              className="h-8 w-12 text-center px-1 text-xs border-zinc-200"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
            <span>de {table.getPageCount()}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-500"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-500"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Page Size Select */}
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-20 text-xs border-zinc-200 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {[10, 15, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`} className="text-xs">
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Right: Record info */}
        <div className="text-xs font-medium text-zinc-500 min-w-[150px] text-right">
          Mostrando {from} - {to} de {totalCount}
        </div>
      </div>

      {/* Visibility Toggle (Conditional) */}
      {showVisibility && (
        <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-white/80 backdrop-blur">
                <Settings2 className="w-3.5 h-3.5 mr-1.5" />
                Columnas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuItem
                    key={column.id}
                    className="capitalize text-xs"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <label className="flex items-center cursor-pointer w-full">
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                        className="mr-2"
                      />
                      {column.id}
                    </label>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
