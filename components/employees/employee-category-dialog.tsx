// filepath: sae-frontend/components/employees/employee-category-dialog.tsx
"use client";

import * as React from "react";
import type { EmployeeCategory } from "@/lib/types/employee";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { EmployeeCategoryForm } from "@/components/forms/employee-category-form";
import {
  useCreateEmployeeCategory,
  useUpdateEmployeeCategory,
  useDeleteEmployeeCategory,
} from "@/lib/hooks/useEmployees";
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

export interface EmployeeCategoryDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  category?: EmployeeCategory | null;
}

export function EmployeeCategoryDialog({
  accessToken,
  open,
  onOpenChange,
  mode,
  category,
}: EmployeeCategoryDialogProps) {
  const { toast } = useToast();
  const { mutate: createCategory, isPending: creating } =
    useCreateEmployeeCategory(accessToken);
  const { mutate: updateCategory, isPending: updating } =
    useUpdateEmployeeCategory(accessToken);
  const { mutate: deleteCategory, isPending: deleting } =
    useDeleteEmployeeCategory(accessToken);

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
        { id: category.id, data },
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
            ? "Completa los datos para crear una nueva categoría."
            : "Modifica los datos de la categoría seleccionada."
        }
      >
        <div className="space-y-4">
          <EmployeeCategoryForm
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={
              mode === "edit" && category
                ? {
                    name: category.name,
                    code: category.code || "",
                    information: category.information || "",
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
