// filepath: sae-frontend/app/settings/locations/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { City } from "@/types/location";
import { useCities, useDeleteCity } from "@/lib/hooks/useLocations";
import { CityDrawer } from "@/components/locations/city-drawer";
import { DataTable } from "./data-table";
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

export default function LocationsPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";

  const { data: cities = [], isLoading, error } = useCities(accessToken);
  const { mutate: deleteCity, isPending: deleting } = useDeleteCity(accessToken);

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

  const columns = getCityColumns({ onEdit: handleEdit, onDelete: handleDelete });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-laurel-900">Ciudades</h1>
          <p className="text-laurel-600">Administra las ciudades y provincias</p>
        </div>
        <Button onClick={handleAdd} className="bg-laurel-600 hover:bg-laurel-700">
          Nueva Ciudad
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 text-red-600">
            {error instanceof Error ? error.message : "Error al cargar ciudades"}
          </CardContent>
        </Card>
      )}

      <Card className="border-laurel-200">
        <CardHeader>
          <CardTitle className="text-laurel-900">Lista de Ciudades</CardTitle>
          <CardDescription className="text-laurel-600">
            {cityCount} ciudad{cityCount !== 1 ? "es" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <p>Cargando...</p> : <DataTable columns={columns} data={cities} searchableColumn="name" searchPlaceholder="Buscar ciudad..." />}
        </CardContent>
      </Card>

      <CityDrawer
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
              ¿Seguro que quieres eliminar la ciudad "{cityToDelete?.name}"? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              Cancelar
            </AlertDialogCancel>
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
