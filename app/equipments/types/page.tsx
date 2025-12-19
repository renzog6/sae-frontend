// filepath: sae-frontend/app/equipments/types/page.tsx
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
import type { EquipmentType } from "@/lib/types/domain/equipment";
import { useEquipmentTypes } from "@/lib/hooks/useEquipments";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getEquipmentTypeColumns } from "./columns";
import { EquipmentTypeDialog } from "@/components/equipment/equipment-type-dialog";
import { PaginationBar } from "@/components/data-table/pagination-bar";

export default function EquipmentTypesPage() {
  const { useGetAll } = useEquipmentTypes();
  const { data: typesData, isLoading, error } = useGetAll();
  const types = Array.isArray(typesData)
    ? typesData
    : (typesData as any)?.data || [];

  const sortedTypes = useMemo(() => {
    return types.sort((a: EquipmentType, b: EquipmentType) =>
      a.name.localeCompare(b.name)
    );
  }, [types]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<EquipmentType | null>(null);

  const columns = useMemo(
    () =>
      getEquipmentTypeColumns({
        onEdit: (item) => {
          setSelected(item);
          setDialogMode("edit");
          setDialogOpen(true);
        },
      }),
    []
  );

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: sortedTypes,
    columns,
    searchableColumns: ["name", "code"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="p-0 space-y-0 sm:space-y-2 md:space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl">Tipos de equipos</CardTitle>
            <Button
              onClick={() => {
                setDialogMode("create");
                setSelected(null);
                setDialogOpen(true);
              }}
            >
              Nuevo tipo
            </Button>
          </div>
          <CardDescription>
            {filteredCount} tipo{filteredCount !== 1 ? "s" : ""} de equipo
            {filteredCount !== 1 ? "s" : ""}
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
              searchPlaceholder="Buscar tipos de equipo..."
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

      <EquipmentTypeDialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
        mode={dialogMode}
        type={selected}
      />
    </div>
  );
}
