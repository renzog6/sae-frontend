// filepath: sae-frontend/app/companies/business-subcategories/page.tsx
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
import type { BusinessSubcategory } from "@/lib/types/company";
import {
  useBusinessSubcategories,
  useDeleteBusinessSubcategory,
} from "@/lib/hooks/useCompanies";
import { BusinessSubcategoryDialog } from "@/components/categories/business-subcategory-dialog";
import { DataTable } from "@/components/data-table";
import { getBusinessSubcategoryColumns } from "./columns";

export default function BusinessSubcategoriesPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const { toast } = useToast();

  const { data: subcategories = [], isLoading } =
    useBusinessSubcategories(accessToken);
  const { mutate: deleteSubcategory, isPending: deleting } =
    useDeleteBusinessSubcategory(accessToken);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<BusinessSubcategory | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const columns = useMemo(
    () =>
      getBusinessSubcategoryColumns({
        onEdit: (subcategory) => {
          setSelectedSubcategory(subcategory);
          setDialogMode("edit");
          setDialogOpen(true);
        },
        onDelete: (subcategory) => {
          setSelectedSubcategory(subcategory);
          setConfirmOpen(true);
        },
      }),
    []
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Sub-Rubros / Subcategorías de negocio
        </h1>
        <Button
          onClick={() => {
            setDialogMode("create");
            setSelectedSubcategory(null);
            setDialogOpen(true);
          }}
        >
          Nueva subcategoría
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>Gestión de subcategorías de negocio</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={subcategories}
            searchableColumn={"name" as keyof BusinessSubcategory}
            searchPlaceholder="Buscar por nombre..."
          />
        </CardContent>
      </Card>

      <BusinessSubcategoryDialog
        accessToken={accessToken}
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelectedSubcategory(null);
        }}
        mode={dialogMode}
        subcategory={selectedSubcategory}
      />

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">
              Confirmar eliminación
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              ¿Seguro que deseas eliminar la subcategoría "
              {selectedSubcategory?.name}"?
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
                  if (selectedSubcategory) {
                    deleteSubcategory(selectedSubcategory.id, {
                      onSuccess: () => {
                        toast({
                          title: "Subcategoría eliminada",
                          description: `"${selectedSubcategory.name}" eliminada.`,
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
                        setSelectedSubcategory(null);
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
