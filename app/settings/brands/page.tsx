// filepath: sae-frontend/app/settings/brands/page.tsx
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
import { Brand } from "@/lib/types/catalog";
import { useBrands, useDeleteBrand } from "@/lib/hooks/useCatalogs";
import { DataTable } from "@/components/data-table";
import { getBrandColumns } from "./columns";
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
import { BrandDialog } from "@/components/brands/brand-dialog";
import { useToast } from "@/components/ui/toaster";

export default function BrandsPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const { toast } = useToast();

  const { data: brands = [], isLoading, error } = useBrands(accessToken);
  const { mutate: deleteBrand, isPending: deleting } =
    useDeleteBrand(accessToken);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const columns = useMemo(
    () =>
      getBrandColumns({
        onEdit: (brand) => {
          setSelectedBrand(brand);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onDelete: (brand) => {
          setSelectedBrand(brand);
          setConfirmOpen(true);
        },
      }),
    [deleteBrand]
  );

  // Crear/editar se gestionan dentro de BrandDialog

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marcas</h1>
        <Button
          onClick={() => {
            setDialogMode("create");
            setSelectedBrand(null);
            setDialogOpen(true);
          }}
        >
          Nueva marca
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Marcas</CardTitle>
          <CardDescription>Gestión de marcas activas</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={brands}
            searchableColumn={"name"}
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>

      {/* Brand dialog (component) */}
      <BrandDialog
        accessToken={accessToken}
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelectedBrand(null);
        }}
        mode={dialogMode}
        brand={selectedBrand}
      />

      {/* Confirm delete dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas eliminar la marca "{selectedBrand?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedBrand) {
                  deleteBrand(selectedBrand.id, {
                    onSuccess: () => {
                      toast({
                        title: "Marca eliminada",
                        description: `"${selectedBrand.name}" eliminada.`,
                        variant: "success",
                      });
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar marca",
                        description: e?.message || "Intenta nuevamente.",
                        variant: "error",
                      });
                    },
                    onSettled: () => {
                      setConfirmOpen(false);
                      setSelectedBrand(null);
                    },
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
