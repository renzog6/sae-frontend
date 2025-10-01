// filepath: sae-frontend/components/employees/employee-position-dialog.tsx
"use client";

import * as React from "react";
import type { EmployeePosition } from "@/types/employee";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { EmployeePositionForm } from "@/components/forms/employee-position-form";
import {
  useCreateEmployeePosition,
  useUpdateEmployeePosition,
  useDeleteEmployeePosition,
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

export interface EmployeePositionDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  position?: EmployeePosition | null;
}

export function EmployeePositionDialog({
  accessToken,
  open,
  onOpenChange,
  mode,
  position,
}: EmployeePositionDialogProps) {
  const { toast } = useToast();
  const { mutate: createPosition, isPending: creating } =
    useCreateEmployeePosition(accessToken);
  const { mutate: updatePosition, isPending: updating } =
    useUpdateEmployeePosition(accessToken);
  const { mutate: deletePosition, isPending: deleting } =
    useDeleteEmployeePosition(accessToken);

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createPosition(data, {
        onSuccess: () => {
          toast({
            title: "Puesto creado",
            description: `"${data.name}" creado correctamente.`,
            variant: "success",
          });
          onOpenChange(false);
        },
        onError: (e: any) => {
          toast({
            title: "Error al crear puesto",
            description: e?.message || "Intenta nuevamente.",
            variant: "error",
          });
        },
      });
    } else if (mode === "edit" && position) {
      updatePosition(
        { id: position.id, data },
        {
          onSuccess: () => {
            toast({
              title: "Puesto actualizado",
              description: `"${data.name}" guardado correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar puesto",
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
        title={mode === "create" ? "Crear puesto" : "Editar puesto"}
        description={
          mode === "create"
            ? "Completa los datos para crear un nuevo puesto."
            : "Modifica los datos del puesto seleccionado."
        }
      >
        <div className="space-y-4">
          <EmployeePositionForm
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={
              mode === "edit" && position
                ? {
                    name: position.name,
                    code: position.code || "",
                    information: position.information || "",
                  }
                : undefined
            }
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={null}
          />

          {mode === "edit" && position && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Eliminar puesto
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
            <AlertDialogTitle>Eliminar puesto</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar el puesto "{position?.name}"? Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (position) {
                  deletePosition(position.id, {
                    onSuccess: () => {
                      toast({
                        title: "Puesto eliminado",
                        description: `"${position.name}" eliminado.`,
                        variant: "success",
                      });
                      setConfirmOpen(false);
                      onOpenChange(false);
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar puesto",
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
