// filepath: sae-frontend/components/equipment/equipment-type-dialog.tsx
"use client";

import * as React from "react";
import type { EquipmentType } from "@/lib/types/equipment";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { EquipmentTypeForm } from "@/components/forms/equipment-type-form";
import {
  useCreateEquipmentType,
  useUpdateEquipmentType,
  useDeleteEquipmentType,
} from "@/lib/hooks/useEquipment";
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

export interface EquipmentTypeDialogProps {
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  type?: EquipmentType | null;
}

export function EquipmentTypeDialog({
  accessToken,
  open,
  onOpenChange,
  mode,
  type,
}: EquipmentTypeDialogProps) {
  const { toast } = useToast();
  const { mutate: createType, isPending: creating } =
    useCreateEquipmentType(accessToken);
  const { mutate: updateType, isPending: updating } =
    useUpdateEquipmentType(accessToken);
  const { mutate: deleteType, isPending: deleting } =
    useDeleteEquipmentType(accessToken);

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createType(data, {
        onSuccess: () => {
          toast({
            title: "Tipo creado",
            description: `"${data.name}" creado correctamente.`,
            variant: "success",
          });
          onOpenChange(false);
        },
        onError: (e: any) => {
          toast({
            title: "Error al crear tipo",
            description: e?.message || "Intenta nuevamente.",
            variant: "error",
          });
        },
      });
    } else if (mode === "edit" && type) {
      updateType(
        { id: type.id, data },
        {
          onSuccess: () => {
            toast({
              title: "Tipo actualizado",
              description: `"${data.name}" guardado correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar tipo",
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
        title={mode === "create" ? "Crear tipo" : "Editar tipo"}
        description={
          mode === "create"
            ? "Completa los datos para crear un nuevo tipo de equipo."
            : "Modifica los datos del tipo seleccionado."
        }
      >
        <div className="space-y-4">
          <EquipmentTypeForm
            onSubmit={onSubmit}
            isLoading={creating || updating}
            accessToken={accessToken}
            defaultValues={
              mode === "edit" && type
                ? {
                    name: type.name,
                    code: type.code || "",
                    description: type.description || "",
                    categoryId: type.categoryId || undefined,
                  }
                : undefined
            }
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={null}
          />

          {mode === "edit" && type && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Eliminar tipo
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
            <AlertDialogTitle>Eliminar tipo</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar el tipo "{type?.name}"? Esta acción
              no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (type) {
                  deleteType(type.id, {
                    onSuccess: () => {
                      toast({
                        title: "Tipo eliminado",
                        description: `"${type.name}" eliminado.`,
                        variant: "success",
                      });
                      setConfirmOpen(false);
                      onOpenChange(false);
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar tipo",
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
