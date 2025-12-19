// filepath: sae-frontend/app/equipments/categories/page.tsx
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
import type { EquipmentCategory } from "@/lib/types/domain/equipment";
import { useEquipmentCategories } from "@/lib/hooks/useEquipments";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getEquipmentCategoryColumns } from "./columns";
import { EquipmentCategoryDialog } from "@/components/equipment/equipment-category-dialog";
import { PaginationBar } from "@/components/data-table/pagination-bar";

export default function EquipmentCategoriesPage() {
  const { useGetAll } = useEquipmentCategories();
  const { data: categoriesResponse, isLoading, error } = useGetAll();
  console.log("Categories response:", categoriesResponse);
  console.log("Categories error:", error);

  const categories = categoriesResponse?.data || [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<EquipmentCategory | null>(null);

  const columns = useMemo(
    () =>
      getEquipmentCategoryColumns({
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
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Categorías de equipos</CardTitle>
            <Button
              onClick={() => {
                setDialogMode("create");
                setSelected(null);
                setDialogOpen(true);
              }}
            >
              Nueva categoría
            </Button>
          </div>
          <CardDescription>
            {filteredCount} categor{filteredCount !== 1 ? "ías" : "ía"} de
            equipo{filteredCount !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <DataTable
              table={table}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              searchPlaceholder="Buscar categorías..."
            />
          )}
          <PaginationBar
            page={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            totalItems={filteredCount}
            limit={table.getState().pagination.pageSize}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            onLimitChange={(limit) => table.setPageSize(limit)}
          />
        </CardContent>
      </Card>

      <EquipmentCategoryDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
        mode={dialogMode}
        category={selected}
      />
    </div>
  );
}
