// filepath: sae-frontend/app/settings/locations/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { City } from "@/lib/types/shared/location";
import { useCities } from "@/lib/hooks";
import { CityDialog } from "@/components/locations/city-dialog";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/hooks/useDataTable";
import { getCityColumns } from "./columns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PaginationBar } from "@/components/data-table/pagination-bar";
import { EntityListLayout } from "@/components/entities/entity-list-layout";
import { EntityErrorState } from "@/components/entities/entity-error-state";
import { EntityLoadingState } from "@/components/entities/entity-loading-state";

export default function LocationsPage() {
  const { useGetAll, useDelete } = useCities();
  const citiesQuery = useGetAll();
  const { data: citiesResponse, isLoading, error } = citiesQuery;
  const cities = citiesResponse?.data || [];
  const { mutate: deleteCity, isPending: deleting } = useDelete();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<City | null>(null);

  const handleAdd = () => {
    setSelectedCity(null);
    setDialogMode("create");
    setDialogOpen(true);
  };

  const handleEdit = (city: City) => {
    setSelectedCity(city);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleDelete = (city: City) => {
    setCityToDelete(city);
    setConfirmOpen(true);
  };

  const columns = getCityColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: cities,
    columns,
    searchableColumns: ["name"],
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <EntityListLayout
      title="Localidades"
      description="Gestiona todas las localidades del sistema"
      actions={
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva localidad
        </Button>
      }
    >
      <EntityErrorState error={error} />

      {isLoading ? (
        <EntityLoadingState />
      ) : (
        <>
          <DataTable<City>
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />

          <PaginationBar
            page={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            totalItems={filteredCount}
            limit={table.getState().pagination.pageSize}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            onLimitChange={(limit) => table.setPageSize(limit)}
          />
        </>
      )}

      <CityDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={dialogMode}
        city={selectedCity}
      />

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar ciudad</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar la ciudad "{cityToDelete?.name}"?
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={() => {
                if (cityToDelete) {
                  deleteCity(cityToDelete.id, {
                    onSettled: () => setConfirmOpen(false),
                  });
                }
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </EntityListLayout>
  );
}
