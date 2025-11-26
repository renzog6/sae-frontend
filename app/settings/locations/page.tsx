// filepath: sae-frontend/app/settings/locations/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { City } from "@/lib/types/location";
import { useCities, useDeleteCity } from "@/lib/hooks/useLocations";
import { CityDialog } from "@/components/locations/city-dialog";
import { DataTable } from "@/components/data-table";
import { getCityColumns } from "./columns";
import { PaginationBar } from "@/components/table/pagination-bar";
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
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: cities = [], isLoading, error } = useCities();
  const { mutate: deleteCity, isPending: deleting } = useDeleteCity();

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
    if (!accessToken) return;
    setCityToDelete(city);
    setConfirmOpen(true);
  };

  const cityCount = useMemo(() => cities.length, [cities]);

  // Calculate pagination based on filtered data
  const totalFilteredItems = cities.length;
  const totalPages = Math.ceil(totalFilteredItems / limit);

  // Get paginated data
  const paginatedData = cities.slice((page - 1) * limit, page * limit);

  const columns = getCityColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

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
            {totalFilteredItems} ciudad{totalFilteredItems !== 1 ? "es" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <DataTable
              columns={columns}
              data={paginatedData}
              searchableColumn="name"
              searchPlaceholder="Buscar ciudad..."
            />
          )}
        </CardContent>
      </Card>

      <PaginationBar
        page={page}
        totalPages={totalPages}
        totalItems={totalFilteredItems}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />

      <CityDialog
        accessToken={accessToken}
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
