// filepath: sae-frontend/app/employees/categories/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { EmployeeCategory } from "@/lib/types/domain/employee";
import { useEmployeeCategories } from "@/lib/hooks";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getEmployeeCategoryColumns } from "./columns";
import { EmployeeCategoryDialog } from "@/components/employees/employee-category-dialog";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";

export default function EmployeeCategoriesPage() {
  const { data: categoriesData, isLoading, error } = useEmployeeCategories();
  const categories = categoriesData?.data ?? [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<EmployeeCategory | null>(null);

  const columns = useMemo(
    () =>
      getEmployeeCategoryColumns({
        onEdit: (item) => {
          setSelected(item);
          setDialogMode("edit");
          setDialogOpen(true);
        },
      }),
    []
  );

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: categories,
    columns,
    searchableColumns: ["name", "code"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <>
      <EntityListLayout
        title="Categorías de empleados"
        description={`Gestión de categorías de empleados - ${filteredCount} categoría${
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
            Nueva categoría
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
            searchPlaceholder="Buscar categorías..."
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

      <EmployeeCategoryDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
        mode={dialogMode}
        category={selected}
      />
    </>
  );
}
