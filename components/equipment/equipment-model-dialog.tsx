// filepath: sae-frontend/components/equipment/equipment-model-dialog.tsx
"use client";

import * as React from "react";
import type { EquipmentModel } from "@/lib/types/domain/equipment";
import { FormDialog } from "@/components/ui/form-dialog";
import { useToast } from "@/components/ui/toaster";
import { EquipmentModelForm } from "@/components/forms/equipment-model-form";
import {
  useCreateEquipmentModel,
  useUpdateEquipmentModel,
  useDeleteEquipmentModel,
} from "@/lib/hooks/useEquipments";
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

export interface EquipmentModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  model?: EquipmentModel | null;
}

export function EquipmentModelDialog({
  open,
  onOpenChange,
  mode,
  model,
}: EquipmentModelDialogProps) {
  const { toast } = useToast();
  const { mutate: createModel, isPending: creating } =
    useCreateEquipmentModel();
  const { mutate: updateModel, isPending: updating } =
    useUpdateEquipmentModel();
  const { mutate: deleteModel, isPending: deleting } =
    useDeleteEquipmentModel();

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = (data: any) => {
    if (mode === "create") {
      createModel(data, {
        onSuccess: () => {
          toast({
            title: "Modelo creado",
            description: `"${data.name}" creado correctamente.`,
            variant: "success",
          });
          onOpenChange(false);
        },
        onError: (e: any) => {
          toast({
            title: "Error al crear modelo",
            description: e?.message || "Intenta nuevamente.",
            variant: "error",
          });
        },
      });
    } else if (mode === "edit" && model) {
      updateModel(
        { id: model.id, data },
        {
          onSuccess: () => {
            toast({
              title: "Modelo actualizado",
              description: `"${data.name}" guardado correctamente.`,
              variant: "success",
            });
            onOpenChange(false);
          },
          onError: (e: any) => {
            toast({
              title: "Error al actualizar modelo",
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
        title={mode === "create" ? "Crear modelo" : "Editar modelo"}
        description={
          mode === "create"
            ? "Completa los datos para crear un nuevo modelo de equipo."
            : "Modifica los datos del modelo seleccionado."
        }
      >
        <div className="space-y-4">
          <EquipmentModelForm
            onSubmit={onSubmit}
            isLoading={creating || updating}
            defaultValues={
              mode === "edit" && model
                ? {
                    name: model.name,
                    code: model.code || "",
                    year: model.year || undefined,
                    description: model.description || "",
                    typeId: model.typeId || undefined,
                  }
                : undefined
            }
            isEdit={mode === "edit"}
            onCancel={() => onOpenChange(false)}
            error={null}
          />

          {mode === "edit" && model && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">
                    Eliminar modelo
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
            <AlertDialogTitle>Eliminar modelo</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que quieres eliminar el modelo "{model?.name}"? Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (model) {
                  deleteModel(model.id, {
                    onSuccess: () => {
                      toast({
                        title: "Modelo eliminado",
                        description: `"${model.name}" eliminado.`,
                        variant: "success",
                      });
                      setConfirmOpen(false);
                      onOpenChange(false);
                    },
                    onError: (e: any) => {
                      toast({
                        title: "Error al eliminar modelo",
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
