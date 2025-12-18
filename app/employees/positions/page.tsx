// filepath: sae-frontend/app/employees/positions/page.tsx
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
import type { EmployeePosition } from "@/lib/types/domain/employee";
import { useEmployeePositions } from "@/lib/hooks/useEmployees";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
import { getEmployeePositionColumns } from "./columns";
import { EmployeePositionDialog } from "@/components/employees/employee-position-dialog";
import { PaginationBar } from "@/components/data-table/pagination-bar";

export default function EmployeePositionsPage() {
  const { data: positionsData, isLoading, error } = useEmployeePositions();
  const positions = positionsData?.data ?? [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<EmployeePosition | null>(null);

  const columns = useMemo(
    () =>
      getEmployeePositionColumns({
        onEdit: (item) => {
          setSelected(item);
          setDialogMode("edit");
          setDialogOpen(true);
        },
      }),
    []
  );

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: positions,
    columns,
    searchableColumns: ["name", "code"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Puestos de empleados</h1>
        <Button
          onClick={() => {
            setDialogMode("create");
            setSelected(null);
            setDialogOpen(true);
          }}
        >
          Nuevo puesto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>
            {filteredCount} puesto{filteredCount !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <DataTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              searchPlaceholder="Buscar puestos..."
            />
          )}
        </CardContent>
      </Card>

      <PaginationBar
        page={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        totalItems={filteredCount}
        limit={table.getState().pagination.pageSize}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        onLimitChange={(limit) => table.setPageSize(limit)}
      />

      <EmployeePositionDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
        mode={dialogMode}
        position={selected}
      />
    </div>
  );
}
