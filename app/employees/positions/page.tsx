// filepath: sae-frontend/app/employees/positions/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { EmployeePosition } from "@/lib/types/domain/employee";
import { useEmployeePositions } from "@/lib/hooks";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getEmployeePositionColumns } from "./columns";
import { EmployeePositionDialog } from "@/components/employees/employee-position-dialog";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";

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
    <>
      <EntityListLayout
        title="Puestos de empleados"
        description={`Gestión de puestos de empleados - ${filteredCount} puesto${
          filteredCount !== 1 ? "s" : ""
        }`}
        actions={
          <Button
            onClick={() => {
              setDialogMode("create");
              setSelected(null);
              setDialogOpen(true);
            }}
          >
            Nuevo puesto
          </Button>
        }
      >
        <EntityErrorState error={null} />

        {isLoading ? (
          <EntityLoadingState />
        ) : (
          <DataTable
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            searchPlaceholder="Buscar puestos..."
          />
        )}
      </EntityListLayout>

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
    </>
  );
}
