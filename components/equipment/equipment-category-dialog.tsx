// filepath: sae-frontend/components/equipment/equipment-category-dialog.tsx
"use client";

import * as React from "react";
import type { EquipmentCategory } from "@/lib/types/domain/equipment";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { EquipmentCategoryForm } from "@/components/forms/equipment-category-form";
import { useEquipmentCategories } from "@/lib/hooks/useEquipments";
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
import { Button } from "@/components/ui/button";

export interface EquipmentCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  category?: EquipmentCategory | null;
}

export function EquipmentCategoryDialog({
  open,
  onOpenChange,
  mode,
  category,
}: EquipmentCategoryDialogProps) {
  const { toast } = useToast();
  const { useCreate, useUpdate, useDelete } = useEquipmentCategories();
  const { mutate: createCategory, isPending: creating } = useCreate();
  const { mutate: updateCategory, isPending: updating } = useUpdate();
  const { mutate: deleteCategory, isPending: deleting } = useDelete();

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createCategory(data, {
        onSuccess: () => {
          toast({
            title: "Categoría creada",
            description: `"${data.name}" creada correctamente.`,
            variant: "success",
          });
          onOpenChange(false);
        },
        onError: (e: any) => {
          toast({
            title: "Error al crear categoría",
            description: e?.message || "Intenta nuevamente.",
            variant: "error",
          });
        },
      });
    } else if (mode === "edit" && category) {
      updateCategory(
        { id: category.id, dto: data },
        {
          onSuccess: () => {
            toast({
              title: "Categoría actualizada",
              description: `"${data.name}" guardada correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar categoría",
              description: e?.message || "Intenta nuevamente.",
              variant: "error",
            });
          },
        }
      );
    }
  };

  return (
    <>
      <FormDialog
        open={open}
        onOpenChange={onOpenChange}
        title={mode === "create" ? "Crear categoría" : "Editar categoría"}
        description={
          mode === "create"
            ? "Completa los datos para crear una nueva categoría de equipo."
            : "Modifica los datos de la categoría seleccionada."
        }
      >
        <div className="space-y-4">
          <EquipmentCategoryForm
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={
              mode === "edit" && category
                ? {
                    name: category.name,
                    code: category.code || "",
                    description: category.description || "",
                  }
                : undefined
            }
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={null}
          />

          {mode === "edit" && category && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Eliminar categoría
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Esta acción no se puede deshacer.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setConfirmOpen(true)}
                  disabled={deleting}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </div>
      </FormDialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar categoría</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar la categoría "{category?.name}"? Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (category) {
                  deleteCategory(category.id, {
                    onSuccess: () => {
                      toast({
                        title: "Categoría eliminada",
                        description: `"${category.name}" eliminada.`,
                        variant: "success",
                      });
                      setConfirmOpen(false);
                      onOpenChange(false);
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar categoría",
                        description: e?.message || "Intenta nuevamente.",
                        variant: "error",
                      });
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
    </>
  );
}
