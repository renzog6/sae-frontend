// filepath: sae-frontend/app/settings/locations/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { City } from "@/lib/types/shared/location";
import { useCities } from "@/lib/hooks/useLocations";
import { CityDialog } from "@/components/locations/city-dialog";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/components/data-table/use-data-table";
import { getCityColumns } from "./columns";
import { PaginationBar } from "@/components/data-table/pagination-bar";
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
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
            Ciudades
          </h1>
          <p className="text-sm text-muted-foreground">
            Administra las ciudades y provincias
          </p>
        </div>
        <Button onClick={handleAdd}>Nueva ciudad</Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 text-red-600">
            {error instanceof Error
              ? error.message
              : "Error al cargar ciudades"}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de ciudades</CardTitle>
          <CardDescription>
            {filteredCount} ciudad{filteredCount !== 1 ? "es" : ""}
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
              searchPlaceholder="Buscar ciudad..."
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
    </div>
  );
}
