// filepath: sae-frontend/app/companies/business-categories/page.tsx
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
import { useToast } from "@/components/ui/toaster";
import type { BusinessCategory } from "@/types/company";
import {
  useBusinessCategories,
  useDeleteBusinessCategory,
} from "@/lib/hooks/useCompanies";
import { BusinessCategoryDialog } from "@/components/categories/business-category-dialog";
import { DataTable } from "@/components/data-table";
import { getBusinessCategoryColumns } from "./columns";

export default function BusinessCategoriesPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const { toast } = useToast();

  const { data: categories = [], isLoading } =
    useBusinessCategories(accessToken);
  const { mutate: deleteCategory, isPending: deleting } =
    useDeleteBusinessCategory(accessToken);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedCategory, setSelectedCategory] =
    useState<BusinessCategory | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const columns = useMemo(
    () =>
      getBusinessCategoryColumns({
        onEdit: (category) => {
          setSelectedCategory(category);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onDelete: (category) => {
          setSelectedCategory(category);
          setConfirmOpen(true);
        },
      }),
    []
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rubros / Categorías de negocio</h1>
        <Button
          onClick={() => {
            setDialogMode("create");
            setSelectedCategory(null);
            setDialogOpen(true);
          }}
        >
          Nueva categoría
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>Gestión de categorías de negocio</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            searchableColumn={"name" as keyof BusinessCategory}
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>

      <BusinessCategoryDialog
        accessToken={accessToken}
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelectedCategory(null);
        }}
        mode={dialogMode}
        category={selectedCategory}
      />

      {/* Confirm delete dialog */}
      <div className="hidden" />
      {/* Usa tu AlertDialog compartido si existe, replicando el patrón de settings/brands */}
      {/* Aquí implementamos inline para evitar dependencias no disponibles */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">
              Confirmar eliminación
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              ¿Seguro que deseas eliminar la categoría "{selectedCategory?.name}
              "?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (selectedCategory) {
                    deleteCategory(selectedCategory.id, {
                      onSuccess: () => {
                        toast({
                          title: "Categoría eliminada",
                          description: `"${selectedCategory.name}" eliminada.`,
                          variant: "success",
                        });
                      },
                      onError: (e: any) => {
                        toast({
                          title: "Error al eliminar",
                          description: e?.message || "Intenta nuevamente.",
                          variant: "error",
                        });
                      },
                      onSettled: () => {
                        setConfirmOpen(false);
                        setSelectedCategory(null);
                      },
                    });
                  }
                }}
                disabled={deleting}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
